import { useEffect, useMemo, useState } from "react"
import { Clipboard, Plus, Save, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { EditorTabs, type EditorTab } from "../components/dashboard/editor-tabs"
import { LocaleSwitcher, localeLabels } from "../components/dashboard/locale-switcher"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import type { BlogPost, DashboardMode, Locale } from "../lib/types"
import { useCareerWorkspace } from "../workspace"

function emptyPost(language: Locale): BlogPost {
  return {
    id: crypto.randomUUID(),
    sourceId: "new/local",
    language,
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
  const [locale, setLocale] = useState<Locale>("en")
  const visiblePosts = useMemo(() => data.blogPosts.filter(post => post.language === locale), [data.blogPosts, locale])
  const [selectedId, setSelectedId] = useState(() => data.blogPosts.find(post => post.language === "en")?.id ?? "")
  const selected = useMemo(
    () => visiblePosts.find(post => post.id === selectedId) ?? null,
    [visiblePosts, selectedId],
  )

  useEffect(() => {
    if (!visiblePosts.some(post => post.id === selectedId)) {
      setSelectedId(visiblePosts[0]?.id ?? "")
    }
  }, [visiblePosts, selectedId])

  function add() {
    const staged = actions.stageBlog(emptyPost(locale))
    setSelectedId(staged.id)
  }

  return <div className="space-y-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-1 text-zinc-500">
          {mode === "trial"
            ? "Edit a temporary copy of your Astro blog content. Refresh or reset to discard changes."
            : "Edit Markdown Content Collection files directly through the local ASP.NET file writer."}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:items-end">
        <LocaleSwitcher value={locale} onChange={setLocale} />
        <Button disabled={saving} onClick={add}><Plus className="mr-2 h-4 w-4" />New {localeLabels[locale]} draft</Button>
      </div>
    </div>

    <div className={mode === "trial"
      ? "rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
      : "rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"}>
      {mode === "trial"
        ? <>Demo only. No file is written under <code>src/content/blog/</code>.</>
        : <>Saving writes <code>src/content/blog/{locale}/&lt;slug&gt;.md</code>. Entries are grouped by language so changing an item's locale is no longer part of normal editing.</>}
    </div>

    <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>{localeLabels[locale]} posts</CardTitle>
          <CardDescription>{visiblePosts.length} entries in <code>src/content/blog/{locale}/</code></CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {visiblePosts.length === 0 && <div className="rounded-lg border border-dashed border-zinc-200 p-6 text-center text-sm text-zinc-500">No {localeLabels[locale]} posts yet.</div>}
          {visiblePosts.map(post => <button key={post.id} onClick={() => setSelectedId(post.id)} className={`w-full rounded-lg border p-3 text-left ${selectedId === post.id ? "border-zinc-900 bg-zinc-50" : "border-zinc-200"}`}>
            <div className="font-medium">{post.title}</div>
            <div className="mt-1 flex flex-wrap gap-1"><Badge>{post.status}</Badge><Badge>{post.slug}</Badge></div>
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
        : <Card><CardContent className="p-10 text-center text-zinc-500">Select or create a {localeLabels[locale]} post.</CardContent></Card>}
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
  const [tab, setTab] = useState<EditorTab>("edit")

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

  return <Card>
    <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle>{draft.title || "Untitled post"}</CardTitle>
          <Badge>{localeLabels[draft.language]}</Badge>
        </div>
        <CardDescription>{mode === "trial" ? "Browser-only demo copy." : `Source: ${draft.sourceId}`}</CardDescription>
      </div>
      <EditorTabs value={tab} onChange={setTab} />
    </CardHeader>

    {tab === "edit" ? <CardContent className="grid gap-4 md:grid-cols-2">
      <Field label="Title"><Input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} /></Field>
      <Field label="Slug"><Input value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} /></Field>
      <Field label="Date"><Input type="date" value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} /></Field>
      <Field label="Reading time"><Input value={draft.readingTime} onChange={e => setDraft({ ...draft, readingTime: e.target.value })} placeholder="8 min" /></Field>
      <Field label="Status">
        <select className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm" value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value as BlogPost["status"] })}>
          <option value="draft">Draft</option><option value="published">Published</option>
        </select>
      </Field>
      <div className="flex items-end"><div className="pb-2 text-sm text-zinc-500">Language: <strong>{localeLabels[draft.language]}</strong></div></div>
      <div className="md:col-span-2"><Field label="Description / excerpt"><Textarea rows={3} value={draft.excerpt} onChange={e => setDraft({ ...draft, excerpt: e.target.value })} /></Field></div>
      <div className="md:col-span-2"><Field label="Tags (comma separated)"><Input value={tagsText} onChange={e => { setTagsText(e.target.value); setDraft({ ...draft, tags: splitComma(e.target.value) }) }} placeholder="Astro, React, Architecture" /></Field></div>
      <div className="md:col-span-2"><Field label="Markdown"><Textarea className="min-h-[520px] font-mono" value={draft.contentMarkdown} onChange={e => setDraft({ ...draft, contentMarkdown: e.target.value })} /></Field></div>

      <div className="md:col-span-2 flex flex-wrap gap-2">
        <Button disabled={saving} onClick={() => void save()}><Save className="mr-2 h-4 w-4" />{saving ? "Saving…" : mode === "trial" ? "Apply in demo" : "Save Markdown file"}</Button>
        <Button variant="outline" onClick={() => void copyMarkdown()}><Clipboard className="mr-2 h-4 w-4" />Copy body Markdown</Button>
        <Button variant="ghost" disabled={saving} onClick={() => void remove()}><Trash2 className="mr-2 h-4 w-4" />{mode === "trial" ? "Remove from demo" : "Delete source file"}</Button>
      </div>
    </CardContent> : <CardContent className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <div className="flex flex-wrap gap-2"><Badge>{draft.status}</Badge><Badge>{draft.date}</Badge><Badge>{draft.readingTime}</Badge></div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">{draft.title}</h2>
        {draft.excerpt && <p className="mt-2 text-zinc-600">{draft.excerpt}</p>}
        {draft.tags.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{draft.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}</div>}
      </div>
      <div className="prose-lite"><ReactMarkdown>{draft.contentMarkdown}</ReactMarkdown></div>
    </CardContent>}
  </Card>
}

function splitComma(value: string) {
  return value.split(",").map(item => item.trim()).filter(Boolean)
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
}
