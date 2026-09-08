import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useCareerWorkspace } from "../workspace"

export function OverviewPage() {
  const { data, mode } = useCareerWorkspace()
  const en = data.about.en
  const skillCount = en.skills.items.reduce((sum, group) => sum + group.items.length + (group.staritem?.length ?? 0), 0)

  const stats = [
    ["Languages", 3],
    ["EN skills", skillCount],
    ["Projects", data.projects.length],
    ["Blog posts", data.blogPosts.length],
  ]

  return <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
      <p className="mt-1 text-zinc-500">
        {mode === "trial"
          ? "Experiment with a temporary browser copy of the portfolio CMS. Nothing is saved."
          : "Manage the multilingual About/CV JSON locally and preview the Markdown content already used by your Astro portfolio."}
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value]) => <Card key={label}>
        <CardHeader className="pb-2"><CardTitle className="text-sm text-zinc-500">{label}</CardTitle></CardHeader>
        <CardContent><div className="text-3xl font-bold">{value}</div></CardContent>
      </Card>)}
    </div>

    <Card>
      <CardHeader><CardTitle>Content sources</CardTitle></CardHeader>
      <CardContent className="space-y-3 text-sm text-zinc-600">
        <p><strong className="text-zinc-900">CV / About:</strong> <code>src/i18n/locales/en|sv|zh/about.json</code></p>
        <p><strong className="text-zinc-900">Blog:</strong> <code>src/content/blog/**</code> Markdown Content Collection</p>
        <p><strong className="text-zinc-900">Projects:</strong> <code>src/content/projects/**</code> Markdown Content Collection</p>
      </CardContent>
    </Card>
  </div>
}
