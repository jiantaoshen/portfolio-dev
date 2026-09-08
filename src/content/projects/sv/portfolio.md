---
lang: en

title: "Developer Portfolio"

description: "A multilingual developer portfolio built with Astro, React, TypeScript and Tailwind CSS, featuring static content rendering, a public dashboard trial, and a local ASP.NET Core content editor."

status: "Live"

order: 3

featured: true

featuredOrder: 3

technologies:
  - "Astro"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "ASP.NET Core"
  - "Content Collections"
  - "Markdown"
  - "Vercel"

highlights:
  - "Static HTML-first portfolio built with Astro"
  - "Supports English, Swedish and Chinese with language-specific routes"
  - "Project case studies and technical notes stored in Markdown Content Collections"
  - "Public React-based dashboard trial with browser-only editing"
  - "Local ASP.NET Core content editor for JSON and Markdown source files"
  - "Multilingual CV, blog and project management through a local dashboard"
  - "Git-based publishing workflow with automatic Vercel rebuilds"
  - "Minimal client-side JavaScript on public content pages"

links:
  github: "https://github.com/jiantaoshen/portfolio-dev"
  live: "https://jiantao-dev.vercel.app"

draft: false
---

## Overview

This portfolio is a multilingual developer site built with Astro, React, TypeScript and Tailwind CSS to present my software projects, technical notes and development experience.

The public site follows a static content-to-code architecture. Astro generates HTML from structured JSON and Markdown content during the build process, while React is used only for interactive features such as the dashboard and public trial interface.

The project also includes a local ASP.NET Core content editor that allows portfolio content to be managed through a visual dashboard while keeping the actual source files under Git version control.

## The Problem

A developer portfolio needs to communicate technical experience clearly while remaining easy to maintain.

The site contains multilingual project case studies, technical notes, CV information and structured metadata. Maintaining these directly across multiple files can become repetitive as the amount of content grows.

The previous React SPA architecture also used client-side rendering for pages that were fundamentally static, adding complexity without providing significant benefit.

At the same time, moving all portfolio content into a database would not fit the static Astro build process, where Markdown and JSON files already act as the source of truth.

## Solution

The portfolio uses Astro for static page generation and keeps public content directly in the repository.

Project case studies and technical notes are stored in Markdown Content Collections, while multilingual About, Skills and Education data is stored in language-specific JSON files.

A React-based dashboard provides a visual editing interface over the same content.

The public `/trial` route demonstrates the dashboard without saving changes. All edits remain in browser state and are reset when the page is refreshed.

For local development, `/dashboard` connects to a small ASP.NET Core application that directly updates the JSON and Markdown source files.

The publishing workflow remains Git-based:

```text
Dashboard
    ↓
ASP.NET Core
    ↓
JSON / Markdown
    ↓
Git commit
    ↓
Git push
    ↓
Vercel rebuild
```

This keeps the site static in production while still providing a CMS-like editing experience locally.

## Features

### Static HTML-First Rendering

Astro pre-renders the public portfolio into static HTML.

Project case studies, technical notes and multilingual pages do not require React or another client-side framework to render their main content.

### Multilingual Routing

English, Swedish and Chinese share the same Astro templates while using language-specific routes such as:

```text
/en/
/sv/
/zh/

/en/projects/
/sv/projects/
/zh/projects/

/en/blog/
/sv/blog/
/zh/blog/
```

### Markdown Content Collections

Projects and technical articles are stored as Markdown files under language-specific directories.

Structured metadata remains in frontmatter, while longer technical content is written directly in Markdown.

### Local Content Dashboard

The project includes a React-based local dashboard for editing:

- About / CV content
- Skills
- Education
- Blog articles
- Project case studies

CV, Blog and Projects are separated into English, Swedish and Chinese views.

Blog and Project editors also provide separate `Edit` and `Preview` tabs.

### ASP.NET Core Local Content Editor

The local dashboard communicates with an ASP.NET Core API that writes directly to the portfolio source files.

For example:

```text
/dashboard/cv
→ about.json

/dashboard/blog
→ src/content/blog/<language>/<slug>.md

/dashboard/projects
→ src/content/projects/<language>/<slug>.md
```

The backend is intentionally used only during local development and is not deployed as a production application backend.

### Public Trial Mode

The `/trial` route provides a public sandbox version of the dashboard.

Visitors can modify CV, Blog and Project content inside the interface, but changes only exist in React state.

No source files or backend data are modified.

### Language-Specific CV Downloads

Visitors can download English, Swedish or Chinese CV versions based on the selected site language.

### Responsive Design

The interface uses Tailwind CSS with reusable components for navigation, cards, typography, forms and dashboard layouts.

### Minimal Client-Side JavaScript

The public portfolio remains primarily static.

React is only introduced where interactive state is useful, instead of being used as the rendering layer for the entire website.

## Challenges & Decisions

### Moving from React SPA to Astro

The original version used React Router and `react-i18next`.

The migration required separating static content rendering from features that genuinely need client-side interaction.

Astro now handles the public portfolio, while React remains responsible for the dashboard.

### Keeping Content as Source Code

A database could store portfolio content, but the site already uses Markdown and JSON as Astro build inputs.

Using a database would introduce a second source of truth or require Astro to retrieve content from an external API during each build.

Keeping content in the repository provides a simpler model:

```text
Content
→ Git
→ Astro build
→ Static site
```

It also provides built-in version history, diffs and rollback through Git.

### Local CMS Instead of an Online Backend

The dashboard originally evolved toward a traditional online backend architecture.

However, because every public content update already requires a new Astro build, an always-online backend was unnecessary.

The ASP.NET Core service was therefore simplified into a local file editor.

This keeps the production architecture lightweight while still providing a practical dashboard for content management.

### Trial and Dashboard Separation

The same React interface serves two different purposes.

`/trial` is public and non-persistent.

`/dashboard` is a local development tool capable of writing source files.

Sharing the editor components between both modes avoids maintaining separate interfaces.

## Deployment

Astro builds the portfolio into static HTML, CSS, JavaScript and assets.

The public site is deployed to Vercel.

The production deployment includes the public portfolio and Trial interface, while the local ASP.NET Core backend and development dashboard are excluded from the Vercel deployment.

Content updates follow the normal Git workflow:

```text
Edit
↓
Review git diff
↓
Commit
↓
Push
↓
Vercel rebuild
```

## Future Improvements

- Continue expanding project case studies and technical notes
- Improve dashboard editing workflows and validation
- Add lightweight filtering or search for technical articles
- Improve project architecture diagrams and technical visualizations
- Add richer structured SEO metadata
- Continue improving accessibility and performance