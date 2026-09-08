using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using Career.Api.Models;

namespace Career.Api.Services;

public sealed class PortfolioContentService(IWebHostEnvironment environment, IConfiguration configuration)
{
    private static readonly HashSet<string> AllowedLocales = new(StringComparer.OrdinalIgnoreCase)
    {
        "en", "sv", "zh"
    };

    private readonly JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    public string PortfolioRoot
    {
        get
        {
            var configured = configuration["Portfolio:Root"];
            if (!string.IsNullOrWhiteSpace(configured))
                return Path.GetFullPath(configured);

            // Expected repo layout: <repo>/backend/Career.Api
            return Path.GetFullPath(Path.Combine(environment.ContentRootPath, "..", ".."));
        }
    }

    public string GetAboutPath(string locale)
    {
        if (!AllowedLocales.Contains(locale))
            throw new ArgumentOutOfRangeException(nameof(locale), "Locale must be en, sv or zh.");

        return Path.Combine(PortfolioRoot, "src", "i18n", "locales", locale.ToLowerInvariant(), "about.json");
    }

    public async Task<AboutContent> SaveAboutAsync(string locale, AboutContent content, CancellationToken cancellationToken)
    {
        Validate(content);
        var path = GetAboutPath(locale);
        var directory = Path.GetDirectoryName(path)!;
        Directory.CreateDirectory(directory);

        var json = JsonSerializer.Serialize(content, _jsonOptions) + Environment.NewLine;
        var tempPath = path + ".tmp";
        await File.WriteAllTextAsync(tempPath, json, cancellationToken);
        File.Move(tempPath, path, overwrite: true);
        return content;
    }

    private static void Validate(AboutContent content)
    {
        if (string.IsNullOrWhiteSpace(content.Story.Title))
            throw new InvalidOperationException("Story title is required.");
        if (string.IsNullOrWhiteSpace(content.Skills.Title))
            throw new InvalidOperationException("Skills title is required.");
        if (string.IsNullOrWhiteSpace(content.Education.Title))
            throw new InvalidOperationException("Education title is required.");
        if (content.Story.Paragraphs.Count > 20)
            throw new InvalidOperationException("Too many story paragraphs.");
        if (content.Skills.Items.Count > 30)
            throw new InvalidOperationException("Too many skill groups.");
        if (content.Education.Items.Count > 30)
            throw new InvalidOperationException("Too many education entries.");
    }
}
