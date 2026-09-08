export type DashboardMode = "trial" | "admin"
export type Locale = "en" | "sv" | "zh"

export type AboutStory = {
  title: string
  paragraphs: string[]
}

export type AboutSkillGroup = {
  title: string
  staritem?: string[]
  items: string[]
}

export type AboutEducationItem = {
  period: string
  degree: string
  school: string
  description?: string
  thesis?: string
  thesisUrl?: string
}

export type AboutContent = {
  story: AboutStory
  skills: {
    title: string
    description: string
    items: AboutSkillGroup[]
  }
  education: {
    title: string
    description: string
    items: AboutEducationItem[]
  }
}

export type AboutByLocale = Record<Locale, AboutContent>

export type Project = {
  id: string
  sourceId: string
  language: Locale
  title: string
  slug: string
  summary: string
  contentMarkdown: string
  technologies: string[]
  githubUrl: string
  demoUrl: string
  featured: boolean
  published: boolean
  sortOrder: number
  updatedAt: string
}

export type BlogPost = {
  id: string
  sourceId: string
  language: Locale
  title: string
  slug: string
  excerpt: string
  contentMarkdown: string
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
}

export type PortfolioContent = {
  projects: Project[]
  blogPosts: BlogPost[]
}

export type CareerSnapshot = PortfolioContent & {
  about: AboutByLocale
}
