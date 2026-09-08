import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { authApi } from "../lib/api"

export function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"loading" | "ok" | "no">("loading")
  useEffect(() => { authApi.me().then(x => setState(x.authenticated ? "ok" : "no")).catch(() => setState("no")) }, [])
  if (state === "loading") return <div className="p-10 text-center text-sm text-zinc-500">Checking admin session…</div>
  if (state === "no") return <Navigate to="/login" replace />
  return <>{children}</>
}
