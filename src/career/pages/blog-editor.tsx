import { useMemo, useState } from "react"
import { Clipboard, Plus, Save, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import type { BlogPost } from "../lib/types"
import { useCareerWorkspace } from "../workspace"

function emptyPost(): BlogPost {
  const now = new Date().toISOString()
  return { id: crypto.randomUUID(), sourceId: "new/local", language: "en", title: "New post", slug: `post-${Date.now()}`, excerpt: "", contentMarkdown: "# New post\n\nStart writing here.", status: "draft", createdAt: now, updatedAt: now, publishedAt: null }
}

export function BlogEditorPage() {
  const { data, actions } = useCareerWorkspace()
  const [selectedId, setSelectedId] = useState(data.blogPosts[0]?.id ?? "")
  const selected = useMemo(() => data.blogPosts.find(x => x.id === selectedId) ?? null, [data.blogPosts, selectedId])
  async function add() { const p = emptyPost(); await actions.saveBlog(p); setSelectedId(p.id) }

  return <div className="space-y-6">
    <div className="flex items-end justify-between gap-3"><div><h1 className="text-3xl font-bold tracking-tight">Blog sandbox</h1><p className="mt-1 text-zinc-500">Loads your Astro Markdown posts. Editing is local-only in phase 1; source files remain the canonical content.</p></div><Button onClick={() => void add()}><Plus className="mr-2 h-4 w-4" />New draft</Button></div>
    <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">Blog files remain under <code>src/content/blog/</code>. This editor is a safe preview surface until a GitHub/content publishing adapter is added.</div>
    <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
      <Card><CardHeader><CardTitle>Posts</CardTitle><CardDescription>{data.blogPosts.length} entries across your content collections</CardDescription></CardHeader><CardContent className="space-y-2">{data.blogPosts.map(post => <button key={post.id} onClick={() => setSelectedId(post.id)} className={`w-full rounded-lg border p-3 text-left ${selectedId === post.id ? "border-zinc-900 bg-zinc-50" : "border-zinc-200"}`}><div className="font-medium">{post.title}</div><div className="mt-1 flex gap-1"><Badge>{post.language}</Badge><Badge>{post.status}</Badge></div></button>)}</CardContent></Card>
      {selected ? <PostEditor key={selected.id} post={selected} onSave={actions.saveBlog} onDelete={async id => { await actions.deleteBlog(id); setSelectedId("") }} /> : <Card><CardContent className="p-10 text-center text-zinc-500">Select or create a post.</CardContent></Card>}
    </div>
  </div>
}

function PostEditor({ post, onSave, onDelete }: { post: BlogPost; onSave: (p: BlogPost) => Promise<void>; onDelete: (id: string) => Promise<void> }) {
  const [draft, setDraft] = useState(post)
  async function copyMarkdown() { await navigator.clipboard.writeText(draft.contentMarkdown) }
  return <div className="space-y-5">
    <Card><CardHeader><CardTitle>Edit post</CardTitle><CardDescription>Local sandbox only. Use Copy Markdown to move the result back to your existing content file.</CardDescription></CardHeader><CardContent className="grid gap-4 md:grid-cols-2">
      <Field label="Language"><Input value={draft.language} onChange={e => setDraft({ ...draft, language: e.target.value })} /></Field>
      <Field label="Title"><Input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} /></Field>
      <Field label="Slug"><Input value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} /></Field>
      <Field label="Source ID"><Input disabled value={draft.sourceId} /></Field>
      <div className="md:col-span-2"><Field label="Excerpt"><Textarea rows={3} value={draft.excerpt} onChange={e => setDraft({ ...draft, excerpt: e.target.value })} /></Field></div>
      <Field label="Status"><select className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm" value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value as BlogPost["status"] })}><option value="draft">Draft</option><option value="published">Published</option></select></Field>
      <div className="md:col-span-2"><Field label="Markdown"><Textarea className="min-h-[360px] font-mono" value={draft.contentMarkdown} onChange={e => setDraft({ ...draft, contentMarkdown: e.target.value })} /></Field></div>
      <div className="md:col-span-2 flex flex-wrap gap-2"><Button onClick={() => void onSave({ ...draft, updatedAt: new Date().toISOString() })}><Save className="mr-2 h-4 w-4" />Apply locally</Button><Button variant="outline" onClick={() => void copyMarkdown()}><Clipboard className="mr-2 h-4 w-4" />Copy Markdown</Button><Button variant="ghost" onClick={() => void onDelete(draft.id)}><Trash2 className="mr-2 h-4 w-4" />Remove from sandbox</Button></div>
    </CardContent></Card>
    <Card><CardHeader><CardTitle>Preview</CardTitle></CardHeader><CardContent><div className="prose-lite"><ReactMarkdown>{draft.contentMarkdown}</ReactMarkdown></div></CardContent></Card>
  </div>
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div className="space-y-1.5"><Label>{label}</Label>{children}</div> }
