namespace Career.Api.Models;

public sealed class AboutContent
{
    public required AboutStory Story { get; set; }
    public required AboutSkills Skills { get; set; }
    public required AboutEducation Education { get; set; }
}

public sealed class AboutStory
{
    public string Title { get; set; } = "";
    public List<string> Paragraphs { get; set; } = [];
}

public sealed class AboutSkills
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public List<AboutSkillGroup> Items { get; set; } = [];
}

public sealed class AboutSkillGroup
{
    public string Title { get; set; } = "";
    public List<string>? Staritem { get; set; }
    public List<string> Items { get; set; } = [];
}

public sealed class AboutEducation
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public List<AboutEducationItem> Items { get; set; } = [];
}

public sealed class AboutEducationItem
{
    public string Period { get; set; } = "";
    public string Degree { get; set; } = "";
    public string School { get; set; } = "";
    public string? Description { get; set; }
    public string? Thesis { get; set; }
    public string? ThesisUrl { get; set; }
}
