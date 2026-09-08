import { getCollection } from "astro:content"
import type { BlogPost, Locale, PortfolioContent, Project } from "../lib/types"

const locales = new Set<Locale>(["en", "sv", "zh"])

function entryIdentity(id: string, fallbackLang: Locale) {
  const clean = id.replace(/\.(md|mdx)$/i, "")
  const parts = clean.split("/")
  const language = locales.has(parts[0] as Locale) ? parts[0] as Locale : fallbackLang
  const slug = (locales.has(parts[0] as Locale) ? parts.slice(1) : parts).join("/") || clean
  return { clean, language, slug }
}

function iso(value: Date | string | undefined) {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string") return value
  return new Date(0).toISOString()
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const [projectEntries, blogEntries] = await Promise.all([
    getCollection("projects"),
    getCollection("blog"),
  ])

  const projects: Project[] = projectEntries.map(entry => {
    const data = entry.data
    const { clean, language, slug } = entryIdentity(entry.id, data.lang)

    return {
      id: `project:${clean}`,
      sourceId: entry.id,
      language,
      title: data.title,
      slug,
      summary: data.description,
      contentMarkdown: entry.body ?? "",
      technologies: data.technologies,
      githubUrl: data.links?.github ?? "",
      demoUrl: data.links?.live ?? "",
      featured: data.featured,
      published: !data.draft,
      sortOrder: data.order,
      updatedAt: new Date(0).toISOString(),
    }
  })

  const blogPosts: BlogPost[] = blogEntries.map(entry => {
    const data = entry.data
    const { clean, language, slug } = entryIdentity(entry.id, data.lang)
    const date = iso(data.date)

    return {
      id: `blog:${clean}`,
      sourceId: entry.id,
      language,
      title: data.title,
      slug,
      excerpt: data.description,
      contentMarkdown: entry.body ?? "",
      status: data.draft ? "draft" : "published",
      createdAt: date,
      updatedAt: date,
      publishedAt: data.draft ? null : date,
    }
  })

  return { projects, blogPosts }
}
