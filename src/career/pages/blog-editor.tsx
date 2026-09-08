import { useMemo, useState } from "react"
import { Clipboard, Plus, Save, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import type { BlogPost, DashboardMode, Locale } from "../lib/types"
import { useCareerWorkspace } from "../workspace"

function emptyPost(): BlogPost {
  return {
    id: crypto.randomUUID(),
    sourceId: "new/local",
    language: "en",
    title: "New post",
    slug: `post-${Date.now()}`,
    excerpt: "",
    contentMarkdown: "# New post\n\nStart writing here.",
    date: new Date().toISOString().slice(0, 10),
    readingTime: "5 min",
    tags: [],
    status: "draft",
  }
}

export function BlogEditorPage() {
  const { data, actions, mode, saving } = useCareerWorkspace()
  const [selectedId, setSelectedId] = useState(data.blogPosts[0]?.id ?? "")
  const selected = useMemo(() => data.blogPosts.find(x => x.id === selectedId) ?? null, [data.blogPosts, selectedId])

  async function add() {
    const post = emptyPost()
    const staged = actions.stageBlog(post)
    setSelectedId(staged.id)
  }

  return <div className="space-y-6">
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-1 text-zinc-500">
          {mode === "trial"
            ? "Edit a temporary copy of your Astro blog content. Refresh or reset to discard changes."
            : "Edit Markdown Content Collection files directly through the local ASP.NET file writer."}
        </p>
      </div>
      <Button disabled={saving} onClick={() => void add()}><Plus className="mr-2 h-4 w-4" />New draft</Button>
    </div>

    <div className={mode === "trial"
      ? "rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
      : "rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"}>
      {mode === "trial"
        ? <>Demo only. No file is written under <code>src/content/blog/</code>.</>
        : <>Saving writes <code>src/content/blog/&lt;language&gt;/&lt;slug&gt;.md</code>. Changing language or slug moves the existing source file after validation.</>}
    </div>

    <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
      <Card>
        <CardHeader><CardTitle>Posts</CardTitle><CardDescription>{data.blogPosts.length} entries across your content collections</CardDescription></CardHeader>
        <CardContent className="space-y-2">
          {data.blogPosts.map(post => <button key={post.id} onClick={() => setSelectedId(post.id)} className={`w-full rounded-lg border p-3 text-left ${selectedId === post.id ? "border-zinc-900 bg-zinc-50" : "border-zinc-200"}`}>
            <div className="font-medium">{post.title}</div>
            <div className="mt-1 flex flex-wrap gap-1"><Badge>{post.language}</Badge><Badge>{post.status}</Badge></div>
          </button>)}
        </CardContent>
      </Card>

      {selected
        ? <PostEditor
            key={selected.id}
            post={selected}
            mode={mode}
            saving={saving}
            onSave={actions.saveBlog}
            onDelete={async post => { await actions.deleteBlog(post); setSelectedId("") }}
          />
        : <Card><CardContent className="p-10 text-center text-zinc-500">Select or create a post.</CardContent></Card>}
    </div>
  </div>
}

function PostEditor({
  post,
  mode,
  saving,
  onSave,
  onDelete,
}: {
  post: BlogPost
  mode: DashboardMode
  saving: boolean
  onSave: (post: BlogPost) => Promise<BlogPost>
  onDelete: (post: BlogPost) => Promise<void>
}) {
  const [draft, setDraft] = useState(post)
  const [tagsText, setTagsText] = useState(post.tags.join(", "))

  async function copyMarkdown() {
    await navigator.clipboard.writeText(draft.contentMarkdown)
  }

  async function save() {
    try {
      const saved = await onSave(draft)
      setDraft(saved)
      setTagsText(saved.tags.join(", "))
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
      <CardHeader>
        <CardTitle>Edit post</CardTitle>
        <CardDescription>{mode === "trial" ? "Browser-only demo copy." : `Source: ${draft.sourceId}`}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <Field label="Language">
          <select className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm" value={draft.language} onChange={e => setDraft({ ...draft, language: e.target.value as Locale })}>
            <option value="en">English</option><option value="sv">Svenska</option><option value="zh">中文</option>
          </select>
        </Field>
        <Field label="Title"><Input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} /></Field>
        <Field label="Slug"><Input value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} /></Field>
        <Field label="Date"><Input type="date" value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} /></Field>
        <Field label="Reading time"><Input value={draft.readingTime} onChange={e => setDraft({ ...draft, readingTime: e.target.value })} placeholder="8 min" /></Field>
        <Field label="Status">
          <select className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm" value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value as BlogPost["status"] })}>
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
        </Field>
        <div className="md:col-span-2"><Field label="Description / excerpt"><Textarea rows={3} value={draft.excerpt} onChange={e => setDraft({ ...draft, excerpt: e.target.value })} /></Field></div>
        <div className="md:col-span-2"><Field label="Tags (comma separated)"><Input value={tagsText} onChange={e => { setTagsText(e.target.value); setDraft({ ...draft, tags: splitComma(e.target.value) }) }} placeholder="Astro, React, Architecture" /></Field></div>
        <div className="md:col-span-2"><Field label="Markdown"><Textarea className="min-h-[420px] font-mono" value={draft.contentMarkdown} onChange={e => setDraft({ ...draft, contentMarkdown: e.target.value })} /></Field></div>

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
}
