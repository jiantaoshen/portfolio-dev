using System.Security.Claims;
using System.Threading.RateLimiting;
using Career.Api.Models;
using Career.Api.Services;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "career_admin";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
        options.SlidingExpiration = true;
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddAntiforgery(options => options.HeaderName = "X-CSRF-TOKEN");
builder.Services.AddSingleton<PortfolioContentService>();

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("login", limiter =>
    {
        limiter.PermitLimit = 10;
        limiter.Window = TimeSpan.FromMinutes(1);
        limiter.QueueLimit = 0;
    });
    options.AddFixedWindowLimiter("admin", limiter =>
    {
        limiter.PermitLimit = 120;
        limiter.Window = TimeSpan.FromMinutes(1);
        limiter.QueueLimit = 0;
    });
});

var app = builder.Build();

app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/health", (PortfolioContentService content) => Results.Ok(new
{
    status = "ok",
    storage = "portfolio-files",
    portfolioRoot = app.Environment.IsDevelopment() ? content.PortfolioRoot : null
}));

var auth = app.MapGroup("/api/auth");

auth.MapGet("/me", (HttpContext context) =>
{
    if (context.User.Identity?.IsAuthenticated != true)
        return Results.Ok(new { authenticated = false });

    return Results.Ok(new
    {
        authenticated = true,
        name = context.User.Identity.Name,
        email = context.User.FindFirstValue(ClaimTypes.Email)
    });
});

auth.MapGet("/csrf", (HttpContext context, IAntiforgery antiforgery) =>
{
    var tokens = antiforgery.GetAndStoreTokens(context);
    return Results.Ok(new { token = tokens.RequestToken });
});

auth.MapPost("/login", async (LoginRequest request, HttpContext context, IWebHostEnvironment environment, IConfiguration configuration) =>
{
    if (!environment.IsDevelopment() || !configuration.GetValue<bool>("LocalAuth:Enabled"))
        return Results.NotFound();

    var expectedEmail = configuration["LocalAuth:Email"] ?? "admin@local.test";
    var expectedPassword = configuration["LocalAuth:Password"] ?? "dev-admin";

    if (!string.Equals(request.Email, expectedEmail, StringComparison.OrdinalIgnoreCase) || request.Password != expectedPassword)
        return Results.Unauthorized();

    var claims = new[]
    {
        new Claim(ClaimTypes.Name, "Local Admin"),
        new Claim(ClaimTypes.Email, expectedEmail),
        new Claim(ClaimTypes.Role, "Owner")
    };

    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
    await context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
    return Results.Ok(new { ok = true, name = "Local Admin", email = expectedEmail });
}).RequireRateLimiting("login");

auth.MapPost("/logout", async (HttpContext context, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);
    await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Results.NoContent();
}).RequireAuthorization();

var admin = app.MapGroup("/api/admin")
    .RequireAuthorization()
    .RequireRateLimiting("admin");

admin.MapPut("/about/{locale}", async (
    string locale,
    AboutContent content,
    HttpContext context,
    IAntiforgery antiforgery,
    PortfolioContentService files,
    CancellationToken cancellationToken) =>
{
    try
    {
        await antiforgery.ValidateRequestAsync(context);
        var saved = await files.SaveAboutAsync(locale, content, cancellationToken);
        return Results.Ok(saved);
    }
    catch (ArgumentOutOfRangeException ex)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
    catch (InvalidOperationException ex)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
    catch (AntiforgeryValidationException)
    {
        return Results.BadRequest(new { error = "Invalid CSRF token." });
    }
});

app.Run();

public sealed record LoginRequest(string Email, string Password);
