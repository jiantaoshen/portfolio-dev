# Developer Portfolio

A multilingual developer portfolio built with Astro, TypeScript and Tailwind CSS.

**Live site:**  
Firebase:
https://jiantao-portfolio-dev.web.app

Vercel:
https://jiantao-portfolio-dev.vercel.app

## Tech Stack

- Astro
- TypeScript
- Tailwind CSS
- Astro Content Collections
- Markdown
- Firebase Hosting

## Features

- English, Swedish and Chinese support
- Static language routes under `/en/`, `/sv/` and `/zh/`
- Project case studies powered by Markdown Content Collections
- Technical notes powered by Markdown Content Collections
- Static HTML-first rendering
- Responsive design
- Language-specific CV downloads
- Minimal client-side JavaScript
- Reusable Astro components and layouts

## Content Structure

Long-form content is stored in Markdown and validated through Astro Content Collections.

```text
src/content/
├── blog/
│   ├── en/
│   ├── sv/
│   └── zh/
└── projects/
    ├── en/
    ├── sv/
    └── zh/
```

Shared interface translations are stored separately:

```text
src/i18n/locales/
├── en/
├── sv/
└── zh/
```

This keeps UI translations separate from project case studies and technical articles.

## Routing

Astro generates static pages for each supported language.

Examples:

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

Project and article detail pages are generated from Content Collection entries during the build process.

## Development

Install dependencies:

```bash
npm install
```

Start the Astro development server:

```bash
npm run dev
```

## Architecture

The portfolio originally used a client-side React SPA architecture with React Router and react-i18next.

It has since been migrated to Astro to better match the content-heavy nature of the site.

The current flow is:

```text
Markdown / Translation Data
            ↓
           Astro
            ↓
       Static Build
            ↓
      HTML + CSS
            ↓
          Browser
```

Project documentation and technical notes remain readable without requiring a client-side JavaScript framework.
