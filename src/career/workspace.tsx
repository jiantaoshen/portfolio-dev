import { createContext, useContext } from "react"
import { Navigate } from "react-router-dom"
import { DashboardShell } from "./components/dashboard/dashboard-shell"
import { useCareerData } from "./hooks/use-career-data"
import type { AboutByLocale, CareerSnapshot, DashboardMode, PortfolioContent } from "./lib/types"

type WorkspaceValue = ReturnType<typeof useCareerData> & { data: CareerSnapshot; mode: DashboardMode }
const WorkspaceContext = createContext<WorkspaceValue | null>(null)

export function useCareerWorkspace() {
  const value = useContext(WorkspaceContext)
  if (!value) throw new Error("useCareerWorkspace must be used inside CareerWorkspace")
  return value
}

export function CareerWorkspace({
  mode,
  initialContent,
  initialAbout,
}: {
  mode: DashboardMode
  initialContent: PortfolioContent
  initialAbout: AboutByLocale
}) {
  const state = useCareerData(mode, initialContent, initialAbout)
  const value = { ...state, data: state.data, mode }

  return <WorkspaceContext.Provider value={value}>
    <DashboardShell
      mode={mode}
      onReset={mode === "trial" ? state.reload : undefined}
      actionError={state.actionError}
      onDismissError={state.dismissActionError}
    />
  </WorkspaceContext.Provider>
}

export function WorkspaceIndex({ mode }: { mode: DashboardMode }) {
  return <Navigate to={mode === "trial" ? "/trial/cv" : "/dashboard/cv"} replace />
}
