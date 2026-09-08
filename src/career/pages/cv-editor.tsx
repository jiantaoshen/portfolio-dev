import { useEffect, useState } from "react"
import { ExternalLink, Plus, Save, Star, Trash2 } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import type { AboutContent, AboutEducationItem, AboutSkillGroup, Locale } from "../lib/types"
import { useCareerWorkspace } from "../workspace"

const localeLabels: Record<Locale, string> = { en: "English", sv: "Svenska", zh: "中文" }
const clone = <T,>(value: T): T => structuredClone(value)

function blankSkillGroup(): AboutSkillGroup {
  return { title: "New category", staritem: [], items: [] }
}

function blankEducation(): AboutEducationItem {
  return { period: "", degree: "", school: "", description: "", thesis: "", thesisUrl: "" }
}

export function CvEditorPage() {
  const { data, actions, saving, mode } = useCareerWorkspace()
  const [locale, setLocale] = useState<Locale>("en")
  const [draft, setDraft] = useState<AboutContent>(() => clone(data.about.en))

  useEffect(() => {
    setDraft(clone(data.about[locale]))
  }, [locale, data.about])

  const previewHref = `/${locale}/about`
  const sourcePath = `src/i18n/locales/${locale}/about.json`

  function updateSkillGroup(index: number, next: AboutSkillGroup) {
    setDraft(current => ({
      ...current,
      skills: {
        ...current.skills,
        items: current.skills.items.map((group, i) => i === index ? next : group),
      },
    }))
  }

  function removeSkillGroup(index: number) {
    setDraft(current => ({
      ...current,
      skills: { ...current.skills, items: current.skills.items.filter((_, i) => i !== index) },
    }))
  }

  function updateEducation(index: number, next: AboutEducationItem) {
    setDraft(current => ({
      ...current,
      education: {
        ...current.education,
        items: current.education.items.map((item, i) => i === index ? next : item),
      },
    }))
  }

  function removeEducation(index: number) {
    setDraft(current => ({
      ...current,
      education: { ...current.education, items: current.education.items.filter((_, i) => i !== index) },
    }))
  }

  return <div className="space-y-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CV / About</h1>
        <p className="mt-1 text-zinc-500">Directly edits the same multilingual JSON structure used by your Astro About page.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(localeLabels) as Locale[]).map(item => (
          <Button key={item} size="sm" variant={locale === item ? "default" : "outline"} onClick={() => setLocale(item)}>
            {localeLabels[item]}
          </Button>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-3 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <strong>{mode === "trial" ? "Demo copy" : "Local content file"}:</strong> <code>{sourcePath}</code>
        <div className="mt-1 text-sky-800">
          {mode === "trial"
            ? "Changes stay in browser memory and disappear on reset/refresh."
            : "Save writes this JSON file through the local ASP.NET editor. Review git diff, then commit and push normally."}
        </div>
      </div>
      <Button variant="outline" size="sm" asChild>
        <a href={previewHref} target="_blank" rel="noreferrer">Open public page <ExternalLink className="ml-2 h-4 w-4" /></a>
      </Button>
    </div>

    <Card>
      <CardHeader><CardTitle>Background / Story</CardTitle><CardDescription>Maps to <code>story.title</code> and <code>story.paragraphs</code>.</CardDescription></CardHeader>
      <CardContent className="space-y-4">
        <Field label="Section title"><Input value={draft.story.title} onChange={e => setDraft(current => ({ ...current, story: { ...current.story, title: e.target.value } }))} /></Field>
        <div className="space-y-3">
          {draft.story.paragraphs.map((paragraph, index) => (
            <div key={index} className="flex gap-2">
              <Textarea rows={4} value={paragraph} onChange={e => setDraft(current => ({
                ...current,
                story: { ...current.story, paragraphs: current.story.paragraphs.map((p, i) => i === index ? e.target.value : p) },
              }))} />
              <Button variant="ghost" size="icon" aria-label="Remove paragraph" onClick={() => setDraft(current => ({ ...current, story: { ...current.story, paragraphs: current.story.paragraphs.filter((_, i) => i !== index) } }))}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setDraft(current => ({ ...current, story: { ...current.story, paragraphs: [...current.story.paragraphs, ""] } }))}><Plus className="mr-2 h-4 w-4" />Add paragraph</Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><CardTitle>Skills</CardTitle><CardDescription>Each card maps directly to one item in <code>skills.items</code>. Focus technologies map to <code>staritem</code>.</CardDescription></div>
        <Button variant="outline" size="sm" onClick={() => setDraft(current => ({ ...current, skills: { ...current.skills, items: [...current.skills.items, blankSkillGroup()] } }))}><Plus className="mr-2 h-4 w-4" />Add category</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Section title"><Input value={draft.skills.title} onChange={e => setDraft(current => ({ ...current, skills: { ...current.skills, title: e.target.value } }))} /></Field>
          <Field label="Section description"><Input value={draft.skills.description} onChange={e => setDraft(current => ({ ...current, skills: { ...current.skills, description: e.target.value } }))} /></Field>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {draft.skills.items.map((group, index) => <SkillGroupEditor key={`${locale}-${index}`} group={group} onChange={next => updateSkillGroup(index, next)} onDelete={() => removeSkillGroup(index)} />)}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><CardTitle>Education & Learning</CardTitle><CardDescription>Maps directly to <code>education.items</code>, including optional thesis and thesis URL.</CardDescription></div>
        <Button variant="outline" size="sm" onClick={() => setDraft(current => ({ ...current, education: { ...current.education, items: [...current.education.items, blankEducation()] } }))}><Plus className="mr-2 h-4 w-4" />Add education</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Section title"><Input value={draft.education.title} onChange={e => setDraft(current => ({ ...current, education: { ...current.education, title: e.target.value } }))} /></Field>
          <Field label="Section description"><Input value={draft.education.description} onChange={e => setDraft(current => ({ ...current, education: { ...current.education, description: e.target.value } }))} /></Field>
        </div>
        <div className="space-y-4">
          {draft.education.items.map((item, index) => <EducationEditor key={`${locale}-${index}`} item={item} onChange={next => updateEducation(index, next)} onDelete={() => removeEducation(index)} />)}
        </div>
      </CardContent>
    </Card>

    <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-zinc-600"><Badge>{locale}</Badge> {sourcePath}</div>
      <Button disabled={saving} onClick={() => void actions.saveAbout(locale, draft).catch(() => {})}><Save className="mr-2 h-4 w-4" />{saving ? "Saving…" : mode === "trial" ? "Apply locally" : `Save ${localeLabels[locale]}`}</Button>
    </div>
  </div>
}

function SkillGroupEditor({ group, onChange, onDelete }: { group: AboutSkillGroup; onChange: (next: AboutSkillGroup) => void; onDelete: () => void }) {
  const [focusText, setFocusText] = useState((group.staritem ?? []).join(", "))
  const [itemsText, setItemsText] = useState(group.items.join(", "))

  return <div className="space-y-3 rounded-xl border border-zinc-200 p-4">
    <div className="flex items-center gap-2">
      <Input value={group.title} onChange={e => onChange({ ...group, title: e.target.value })} />
      <Button variant="ghost" size="icon" aria-label="Delete skill category" onClick={onDelete}><Trash2 className="h-4 w-4" /></Button>
    </div>
    <Field label="Focus technologies (comma separated)">
      <Input value={focusText} onChange={e => { setFocusText(e.target.value); onChange({ ...group, staritem: splitTags(e.target.value) }) }} placeholder="C#, Python" />
    </Field>
    <Field label="Other technologies (comma separated)">
      <Textarea rows={3} value={itemsText} onChange={e => { setItemsText(e.target.value); onChange({ ...group, items: splitTags(e.target.value) }) }} placeholder="ASP.NET Core, REST APIs, JWT" />
    </Field>
    {(group.staritem?.length ?? 0) > 0 && <div className="flex flex-wrap gap-1">{group.staritem!.map(item => <Badge key={item} className="bg-amber-100 text-amber-800"><Star className="mr-1 h-3 w-3" />{item}</Badge>)}</div>}
  </div>
}

function EducationEditor({ item, onChange, onDelete }: { item: AboutEducationItem; onChange: (next: AboutEducationItem) => void; onDelete: () => void }) {
  return <div className="grid gap-4 rounded-xl border border-zinc-200 p-4 md:grid-cols-2">
    <Field label="Period"><Input value={item.period} onChange={e => onChange({ ...item, period: e.target.value })} /></Field>
    <Field label="Degree / learning activity"><Input value={item.degree} onChange={e => onChange({ ...item, degree: e.target.value })} /></Field>
    <Field label="School / location"><Input value={item.school} onChange={e => onChange({ ...item, school: e.target.value })} /></Field>
    <div />
    <div className="md:col-span-2"><Field label="Description"><Textarea rows={4} value={item.description ?? ""} onChange={e => onChange({ ...item, description: e.target.value })} /></Field></div>
    <Field label="Thesis (optional)"><Input value={item.thesis ?? ""} onChange={e => onChange({ ...item, thesis: e.target.value })} /></Field>
    <Field label="Thesis URL (optional)"><Input value={item.thesisUrl ?? ""} onChange={e => onChange({ ...item, thesisUrl: e.target.value })} /></Field>
    <div className="md:col-span-2"><Button variant="ghost" size="sm" onClick={onDelete}><Trash2 className="mr-2 h-4 w-4" />Delete education item</Button></div>
  </div>
}

function splitTags(value: string) {
  return value.split(",").map(item => item.trim()).filter(Boolean)
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
}
