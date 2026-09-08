using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using Career.Api.Models;

namespace Career.Api.Services;

public sealed class PortfolioContentService(IWebHostEnvironment environment, IConfiguration configuration)
{
    private static readonly JsonSerializerOptions YamlScalarOptions = new()
    {
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };

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
        locale = NormalizeLocale(locale);
        return Path.Combine(PortfolioRoot, "src", "i18n", "locales", locale, "about.json");
    }

    public async Task<AboutContent> SaveAboutAsync(string locale, AboutContent content, CancellationToken cancellationToken)
    {
        Validate(content);
        var path = GetAboutPath(locale);
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);

        var json = JsonSerializer.Serialize(content, _jsonOptions) + Environment.NewLine;
        await WriteAtomicAsync(path, json, cancellationToken);
        return content;
    }

    public async Task<BlogPostContent> SaveBlogAsync(BlogPostContent post, CancellationToken cancellationToken)
    {
        Validate(post);

        var root = GetContentRoot("blog");
        var targetPath = GetTargetMarkdownPath(root, post.Language, post.Slug);
        var sourcePath = GetExistingSourcePath(root, post.SourceId);

        EnsureNoCollision(sourcePath, targetPath);
        Directory.CreateDirectory(Path.GetDirectoryName(targetPath)!);

        var markdown = BuildBlogMarkdown(post);
        await WriteAtomicAsync(targetPath, markdown, cancellationToken);
        DeleteOldPathIfMoved(sourcePath, targetPath);

        post.SourceId = ToSourceId(root, targetPath);
        return post;
    }

    public async Task<ProjectContent> SaveProjectAsync(ProjectContent project, CancellationToken cancellationToken)
    {
        Validate(project);

        var root = GetContentRoot("projects");
        var targetPath = GetTargetMarkdownPath(root, project.Language, project.Slug);
        var sourcePath = GetExistingSourcePath(root, project.SourceId);

        EnsureNoCollision(sourcePath, targetPath);
        Directory.CreateDirectory(Path.GetDirectoryName(targetPath)!);

        var markdown = BuildProjectMarkdown(project);
        await WriteAtomicAsync(targetPath, markdown, cancellationToken);
        DeleteOldPathIfMoved(sourcePath, targetPath);

        project.SourceId = ToSourceId(root, targetPath);
        return project;
    }

    public Task DeleteBlogAsync(string sourceId)
    {
        DeleteMarkdown(GetContentRoot("blog"), sourceId);
        return Task.CompletedTask;
    }

    public Task DeleteProjectAsync(string sourceId)
    {
        DeleteMarkdown(GetContentRoot("projects"), sourceId);
        return Task.CompletedTask;
    }

    private string GetContentRoot(string collection)
    {
        var path = Path.Combine(PortfolioRoot, "src", "content", collection);
        return Path.GetFullPath(path);
    }

    private static string NormalizeLocale(string locale)
    {
        if (!AllowedLocales.Contains(locale))
            throw new ArgumentOutOfRangeException(nameof(locale), "Locale must be en, sv or zh.");

        return locale.ToLowerInvariant();
    }

    private static string GetTargetMarkdownPath(string root, string locale, string slug)
    {
        locale = NormalizeLocale(locale);
        var safeSlug = ValidateSlug(slug);
        var relative = Path.Combine(locale, safeSlug.Replace('/', Path.DirectorySeparatorChar) + ".md");
        return EnsureInsideRoot(root, Path.Combine(root, relative));
    }

    private static string? GetExistingSourcePath(string root, string sourceId)
    {
        if (string.IsNullOrWhiteSpace(sourceId) || sourceId.StartsWith("new/", StringComparison.OrdinalIgnoreCase))
            return null;

        var normalized = sourceId.Replace('/', Path.DirectorySeparatorChar).Replace('\\', Path.DirectorySeparatorChar);
        if (!normalized.EndsWith(".md", StringComparison.OrdinalIgnoreCase))
            normalized += ".md";

        return EnsureInsideRoot(root, Path.Combine(root, normalized));
    }

    private static string ValidateSlug(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
            throw new InvalidOperationException("Slug is required.");

        var normalized = slug.Trim().Replace('\\', '/').Trim('/');
        if (normalized.EndsWith(".md", StringComparison.OrdinalIgnoreCase))
            normalized = normalized[..^3];

        var segments = normalized.Split('/', StringSplitOptions.RemoveEmptyEntries);
        if (segments.Length == 0)
            throw new InvalidOperationException("Slug is required.");

        foreach (var segment in segments)
        {
            if (segment is "." or "..")
                throw new InvalidOperationException("Slug cannot contain '.' or '..' path segments.");

            if (segment.IndexOfAny(Path.GetInvalidFileNameChars()) >= 0)
                throw new InvalidOperationException($"Slug contains invalid filename characters: {segment}");
        }

        return string.Join('/', segments);
    }

    private static string EnsureInsideRoot(string root, string candidate)
    {
        var fullRoot = Path.GetFullPath(root);
        var fullCandidate = Path.GetFullPath(candidate);
        var relative = Path.GetRelativePath(fullRoot, fullCandidate);

        if (relative == ".." ||
            relative.StartsWith(".." + Path.DirectorySeparatorChar, StringComparison.Ordinal) ||
            relative.StartsWith(".." + Path.AltDirectorySeparatorChar, StringComparison.Ordinal) ||
            Path.IsPathRooted(relative))
        {
            throw new InvalidOperationException("Content path escapes the allowed content directory.");
        }

        return fullCandidate;
    }

    private static void EnsureNoCollision(string? sourcePath, string targetPath)
    {
        if (!File.Exists(targetPath))
            return;

        if (sourcePath is not null && PathsEqual(sourcePath, targetPath))
            return;

        throw new InvalidOperationException("Another content file already uses this language and slug.");
    }

    private static void DeleteOldPathIfMoved(string? sourcePath, string targetPath)
    {
        if (sourcePath is null || PathsEqual(sourcePath, targetPath) || !File.Exists(sourcePath))
            return;

        File.Delete(sourcePath);
    }

    private static bool PathsEqual(string left, string right)
    {
        var comparison = OperatingSystem.IsWindows() ? StringComparison.OrdinalIgnoreCase : StringComparison.Ordinal;
        return string.Equals(Path.GetFullPath(left), Path.GetFullPath(right), comparison);
    }

    private static string ToSourceId(string root, string fullPath)
    {
        return Path.GetRelativePath(root, fullPath).Replace(Path.DirectorySeparatorChar, '/');
    }

    private static void DeleteMarkdown(string root, string sourceId)
    {
        var sourcePath = GetExistingSourcePath(root, sourceId)
            ?? throw new InvalidOperationException("This item has not been saved to a source file yet.");

        if (!File.Exists(sourcePath))
            throw new FileNotFoundException("The source Markdown file does not exist.", sourcePath);

        File.Delete(sourcePath);
    }

    private static async Task WriteAtomicAsync(string path, string content, CancellationToken cancellationToken)
    {
        var tempPath = path + ".tmp";
        await File.WriteAllTextAsync(tempPath, content, new UTF8Encoding(encoderShouldEmitUTF8Identifier: false), cancellationToken);
        File.Move(tempPath, path, overwrite: true);
    }

    private static string BuildBlogMarkdown(BlogPostContent post)
    {
        var sb = new StringBuilder();
        sb.Append("---\n");
        sb.Append("lang: ").Append(post.Language.ToLowerInvariant()).Append('\n');
        sb.Append("title: ").Append(YamlString(post.Title)).Append('\n');
        sb.Append("description: ").Append(YamlString(post.Excerpt)).Append('\n');
        sb.Append("date: ").Append(post.Date).Append('\n');
        sb.Append("readingTime: ").Append(YamlString(post.ReadingTime)).Append('\n');
        AppendList(sb, "tags", post.Tags);
        sb.Append("draft: ").Append(post.Status == "draft" ? "true" : "false").Append('\n');
        sb.Append("---\n\n");
        sb.Append(NormalizeBody(post.ContentMarkdown));
        return sb.ToString();
    }

    private static string BuildProjectMarkdown(ProjectContent project)
    {
        var sb = new StringBuilder();
        sb.Append("---\n");
        sb.Append("lang: ").Append(project.Language.ToLowerInvariant()).Append('\n');
        sb.Append("title: ").Append(YamlString(project.Title)).Append('\n');
        sb.Append("description: ").Append(YamlString(project.Summary)).Append('\n');
        sb.Append("status: ").Append(YamlString(project.Status)).Append('\n');
        sb.Append("order: ").Append(project.SortOrder).Append('\n');
        sb.Append("featured: ").Append(project.Featured ? "true" : "false").Append('\n');
        if (project.FeaturedOrder.HasValue)
            sb.Append("featuredOrder: ").Append(project.FeaturedOrder.Value).Append('\n');
        AppendList(sb, "technologies", project.Technologies);
        AppendList(sb, "highlights", project.Highlights);

        if (!string.IsNullOrWhiteSpace(project.GithubUrl) || !string.IsNullOrWhiteSpace(project.DemoUrl))
        {
            sb.Append("links:\n");
            if (!string.IsNullOrWhiteSpace(project.GithubUrl))
                sb.Append("  github: ").Append(YamlString(project.GithubUrl)).Append('\n');
            if (!string.IsNullOrWhiteSpace(project.DemoUrl))
                sb.Append("  live: ").Append(YamlString(project.DemoUrl)).Append('\n');
        }

        sb.Append("draft: ").Append(project.Published ? "false" : "true").Append('\n');
        sb.Append("---\n\n");
        sb.Append(NormalizeBody(project.ContentMarkdown));
        return sb.ToString();
    }

    private static void AppendList(StringBuilder sb, string key, IReadOnlyCollection<string> values)
    {
        if (values.Count == 0)
        {
            sb.Append(key).Append(": []\n");
            return;
        }

        sb.Append(key).Append(":\n");
        foreach (var value in values)
            sb.Append("  - ").Append(YamlString(value)).Append('\n');
    }

    private static string NormalizeBody(string body)
    {
        var normalized = (body ?? "").Replace("\r\n", "\n").Replace('\r', '\n').TrimStart('\n');
        return normalized.EndsWith("\n", StringComparison.Ordinal) ? normalized : normalized + "\n";
    }

    private static string YamlString(string value)
    {
        // JSON double-quoted strings are valid YAML scalars and safely escape quotes/newlines.
        return JsonSerializer.Serialize(value ?? "", YamlScalarOptions);
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

    private static void Validate(BlogPostContent post)
    {
        NormalizeLocale(post.Language);
        ValidateSlug(post.Slug);

        if (string.IsNullOrWhiteSpace(post.Title))
            throw new InvalidOperationException("Blog title is required.");
        if (string.IsNullOrWhiteSpace(post.Excerpt))
            throw new InvalidOperationException("Blog description is required.");
        if (!DateOnly.TryParse(post.Date, out _))
            throw new InvalidOperationException("Blog date must use YYYY-MM-DD format.");
        if (string.IsNullOrWhiteSpace(post.ReadingTime))
            throw new InvalidOperationException("Reading time is required.");
        if (post.Status != "draft" && post.Status != "published")
            throw new InvalidOperationException("Blog status must be draft or published.");
        if (post.Tags.Count > 50)
            throw new InvalidOperationException("Too many blog tags.");
    }

    private static void Validate(ProjectContent project)
    {
        NormalizeLocale(project.Language);
        ValidateSlug(project.Slug);

        if (string.IsNullOrWhiteSpace(project.Title))
            throw new InvalidOperationException("Project title is required.");
        if (string.IsNullOrWhiteSpace(project.Summary))
            throw new InvalidOperationException("Project description is required.");
        if (string.IsNullOrWhiteSpace(project.Status))
            throw new InvalidOperationException("Project status is required.");
        if (project.Technologies.Count > 50)
            throw new InvalidOperationException("Too many project technologies.");
        if (project.Highlights.Count > 50)
            throw new InvalidOperationException("Too many project highlights.");

        ValidateOptionalHttpUrl(project.GithubUrl, "GitHub URL");
        ValidateOptionalHttpUrl(project.DemoUrl, "Live URL");
    }

    private static void ValidateOptionalHttpUrl(string? value, string label)
    {
        if (string.IsNullOrWhiteSpace(value))
            return;

        if (!Uri.TryCreate(value, UriKind.Absolute, out var uri) ||
            (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
        {
            throw new InvalidOperationException($"{label} must be an absolute http/https URL.");
        }
    }
}
