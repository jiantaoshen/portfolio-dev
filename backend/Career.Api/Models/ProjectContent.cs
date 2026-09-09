namespace Career.Api.Models;

public sealed class ProjectContent
{
    public string Id { get; set; } = "";
    public string SourceId { get; set; } = "";
    public string Language { get; set; } = "en";
    public string Title { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Summary { get; set; } = "";
    public string ContentMarkdown { get; set; } = "";
    public string Status { get; set; } = "";
    public List<string> Technologies { get; set; } = [];
    public string GithubUrl { get; set; } = "";
    public string DemoUrl { get; set; } = "";
    public bool Featured { get; set; }
    public int? FeaturedOrder { get; set; }
    public bool Published { get; set; }
    public int SortOrder { get; set; } = 999;
}
