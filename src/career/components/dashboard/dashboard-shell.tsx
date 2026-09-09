import { NavLink, Outlet } from "react-router-dom"
import { BriefcaseBusiness, FileUser, Gauge, Home, RotateCcw, X } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import type { DashboardMode } from "../../lib/types"

const items = [
  { to: "overview", label: "Overview", icon: Gauge },
  { to: "cv", label: "CV / About", icon: FileUser },
  { to: "projects", label: "Projects", icon: BriefcaseBusiness },
]

export function DashboardShell({ mode, onReset, actionError, onDismissError }: { mode: DashboardMode; onReset?: () => void; actionError?: string | null; onDismissError?: () => void }) {
  const base = mode === "trial" ? "/trial" : "/dashboard"

  return (
    <div className="min-h-screen bg-zinc-50 lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-zinc-200 bg-white p-4 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="mb-6 flex items-center justify-between lg:block">
          <div>
            <div className="text-sm font-medium text-zinc-500">JIANTAO.dev</div>
            <div className="text-xl font-bold">{mode === "trial" ? "CMS Demo" : "Local Content Editor"}</div>
          </div>
          <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", mode === "trial" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800")}>{mode}</span>
        </div>

        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={`${base}/${to}`} className={({ isActive }) => cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium", isActive ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950")}>
              <Icon className="h-4 w-4" />{label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild><a href="/"><Home className="mr-2 h-4 w-4" />Portfolio home</a></Button>
          {mode === "trial" && onReset && <Button variant="outline" className="w-full justify-start" onClick={onReset}><RotateCcw className="mr-2 h-4 w-4" />Reset demo</Button>}
        </div>
      </aside>

      <main className="min-w-0">
        {mode === "trial" && (
          <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-sm text-amber-900">
            <strong>Demo mode.</strong> You are editing a temporary browser copy of public portfolio content. No write request is sent to the backend.
          </div>
        )}
        {mode === "admin" && (
          <div className="border-b border-emerald-200 bg-emerald-50 px-6 py-3 text-sm text-emerald-900">
            <strong>Local editor.</strong> Saves write directly to portfolio JSON and Markdown source files. Review the Git diff before committing and pushing.
          </div>
        )}
        {actionError && (
          <div className="flex items-center justify-between gap-3 border-b border-red-200 bg-red-50 px-6 py-3 text-sm text-red-800">
            <span><strong>Save failed:</strong> {actionError}</span>
            {onDismissError && <button className="rounded p-1 hover:bg-red-100" onClick={onDismissError} aria-label="Dismiss error"><X className="h-4 w-4" /></button>}
          </div>
        )}
        <div className="mx-auto max-w-7xl p-5 sm:p-8"><Outlet /></div>
      </main>
    </div>
  )
}
