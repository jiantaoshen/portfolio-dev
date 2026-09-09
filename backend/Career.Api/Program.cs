using Career.Api.Models;
using Career.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// This API is intentionally a local development file editor.
// It must never be used as a production service.
if (!builder.Environment.IsDevelopment())
{
    throw new InvalidOperationException(
        "Career.Api is a local development content editor and only runs in the Development environment."
    );
}

builder.Services.AddSingleton<PortfolioContentService>();

var app = builder.Build();

app.MapGet("/api/health", (PortfolioContentService content) => Results.Ok(new
{
    status = "ok",
    mode = "local-content-editor",
    storage = "portfolio-source-files",
    portfolioRoot = content.PortfolioRoot
}));

var local = app.MapGroup("/api/local");

local.MapPut("/about/{locale}", async (
    string locale,
    AboutContent content,
    PortfolioContentService files,
    CancellationToken cancellationToken) =>
{
    try
    {
        return Results.Ok(await files.SaveAboutAsync(locale, content, cancellationToken));
    }
    catch (Exception ex) when (ex is ArgumentOutOfRangeException or InvalidOperationException)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
});

local.MapPut("/projects", async (
    ProjectContent project,
    PortfolioContentService files,
    CancellationToken cancellationToken) =>
{
    try
    {
        return Results.Ok(await files.SaveProjectAsync(project, cancellationToken));
    }
    catch (Exception ex) when (ex is ArgumentOutOfRangeException or InvalidOperationException)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
});

local.MapDelete("/projects", async (
    string sourceId,
    PortfolioContentService files) =>
{
    try
    {
        await files.DeleteProjectAsync(sourceId);
        return Results.NoContent();
    }
    catch (FileNotFoundException ex)
    {
        return Results.NotFound(new { error = ex.Message });
    }
    catch (Exception ex) when (ex is ArgumentOutOfRangeException or InvalidOperationException)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
});

app.Run();
