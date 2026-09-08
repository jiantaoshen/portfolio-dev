import type { AboutContent, Locale } from "./types"

let csrfToken: string | null = null

async function getCsrfToken() {
  if (csrfToken) return csrfToken
  const response = await fetch("/api/auth/csrf", { credentials: "include" })
  if (!response.ok) throw new Error(`Failed to get CSRF token (${response.status})`)
  const data = await response.json() as { token: string }
  csrfToken = data.token
  return csrfToken
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const method = (init?.method ?? "GET").toUpperCase()
  const headers = new Headers(init?.headers)
  headers.set("Content-Type", "application/json")

  const needsCsrf = (url.startsWith("/api/admin") || url === "/api/auth/logout") && !["GET", "HEAD", "OPTIONS"].includes(method)
  if (needsCsrf) {
    headers.set("X-CSRF-TOKEN", await getCsrfToken())
  }

  const response = await fetch(url, { credentials: "include", ...init, headers })
  if (!response.ok) {
    let message = `HTTP ${response.status}`
    try {
      const body = await response.json() as { error?: string; detail?: string; title?: string }
      message = body.error ?? body.detail ?? body.title ?? message
    } catch {
      const text = await response.text()
      if (text) message = text
    }
    throw new Error(message)
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const authApi = {
  me: () => request<{ authenticated: boolean; name?: string; email?: string }>("/api/auth/me"),
  login: (email: string, password: string) => request<{ ok: true; name: string; email: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }),
  logout: async () => {
    csrfToken = null
    return request<void>("/api/auth/logout", { method: "POST" })
  },
}

export const adminApi = {
  updateAbout: (locale: Locale, content: AboutContent) => request<AboutContent>(`/api/admin/about/${locale}`, {
    method: "PUT",
    body: JSON.stringify(content),
  }),
}
