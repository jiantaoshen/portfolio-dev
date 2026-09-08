namespace Career.Api.Models;

public sealed class BlogPostContent
{
    public string Id { get; set; } = "";
    public string SourceId { get; set; } = "";
    public string Language { get; set; } = "en";
    public string Title { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Excerpt { get; set; } = "";
    public string ContentMarkdown { get; set; } = "";
    public string Date { get; set; } = "";
    public string ReadingTime { get; set; } = "";
    public List<string> Tags { get; set; } = [];
    public string Status { get; set; } = "draft";
}
