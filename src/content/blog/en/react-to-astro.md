---
lang: en
title: "Moving My Portfolio from React to Astro"
description: "Why I moved a content-heavy developer portfolio from a client-side React SPA to an HTML-first Astro architecture using static routes, Markdown, and Content Collections."
date: 2026-09-02
readingTime: "8 min"
tags:
  - "Astro"
  - "React"
  - "TypeScript"
  - "Architecture"
  - "Static Site"
draft: false
---

## The Problem

My portfolio originally used React, React Router, and react-i18next.

The architecture worked well technically, but as the site grew, most of its pages turned out to be fundamentally content-driven:

- project case studies
- technical notes
- portfolio information
- multilingual content
- downloadable CVs

Very little of this content required client-side application state.

A project case study does not need React to remain interactive. A technical note should not require JavaScript simply to display its text. Most navigation also consists of normal links between pages.

That raised a simple architectural question:

**Why was a client-side application responsible for rendering content that could already exist as HTML?**

## Options Considered

I considered three approaches.

### A. Keep the Existing React SPA

The simplest option was to keep React Router and react-i18next and continue adding content to the existing architecture.

This required the least migration work, but it also meant continuing to use client-side rendering for pages that did not benefit from it.

### B. Keep React but Introduce Static Generation

Another option was to keep the React component model while moving toward a framework that supports pre-rendering.

This could reduce runtime rendering, but React would still remain a central part of the application even though most pages were primarily documents.

### C. Move to Astro

Astro was a better match for the actual shape of the website.

It allows pages and components to be written using a component-based development model while generating static HTML during the build process.

Client-side JavaScript can then be introduced only when a feature genuinely needs it.

I chose **C**.

## The New Architecture

The current site uses Astro, TypeScript, Tailwind CSS, Markdown, and Astro Content Collections.

```text
Markdown / Translation Data
            ↓
           Astro
            ↓
       Build Process
            ↓
       Static HTML
            ↓
          Browser
```

Project pages and technical notes are generated ahead of time.

The browser receives HTML and CSS for the main content instead of waiting for a JavaScript application to construct the page.

## Moving from Runtime i18n to Static Language Routes

The previous version used react-i18next to change language at runtime.

The new site instead uses explicit language routes:

```text
/en/
/sv/
/zh/
```

The same structure applies to project pages:

```text
/en/projects/price-watch/
/sv/projects/price-watch/
/zh/projects/price-watch/
```

and technical notes:

```text
/en/blog/react-to-astro/
/sv/blog/react-to-astro/
/zh/blog/react-to-astro/
```

Astro generates these pages during the build.

Shared interface text still comes from language-specific translation files, but there is no need for a runtime i18n library to render the main content.

This also makes the URL itself describe the current language.

## Moving Long-Form Content from JSON to Markdown

The original site stored project documentation and technical-note content inside JSON structures.

That worked for structured metadata, but it became uncomfortable for longer technical writing.

For example, a project could contain fields such as:

```text
overview
problem
solution
features
challenges
deployment
learnings
futureImprovements
```

The new architecture separates structured metadata from long-form content.

Metadata stays in Markdown frontmatter:

```yaml
title: "Price Watch"
status: "Done"
technologies:
  - ASP.NET Core
  - Python
  - Playwright
```

The rest of the project documentation is written as normal Markdown:

```md
## The Problem

...

## Solution

...

## Challenges & Decisions

...
```

This makes project case studies much easier to maintain.

## Content Collections

Both technical notes and projects now use Astro Content Collections.

```text
src/content/

  blog/
    en/
    sv/
    zh/

  projects/
    en/
    sv/
    zh/
```

The same slug can exist in each language:

```text
projects/en/price-watch.md
projects/sv/price-watch.md
projects/zh/price-watch.md
```

The same Content Collection entry can also power multiple parts of the site.

```text
Project Markdown
       │
       ├── Homepage Featured Projects
       ├── Projects List
       └── Project Detail Page
```

Technical notes work the same way:

```text
Technical Note Markdown
          │
          ├── Homepage Latest Notes
          ├── Blog List
          └── Article Detail Page
```

This removes duplicated content sources.

## Replacing React Router

React Router was previously responsible for client-side navigation.

Astro now generates normal static routes instead.

```html
<a href="/en/projects/price-watch/">
```

Dynamic Astro routes such as:

```text
[lang]/projects/[...slug].astro
```

are resolved during the build using entries available in the Content Collection.

## Keeping Tailwind CSS

The migration did not require changing the visual design system.

Tailwind CSS still provides:

- typography
- spacing
- responsive layouts
- cards
- navigation
- buttons
- reusable design primitives

The important difference is that Tailwind produces CSS. The browser does not need React for those styles to work.

## JavaScript Is Still Available

Moving to Astro does not mean avoiding JavaScript completely.

The goal is to use JavaScript only where it provides actual value.

Future features such as client-side search, interactive filtering, advanced visualizations, or stateful UI tools can still use JavaScript.

But rendering a project description or technical article does not require it.

Even the current mobile navigation can use native HTML elements such as `<details>` rather than a JavaScript state hook.

## Trade-offs

The migration introduced additional build-time structure.

Content schemas need to remain consistent, static routes need to be generated correctly, and multilingual Markdown files need matching slugs.

There was also migration work involved in replacing:

```text
React components
React Router
react-i18next
JSON article data
JSON project documentation
```

with:

```text
Astro components
static routes
build-time translations
Markdown
Content Collections
```

However, these costs are mostly development-time concerns. The resulting runtime architecture is simpler.

## Result

The portfolio is now much closer to the type of application it actually is.

It is primarily a collection of documents and project information, so those documents are generated as HTML.

The development workflow still keeps reusable components, TypeScript, Tailwind CSS, structured content schemas, multilingual content, and reusable layouts.

But the browser receives mostly HTML and CSS.

```text
Content
   ↓
Astro Build
   ↓
Static HTML + CSS
   ↓
Browser
```

instead of:

```text
Content
   ↓
JavaScript Bundle
   ↓
React Runtime
   ↓
Browser Rendering
```

For this type of website, that is a better fit.

