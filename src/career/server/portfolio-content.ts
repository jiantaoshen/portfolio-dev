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

function dateOnly(value: Date | string) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return new Date(value).toISOString().slice(0, 10)
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
      status: data.status,
      technologies: data.technologies,
      highlights: data.highlights,
      githubUrl: data.links?.github ?? "",
      demoUrl: data.links?.live ?? "",
      featured: data.featured,
      featuredOrder: data.featuredOrder ?? null,
      published: !data.draft,
      sortOrder: data.order,
    }
  })

  const blogPosts: BlogPost[] = blogEntries.map(entry => {
    const data = entry.data
    const { clean, language, slug } = entryIdentity(entry.id, data.lang)

    return {
      id: `blog:${clean}`,
      sourceId: entry.id,
      language,
      title: data.title,
      slug,
      excerpt: data.description,
      contentMarkdown: entry.body ?? "",
      date: dateOnly(data.date),
      readingTime: data.readingTime,
      tags: data.tags,
      status: data.draft ? "draft" : "published",
    }
  })

  return { projects, blogPosts }
}
