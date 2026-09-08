import { useMemo, useState } from "react"
import { Clipboard, Plus, Save, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import type { Project } from "../lib/types"
import { useCareerWorkspace } from "../workspace"

function emptyProject(): Project {
  return { id: crypto.randomUUID(), sourceId: "new/local", language: "en", title: "New project", slug: `project-${Date.now()}`, summary: "", contentMarkdown: "## What I built\n\nDescribe the project here.", technologies: ["ASP.NET Core"], githubUrl: "", demoUrl: "", featured: false, published: false, sortOrder: 99, updatedAt: new Date().toISOString() }
}

export function ProjectsEditorPage() {
  const { data, actions } = useCareerWorkspace()
  const [selectedId, setSelectedId] = useState(data.projects[0]?.id ?? "")
  const selected = useMemo(() => data.projects.find(x => x.id === selectedId) ?? null, [data.projects, selectedId])
  async function add() { const p = emptyProject(); await actions.saveProject(p); setSelectedId(p.id) }

  return <div className="space-y-6">
    <div className="flex items-end justify-between gap-3"><div><h1 className="text-3xl font-bold tracking-tight">Project sandbox</h1><p className="mt-1 text-zinc-500">Loads your Astro project Markdown and lets you experiment without changing repository content.</p></div><Button onClick={() => void add()}><Plus className="mr-2 h-4 w-4" />New project</Button></div>
    <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">Project files remain under <code>src/content/projects/</code>. Admin and Trial use the same safe sandbox editor for these content files in phase 1.</div>
    <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
      <Card><CardHeader><CardTitle>All projects</CardTitle><CardDescription>{data.projects.length} content entries</CardDescription></CardHeader><CardContent className="space-y-2">{data.projects.map(p => <button key={p.id} onClick={() => setSelectedId(p.id)} className={`w-full rounded-lg border p-3 text-left ${selectedId === p.id ? "border-zinc-900 bg-zinc-50" : "border-zinc-200"}`}><div className="font-medium">{p.title}</div><div className="mt-1 flex gap-1"><Badge>{p.language}</Badge>{p.published && <Badge>published</Badge>}{p.featured && <Badge>featured</Badge>}</div></button>)}</CardContent></Card>
      {selected ? <ProjectEditor key={selected.id} project={selected} onSave={actions.saveProject} onDelete={async id => { await actions.deleteProject(id); setSelectedId("") }} /> : <Card><CardContent className="p-10 text-center text-zinc-500">Select or create a project.</CardContent></Card>}
    </div>
  </div>
}

function ProjectEditor({ project, onSave, onDelete }: { project: Project; onSave: (p: Project) => Promise<void>; onDelete: (id: string) => Promise<void> }) {
  const [draft, setDraft] = useState(project)
  const techText = draft.technologies.join(", ")
  async function copyMarkdown() { await navigator.clipboard.writeText(draft.contentMarkdown) }
  return <div className="space-y-5">
    <Card><CardHeader><CardTitle>Edit project</CardTitle><CardDescription>Sandbox only; source Markdown is not written by the backend.</CardDescription></CardHeader><CardContent className="grid gap-4 md:grid-cols-2">
      <Field label="Language"><Input value={draft.language} onChange={e => setDraft({ ...draft, language: e.target.value })} /></Field>
      <Field label="Title"><Input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} /></Field>
      <Field label="Slug"><Input value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} /></Field>
      <Field label="Source ID"><Input disabled value={draft.sourceId} /></Field>
      <div className="md:col-span-2"><Field label="Summary"><Textarea rows={3} value={draft.summary} onChange={e => setDraft({ ...draft, summary: e.target.value })} /></Field></div>
      <div className="md:col-span-2"><Field label="Technologies (comma separated)"><Input value={techText} onChange={e => setDraft({ ...draft, technologies: e.target.value.split(",").map(x => x.trim()).filter(Boolean) })} /></Field></div>
      <Field label="GitHub URL"><Input value={draft.githubUrl} onChange={e => setDraft({ ...draft, githubUrl: e.target.value })} /></Field>
      <Field label="Demo URL"><Input value={draft.demoUrl} onChange={e => setDraft({ ...draft, demoUrl: e.target.value })} /></Field>
      <Field label="Display order"><Input type="number" value={draft.sortOrder} onChange={e => setDraft({ ...draft, sortOrder: Number(e.target.value) })} /></Field>
      <div />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.published} onChange={e => setDraft({ ...draft, published: e.target.checked })} />Published</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.featured} onChange={e => setDraft({ ...draft, featured: e.target.checked })} />Featured in source preview</label>
      <div className="md:col-span-2"><Field label="Content (Markdown)"><Textarea className="min-h-[300px] font-mono" value={draft.contentMarkdown} onChange={e => setDraft({ ...draft, contentMarkdown: e.target.value })} /></Field></div>
      <div className="md:col-span-2 flex flex-wrap gap-2"><Button onClick={() => void onSave({ ...draft, updatedAt: new Date().toISOString() })}><Save className="mr-2 h-4 w-4" />Apply locally</Button><Button variant="outline" onClick={() => void copyMarkdown()}><Clipboard className="mr-2 h-4 w-4" />Copy Markdown</Button><Button variant="ghost" onClick={() => void onDelete(draft.id)}><Trash2 className="mr-2 h-4 w-4" />Remove from sandbox</Button></div>
    </CardContent></Card>
    <Card><CardHeader><CardTitle>Preview</CardTitle></CardHeader><CardContent><div className="prose-lite"><ReactMarkdown>{draft.contentMarkdown}</ReactMarkdown></div></CardContent></Card>
  </div>
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div className="space-y-1.5"><Label>{label}</Label>{children}</div> }
