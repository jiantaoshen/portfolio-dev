# Developer Portfolio

A multilingual developer portfolio and content management project built with Astro, React, TypeScript, Tailwind CSS, and ASP.NET Core.

The public portfolio is primarily statically generated with Astro, while interactive dashboard features are implemented with React. A small ASP.NET Core backend is used for local admin authentication and content-management operations.

**Live site:**
https://jiantao-dev.vercel.app

## Tech Stack

### Frontend

* Astro
* React
* TypeScript
* Tailwind CSS
* Astro Content Collections
* Markdown

### Backend

* C#
* ASP.NET Core
* Cookie-based authentication
* CSRF protection
* Rate limiting

### Deployment

* Vercel
* Git / GitHub

## Features

* English, Swedish, and Chinese support
* Static language routes under `/en/`, `/sv/`, and `/zh/`
* Project case studies powered by Markdown Content Collections
* Technical articles powered by Markdown Content Collections
* Multilingual About/CV content stored as structured JSON
* Responsive design
* Language-specific CV downloads
* Static HTML-first portfolio rendering
* Minimal client-side JavaScript on public portfolio pages
* React-based admin dashboard
* Public dashboard trial mode
* Local development authentication
* Markdown preview for blog and project content
* Reusable Astro, React, and UI components

## Main Routes

The public portfolio uses language-specific Astro routes:

```text
/en/
/sv/
/zh/

/en/about/
/sv/about/
/zh/about/

/en/projects/
/sv/projects/
/zh/projects/

/en/blog/
/sv/blog/
/zh/blog/
```

The career management interface uses separate routes:

```text
/trial
/trial/cv
/trial/blog
/trial/projects

/login

/dashboard
/dashboard/cv
/dashboard/blog
/dashboard/projects
```

### Trial Mode

`/trial` provides a public demonstration of the dashboard interface.

Trial changes only exist in browser state and are never written to the backend or source files.

Refreshing the page restores the original portfolio content.

### Admin Dashboard

The admin dashboard is intended for authenticated content management.

During local development, authentication is handled by the ASP.NET Core backend.

Local development credentials are stored with .NET User Secrets and are not committed to the repository.

Production authentication is planned to use an external identity provider rather than the local development account.

## Content Architecture

The portfolio uses the existing source files as the source of truth instead of duplicating public content in a database.

### About / CV

Multilingual About and CV content is stored as JSON:

```text
src/i18n/locales/

├── en/
│   └── about.json
│
├── sv/
│   └── about.json
│
└── zh/
    └── about.json
```

The dashboard CV editor works with the same structure used by the public About pages:

```text
About

├── Background
├── Skills
└── Education
```

This prevents the dashboard and public portfolio from maintaining separate copies of the same information.

### Blog

Technical articles are stored as Markdown:

```text
src/content/blog/

├── en/
├── sv/
└── zh/
```

### Projects

Project case studies are also stored as Markdown:

```text
src/content/projects/

├── en/
├── sv/
└── zh/
```

Both collections are validated using Astro Content Collections.

## Internationalization

Interface translations are stored separately from long-form Markdown content:

```text
src/i18n/locales/

├── en/
├── sv/
└── zh/
```

This separation keeps UI translations, About/CV data, project case studies, and technical articles organized independently.

## Architecture

The public portfolio follows a static-first architecture:

```text
JSON / Markdown
       ↓
     Astro
       ↓
 Static Build
       ↓
  HTML + CSS
       ↓
    Browser
```

Interactive career-management pages use React:

```text
Portfolio Content
       ↓
      Astro
       ↓
React Dashboard
       ↓
 Browser State
```

For Trial mode, the flow stops in the browser:

```text
JSON / Markdown
       ↓
     Astro
       ↓
 React Trial UI
       ↓
 Local Browser State
```

No data is persisted.

For local Admin mode:

```text
React Dashboard
       ↓
 ASP.NET Core API
       ↓
Source Content
```

The ASP.NET Core backend currently provides development authentication and controlled content-management operations.

## Repository Structure

```text
portfolio-dev/

├── public/
│
├── src/
│   ├── career/
│   ├── components/
│   ├── content/
│   │   ├── blog/
│   │   └── projects/
│   ├── i18n/
│   ├── layouts/
│   ├── pages/
│   └── styles/
│
├── backend/
│   └── Career.Api/
│
├── astro.config.mjs
├── package.json
├── .gitignore
└── .vercelignore
```

The `backend/` directory remains part of the Git repository but is excluded from the Vercel frontend deployment.

## Development

### Frontend

Install dependencies:

```bash
npm install
```

Start the Astro development server:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:4321
```

### Backend

Move into the ASP.NET Core project:

```bash
cd backend/Career.Api
```

Run the backend:

```bash
dotnet run
```

The local API normally runs at:

```text
http://localhost:5080
```

The Astro development server proxies `/api` requests to the local ASP.NET Core backend.

## Local Authentication

Local admin authentication is intended only for development.

Credentials should be configured with .NET User Secrets:

```bash
dotnet user-secrets set "LocalAuth:Enabled" "true"
dotnet user-secrets set "LocalAuth:Email" "admin@local.test"
dotnet user-secrets set "LocalAuth:Password" "your-local-password"
```

Secrets are stored outside the repository and should never be committed to Git.

The local authentication endpoint should only be enabled when the ASP.NET Core application runs in the `Development` environment.

## Deployment

The Astro frontend is deployed to Vercel.

The ASP.NET Core backend is currently treated as a separate application and is not included in the Vercel frontend deployment.

```text
GitHub Repository

├── Astro / React
│       ↓
│     Vercel
│
└── ASP.NET Core
        ↓
   Separate backend deployment
```

The repository uses `.vercelignore` to exclude:

```text
backend/
```

from the Vercel frontend deployment.

## Future Content Publishing

The long-term goal is to keep Git as the source of truth for public portfolio content.

A future production workflow can use:

```text
Admin Dashboard
       ↓
 ASP.NET Core
       ↓
   GitHub API
       ↓
Commit JSON / Markdown
       ↓
     Vercel
       ↓
  Astro Rebuild
```

This allows portfolio content to remain version-controlled while still providing a CMS-like editing experience.

## Project Background

The portfolio originally used a client-side React SPA architecture with React Router and `react-i18next`.

It was later migrated to Astro to better match the content-heavy and mostly static nature of the site.

React is now used only where richer client-side interaction is useful, particularly for the career dashboard and public trial interface.

This keeps the public portfolio lightweight while still allowing the project to demonstrate frontend, backend, authentication, API, content-management, and deployment concepts.
