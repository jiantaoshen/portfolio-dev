import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { CareerWorkspace, WorkspaceIndex } from "./workspace"
import { OverviewPage } from "./pages/overview"
import { CvEditorPage } from "./pages/cv-editor"
import { BlogEditorPage } from "./pages/blog-editor"
import { ProjectsEditorPage } from "./pages/projects-editor"
import type { AboutByLocale, PortfolioContent } from "./lib/types"

const emptyContent: PortfolioContent = { projects: [], blogPosts: [] }

export function CareerRouterApp({
  initialContent = emptyContent,
  initialAbout,
}: {
  initialContent?: PortfolioContent
  initialAbout: AboutByLocale
}) {
  return <BrowserRouter><Routes>
    <Route path="/trial" element={<CareerWorkspace mode="trial" initialContent={initialContent} initialAbout={initialAbout} />}>
      <Route index element={<WorkspaceIndex mode="trial" />} />
      <Route path="overview" element={<OverviewPage />} />
      <Route path="cv" element={<CvEditorPage />} />
      <Route path="blog" element={<BlogEditorPage />} />
      <Route path="projects" element={<ProjectsEditorPage />} />
    </Route>

    <Route path="/dashboard" element={<CareerWorkspace mode="admin" initialContent={initialContent} initialAbout={initialAbout} />}>
      <Route index element={<WorkspaceIndex mode="admin" />} />
      <Route path="overview" element={<OverviewPage />} />
      <Route path="cv" element={<CvEditorPage />} />
      <Route path="blog" element={<BlogEditorPage />} />
      <Route path="projects" element={<ProjectsEditorPage />} />
    </Route>

    <Route path="*" element={<Navigate to="/trial" replace />} />
  </Routes></BrowserRouter>
}
