import { useMemo, useState } from "react"
import { adminApi } from "../lib/api"
import type {
  AboutByLocale,
  AboutContent,
  BlogPost,
  CareerSnapshot,
  DashboardMode,
  Locale,
  PortfolioContent,
  Project,
} from "../lib/types"

const clone = <T,>(value: T): T => structuredClone(value)

function makeSnapshot(initialContent: PortfolioContent, initialAbout: AboutByLocale): CareerSnapshot {
  return clone({ ...initialContent, about: initialAbout })
}

export function useCareerData(mode: DashboardMode, initialContent: PortfolioContent, initialAbout: AboutByLocale) {
  const [data, setData] = useState<CareerSnapshot>(() => makeSnapshot(initialContent, initialAbout))
  const [actionError, setActionError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const patchLocal = (updater: (current: CareerSnapshot) => CareerSnapshot) => {
    setData(current => updater(current))
  }

  const reset = () => {
    setActionError(null)
    setData(makeSnapshot(initialContent, initialAbout))
  }

  const actions = useMemo(() => ({
    async saveAbout(locale: Locale, content: AboutContent) {
      setActionError(null)
      if (mode === "trial") {
        patchLocal(current => ({ ...current, about: { ...current.about, [locale]: clone(content) } }))
        return
      }

      setSaving(true)
      try {
        const saved = await adminApi.updateAbout(locale, content)
        patchLocal(current => ({ ...current, about: { ...current.about, [locale]: clone(saved) } }))
      } catch (e) {
        setActionError(e instanceof Error ? e.message : "Failed to save About content")
      } finally {
        setSaving(false)
      }
    },

    // Blog/project source files remain Astro Content Collections in phase 1.
    // Editing is sandbox-only in both Trial and Admin modes until Git-backed publishing is added.
    async saveProject(project: Project) {
      patchLocal(current => ({
        ...current,
        projects: current.projects.some(x => x.id === project.id)
          ? current.projects.map(x => x.id === project.id ? project : x)
          : [...current.projects, project],
      }))
    },
    async deleteProject(id: string) {
      patchLocal(current => ({ ...current, projects: current.projects.filter(x => x.id !== id) }))
    },
    async saveBlog(post: BlogPost) {
      patchLocal(current => ({
        ...current,
        blogPosts: current.blogPosts.some(x => x.id === post.id)
          ? current.blogPosts.map(x => x.id === post.id ? post : x)
          : [...current.blogPosts, post],
      }))
    },
    async deleteBlog(id: string) {
      patchLocal(current => ({ ...current, blogPosts: current.blogPosts.filter(x => x.id !== id) }))
    },
  }), [mode])

  return {
    data,
    loading: false,
    error: null as string | null,
    actionError,
    dismissActionError: () => setActionError(null),
    saving,
    reload: reset,
    actions,
  }
}
