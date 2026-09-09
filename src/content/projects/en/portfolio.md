---
lang: en
title: "Developer Portfolio"
description: "A multilingual developer portfolio built with Astro, React, TypeScript, Tailwind CSS and ASP.NET Core, with static content rendering, a public dashboard trial and a local content management workflow."
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
  - "Astro Content Collections"
  - "Markdown"
  - "Vercel"

highlights:
  - "Static HTML-first portfolio built with Astro"
  - "English, Swedish and Chinese support with language-specific routes"
  - "Blog and Project content managed through Markdown Content Collections"
  - "Multilingual About, Skills and Education content stored as JSON"
  - "Public dashboard Trial mode with browser-only editing"
  - "Local React and ASP.NET Core dashboard for editing source content"
  - "Blog and Project editors with separate Edit and Preview tabs"
  - "Git-based publishing workflow with Vercel rebuilds"

links:
  github: "https://github.com/jiantaoshen/portfolio-dev"
  live: "https://www.jiantao.dev"

draft: false
---

## Overview

Developer Portfolio is a multilingual portfolio built with Astro, React, TypeScript, Tailwind CSS and ASP.NET Core.

The public site uses Astro to generate static pages from Markdown and JSON content. English, Swedish and Chinese versions share the same application structure while using language-specific routes and content.

The project also includes two dashboard modes: a public Trial interface for exploring the editor and a local dashboard backed by ASP.NET Core for managing the portfolio source files.

The result is a static production site with a lightweight Git-based content workflow instead of a production database or CMS.

## The Problem

A multilingual portfolio contains several types of content that need to stay organized and easy to update.

The project includes:

- About and CV information
- Skills and education
- Blog articles
- Project case studies
- Content in English, Swedish and Chinese

Editing all of this content directly in source files is manageable at a small scale, but becomes less convenient as the amount of content grows.

At the same time, the public portfolio is primarily static. Introducing a production database and a permanent backend would add infrastructure that is unnecessary for content that only changes when the site is rebuilt.

The goal was therefore to keep the public site static while creating a more convenient way to manage its Markdown and JSON content.

## Solution

The portfolio follows a content-to-code architecture.

Blog and Project content is stored as Markdown and validated with Astro Content Collections. About, Skills and Education content is stored as multilingual JSON.

```text
JSON / Markdown
       ↓
     Astro
       ↓
 Static Build
       ↓
    Vercel
```

Astro uses these source files during the build process to generate the public portfolio.

For content management, the project adds a React-based dashboard on top of the same files.

The public `/trial` route provides a sandbox version of the editor where changes only exist in browser state.

The local `/dashboard` route connects to an ASP.NET Core backend that can directly update the portfolio's JSON and Markdown files.

```text
Dashboard
   ↓
ASP.NET Core
   ↓
JSON / Markdown
   ↓
Git commit
   ↓
Vercel rebuild
```

This keeps Git as the source of truth while still providing a visual content editing workflow.

## Features

### Static HTML-First Portfolio

The public portfolio is built with Astro and generated as static content.

Markdown and JSON are transformed into pages during the build process, keeping the deployed site lightweight and well suited to content-focused pages.

### Multilingual Support

The portfolio supports English, Swedish and Chinese.

Each language uses static routes under:

```text
/en/
/sv/
/zh/
```

The same structure is also used for language-specific Blog and Project content.

```text
/en/blog/
/sv/blog/
/zh/blog/

/en/projects/
/sv/projects/
/zh/projects/
```

This allows the site to share templates and components while keeping content separated by language.

### Markdown Content Collections

Blog articles and Project case studies are stored in language-specific Markdown directories.

```text
src/
├── content/
│   ├── blog/
│   │   ├── en/
│   │   ├── sv/
│   │   └── zh/
│   │
│   └── projects/
│       ├── en/
│       ├── sv/
│       └── zh/
```

Astro Content Collections are used to validate and manage this Markdown content.

Frontmatter stores structured metadata, while Markdown contains the main article or project content.

### Multilingual JSON Content

About, Skills and Education content is stored as multilingual JSON.

The language files are organized under:

```text
src/i18n/locales/
├── en/
├── sv/
└── zh/
```

This separates structured profile information from longer Markdown-based content while keeping both approaches inside the repository.

### Public Trial Mode

The portfolio includes a public dashboard sandbox at:

```text
/trial
```

Visitors can explore the editing interface and modify content inside the browser.

The changes only exist in browser state and are never written to the source files.

Refreshing the page resets the Trial content.

### Local Content Dashboard

A separate local dashboard is available at:

```text
/dashboard
```

It provides a React-based interface for managing portfolio content during development.

The dashboard supports multilingual content management for CV, Blog and Projects.

Blog and Project editors also include separate `Edit` and `Preview` tabs, making it possible to review Markdown content before updating the source files.

### ASP.NET Core Content Backend

The local dashboard communicates with a small ASP.NET Core backend.

Instead of storing content in a database, the backend directly edits the JSON and Markdown files used by Astro.

The backend is used only during local development.

This means the production portfolio does not depend on an application server for serving its content.

### Language-Specific CV Downloads

The portfolio provides CV downloads for English, Swedish and Chinese.

Visitors can access the CV version that matches the selected site language.

### Responsive Interface

Tailwind CSS is used for the portfolio and dashboard layouts.

The interface is designed to work across desktop and smaller screen sizes while sharing reusable styling patterns across pages and components.

## Architecture

The project separates public rendering from local content management.

### Public Site

```text
Markdown / JSON
      ↓
    Astro
      ↓
 Static HTML
      ↓
   Vercel
```

The deployed portfolio reads its content during the build process and produces a static site.

### Local Content Management

```text
React Dashboard
       ↓
ASP.NET Core
       ↓
Markdown / JSON
       ↓
      Git
       ↓
 Astro Build
       ↓
    Vercel
```

The dashboard acts as a visual editing layer over the same source files used by the public portfolio.

There is no separate production content database.

## Key Decisions

### Keeping Content in Git

Markdown and JSON remain the source of truth for the portfolio.

This keeps content together with the application code and allows changes to follow the same Git workflow as the rest of the project.

It also means Astro can generate the entire site directly from repository content during each build.

### Using a Local Backend

The ASP.NET Core backend is only needed when editing local source files.

It does not need to run as part of the deployed portfolio.

This keeps the production architecture simpler while still allowing the dashboard to provide file-based content management during development.

### Separating Trial and Local Dashboard Modes

The project provides two versions of the editing experience for different purposes.

```text
/trial
```

is public and non-persistent.

```text
/dashboard
```

is intended for local development and can update the actual source content through ASP.NET Core.

This makes it possible to demonstrate the dashboard publicly without exposing file-writing functionality.

### Using Markdown and JSON for Different Content Types

Long-form Blog and Project content is stored in Markdown, while structured profile information such as About, Skills and Education is stored in JSON.

This allows each content type to use a format that matches how it is edited and rendered.

## Development

Install the frontend dependencies:

```bash
npm install
```

Start Astro:

```bash
npm run dev
```

Start the local ASP.NET Core content backend:

```bash
cd backend/Career.Api
dotnet run
```

The default local addresses are:

```text
Astro:   http://localhost:4321
Backend: http://127.0.0.1:5080
```

## Deployment

The public portfolio is deployed to Vercel.

Astro builds the Markdown and JSON content into the static site, while the ASP.NET Core service remains part of the local development workflow.

Content updates follow a Git-based process:

```text
Edit content
     ↓
Git commit
     ↓
Vercel rebuild
```

This allows the deployed site to remain static while keeping portfolio content version-controlled in the repository.

## Future Improvements

- Expand Blog articles and Project case studies
- Improve dashboard editing and validation
- Add filtering or search for content
- Improve architecture diagrams and project visualizations
- Add richer structured SEO metadata
- Continue improving accessibility
- Continue improving performance