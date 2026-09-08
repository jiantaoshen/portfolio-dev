import { useMemo, useState } from "react"
import { Clipboard, Plus, Save, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import type { DashboardMode, Locale, Project } from "../lib/types"
import { useCareerWorkspace } from "../workspace"

function emptyProject(): Project {
  return {
    id: crypto.randomUUID(),
    sourceId: "new/local",
    language: "en",
    title: "New project",
    slug: `project-${Date.now()}`,
    summary: "",
    contentMarkdown: "## Overview\n\nDescribe the project here.",
    status: "In development",
    technologies: ["ASP.NET Core"],
    highlights: [],
    githubUrl: "",
    demoUrl: "",
    featured: false,
    featuredOrder: null,
    published: false,
    sortOrder: 99,
  }
}

export function ProjectsEditorPage() {
  const { data, actions, mode, saving } = useCareerWorkspace()
  const [selectedId, setSelectedId] = useState(data.projects[0]?.id ?? "")
  const selected = useMemo(() => data.projects.find(x => x.id === selectedId) ?? null, [data.projects, selectedId])

  async function add() {
    const project = emptyProject()
    const staged = actions.stageProject(project)
    setSelectedId(staged.id)
  }

  return <div className="space-y-6">
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-1 text-zinc-500">
          {mode === "trial"
            ? "Experiment with a temporary copy of your project collection. Nothing is written."
            : "Edit project Markdown and frontmatter directly through the local ASP.NET file writer."}
        </p>
      </div>
      <Button disabled={saving} onClick={() => void add()}><Plus className="mr-2 h-4 w-4" />New project</Button>
    </div>

    <div className={mode === "trial"
      ? "rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
      : "rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"}>
      {mode === "trial"
        ? <>Demo only. No file is written under <code>src/content/projects/</code>.</>
        : <>Saving writes <code>src/content/projects/&lt;language&gt;/&lt;slug&gt;.md</code>. The complete Astro frontmatter schema is preserved by the editor.</>}
    </div>

    <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
      <Card>
        <CardHeader><CardTitle>All projects</CardTitle><CardDescription>{data.projects.length} content entries</CardDescription></CardHeader>
        <CardContent className="space-y-2">
          {data.projects.map(project => <button key={project.id} onClick={() => setSelectedId(project.id)} className={`w-full rounded-lg border p-3 text-left ${selectedId === project.id ? "border-zinc-900 bg-zinc-50" : "border-zinc-200"}`}>
            <div className="font-medium">{project.title}</div>
            <div className="mt-1 flex flex-wrap gap-1"><Badge>{project.language}</Badge>{project.published && <Badge>published</Badge>}{project.featured && <Badge>featured</Badge>}</div>
          </button>)}
        </CardContent>
      </Card>

      {selected
        ? <ProjectEditor
            key={selected.id}
            project={selected}
            mode={mode}
            saving={saving}
            onSave={actions.saveProject}
            onDelete={async project => { await actions.deleteProject(project); setSelectedId("") }}
          />
        : <Card><CardContent className="p-10 text-center text-zinc-500">Select or create a project.</CardContent></Card>}
    </div>
  </div>
}

function ProjectEditor({
  project,
  mode,
  saving,
  onSave,
  onDelete,
}: {
  project: Project
  mode: DashboardMode
  saving: boolean
  onSave: (project: Project) => Promise<Project>
  onDelete: (project: Project) => Promise<void>
}) {
  const [draft, setDraft] = useState(project)
  const [techText, setTechText] = useState(project.technologies.join(", "))
  const [highlightsText, setHighlightsText] = useState(project.highlights.join("\n"))

  async function copyMarkdown() {
    await navigator.clipboard.writeText(draft.contentMarkdown)
  }

  async function save() {
    try {
      const saved = await onSave(draft)
      setDraft(saved)
      setTechText(saved.technologies.join(", "))
      setHighlightsText(saved.highlights.join("\n"))
    } catch {
      // The workspace error banner already shows the backend error.
    }
  }

  async function remove() {
    if (mode === "admin" && !window.confirm(`Delete source file ${draft.sourceId}?`)) return
    try {
      await onDelete(draft)
    } catch {
      // The workspace error banner already shows the backend error.
    }
  }

  return <div className="space-y-5">
    <Card>
      <CardHeader><CardTitle>Edit project</CardTitle><CardDescription>{mode === "trial" ? "Browser-only demo copy." : `Source: ${draft.sourceId}`}</CardDescription></CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field label="Language">
          <select className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm" value={draft.language} onChange={e => setDraft({ ...draft, language: e.target.value as Locale })}>
            <option value="en">English</option><option value="sv">Svenska</option><option value="zh">中文</option>
          </select>
        </Field>
        <Field label="Title"><Input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} /></Field>
        <Field label="Slug"><Input value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} /></Field>
        <Field label="Project status"><Input value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value })} placeholder="Live" /></Field>
        <div className="md:col-span-2"><Field label="Description / summary"><Textarea rows={3} value={draft.summary} onChange={e => setDraft({ ...draft, summary: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Technologies (comma separated)"><Input value={techText} onChange={e => { setTechText(e.target.value); setDraft({ ...draft, technologies: splitComma(e.target.value) }) }} /></Field></div>
        <div className="md:col-span-2"><Field label="Highlights (one per line)"><Textarea rows={5} value={highlightsText} onChange={e => { setHighlightsText(e.target.value); setDraft({ ...draft, highlights: splitLines(e.target.value) }) }} /></Field></div>
        <Field label="GitHub URL"><Input value={draft.githubUrl} onChange={e => setDraft({ ...draft, githubUrl: e.target.value })} /></Field>
        <Field label="Live URL"><Input value={draft.demoUrl} onChange={e => setDraft({ ...draft, demoUrl: e.target.value })} /></Field>
        <Field label="Display order"><Input type="number" value={draft.sortOrder} onChange={e => setDraft({ ...draft, sortOrder: Number(e.target.value) })} /></Field>
        <Field label="Featured order"><Input type="number" value={draft.featuredOrder ?? ""} onChange={e => setDraft({ ...draft, featuredOrder: e.target.value === "" ? null : Number(e.target.value) })} placeholder="Optional" /></Field>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.published} onChange={e => setDraft({ ...draft, published: e.target.checked })} />Published (`draft: false`)</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.featured} onChange={e => setDraft({ ...draft, featured: e.target.checked })} />Featured</label>
        <div className="md:col-span-2"><Field label="Content (Markdown)"><Textarea className="min-h-[420px] font-mono" value={draft.contentMarkdown} onChange={e => setDraft({ ...draft, contentMarkdown: e.target.value })} /></Field></div>

        <div className="md:col-span-2 flex flex-wrap gap-2">
          <Button disabled={saving} onClick={() => void save()}><Save className="mr-2 h-4 w-4" />{saving ? "Saving…" : mode === "trial" ? "Apply in demo" : "Save Markdown file"}</Button>
          <Button variant="outline" onClick={() => void copyMarkdown()}><Clipboard className="mr-2 h-4 w-4" />Copy body Markdown</Button>
          <Button variant="ghost" disabled={saving} onClick={() => void remove()}><Trash2 className="mr-2 h-4 w-4" />{mode === "trial" ? "Remove from demo" : "Delete source file"}</Button>
        </div>
      </CardContent>
    </Card>

    <Card><CardHeader><CardTitle>Preview</CardTitle></CardHeader><CardContent><div className="prose-lite"><ReactMarkdown>{draft.contentMarkdown}</ReactMarkdown></div></CardContent></Card>
  </div>
}

function splitComma(value: string) {
  return value.split(",").map(item => item.trim()).filter(Boolean)
}

function splitLines(value: string) {
  return value.split(/\r?\n/).map(item => item.trim()).filter(Boolean)
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
}
