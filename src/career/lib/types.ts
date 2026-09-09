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
  status: string
  technologies: string[]
  githubUrl: string
  demoUrl: string
  featured: boolean
  featuredOrder?: number | null
  published: boolean
  sortOrder: number
}


export type PortfolioContent = {
  projects: Project[]
}

export type CareerSnapshot = PortfolioContent & {
  about: AboutByLocale
}
