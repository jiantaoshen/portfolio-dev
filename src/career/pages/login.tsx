import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { KeyRound, ShieldCheck } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { authApi } from "../lib/api"

export function LoginPage() {
  const [email, setEmail] = useState("admin@local.test")
  const [password, setPassword] = useState("dev-admin")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError("")
    try {
      await authApi.login(email, password)
      navigate("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setBusy(false)
    }
  }

  return <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white"><KeyRound className="h-5 w-5" /></div>
        <CardTitle>Admin sign in</CardTitle>
        <CardDescription>This is a local Microsoft-style account simulation. It creates a secure HttpOnly admin session, but it is not Microsoft Entra yet.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={submit}>
          <div className="space-y-1.5"><Label>Email</Label><Input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Password</Label><Input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /></div>
          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <Button className="w-full" disabled={busy}><ShieldCheck className="mr-2 h-4 w-4" />{busy ? "Signing in…" : "Sign in to dashboard"}</Button>
        </form>
        <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
          Development account: <strong>admin@local.test</strong> / <strong>dev-admin</strong>. Change it in <code>backend/Career.Api/appsettings.Development.json</code>.
        </div>
        <Button variant="ghost" className="mt-3 w-full" onClick={() => navigate("/trial")}>Open public demo instead</Button>
      </CardContent>
    </Card>
  </div>
}
