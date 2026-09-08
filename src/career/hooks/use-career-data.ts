import { useMemo, useState } from "react"
import { localContentApi } from "../lib/api"
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
    stageProject(project: Project) {
      const staged = clone(project)
      patchLocal(current => ({ ...current, projects: [...current.projects, staged] }))
      return staged
    },

    stageBlog(post: BlogPost) {
      const staged = clone(post)
      patchLocal(current => ({ ...current, blogPosts: [...current.blogPosts, staged] }))
      return staged
    },

    async saveAbout(locale: Locale, content: AboutContent) {
      setActionError(null)
      if (mode === "trial") {
        const saved = clone(content)
        patchLocal(current => ({ ...current, about: { ...current.about, [locale]: saved } }))
        return saved
      }

      setSaving(true)
      try {
        const saved = await localContentApi.updateAbout(locale, content)
        patchLocal(current => ({ ...current, about: { ...current.about, [locale]: clone(saved) } }))
        return saved
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to save About content"
        setActionError(message)
        throw e
      } finally {
        setSaving(false)
      }
    },

    async saveProject(project: Project) {
      setActionError(null)
      if (mode === "trial") {
        const saved = clone(project)
        patchLocal(current => ({
          ...current,
          projects: current.projects.some(x => x.id === project.id)
            ? current.projects.map(x => x.id === project.id ? saved : x)
            : [...current.projects, saved],
        }))
        return saved
      }

      setSaving(true)
      try {
        const saved = await localContentApi.saveProject(project)
        patchLocal(current => ({
          ...current,
          projects: current.projects.some(x => x.id === project.id)
            ? current.projects.map(x => x.id === project.id ? clone(saved) : x)
            : [...current.projects, clone(saved)],
        }))
        return saved
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to save project"
        setActionError(message)
        throw e
      } finally {
        setSaving(false)
      }
    },

    async deleteProject(project: Project) {
      setActionError(null)
      if (mode === "admin" && !project.sourceId.startsWith("new/")) {
        setSaving(true)
        try {
          await localContentApi.deleteProject(project.sourceId)
        } catch (e) {
          const message = e instanceof Error ? e.message : "Failed to delete project"
          setActionError(message)
          throw e
        } finally {
          setSaving(false)
        }
      }

      patchLocal(current => ({ ...current, projects: current.projects.filter(x => x.id !== project.id) }))
    },

    async saveBlog(post: BlogPost) {
      setActionError(null)
      if (mode === "trial") {
        const saved = clone(post)
        patchLocal(current => ({
          ...current,
          blogPosts: current.blogPosts.some(x => x.id === post.id)
            ? current.blogPosts.map(x => x.id === post.id ? saved : x)
            : [...current.blogPosts, saved],
        }))
        return saved
      }

      setSaving(true)
      try {
        const saved = await localContentApi.saveBlog(post)
        patchLocal(current => ({
          ...current,
          blogPosts: current.blogPosts.some(x => x.id === post.id)
            ? current.blogPosts.map(x => x.id === post.id ? clone(saved) : x)
            : [...current.blogPosts, clone(saved)],
        }))
        return saved
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to save blog post"
        setActionError(message)
        throw e
      } finally {
        setSaving(false)
      }
    },

    async deleteBlog(post: BlogPost) {
      setActionError(null)
      if (mode === "admin" && !post.sourceId.startsWith("new/")) {
        setSaving(true)
        try {
          await localContentApi.deleteBlog(post.sourceId)
        } catch (e) {
          const message = e instanceof Error ? e.message : "Failed to delete blog post"
          setActionError(message)
          throw e
        } finally {
          setSaving(false)
        }
      }

      patchLocal(current => ({ ...current, blogPosts: current.blogPosts.filter(x => x.id !== post.id) }))
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
