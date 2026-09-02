---
lang: en
title: "Developer Portfolio"
description: "A multilingual developer portfolio built with Astro, TypeScript and Tailwind CSS, using static HTML, Content Collections and Markdown to present projects, technical notes and software development experience."
category: "Application & Web Delivery"
status: "Live"
order: 3
featured: true
featuredOrder: 3
technologies:
  - "Astro"
  - "TypeScript"
  - "Tailwind CSS"
  - "Content Collections"
  - "Markdown"
  - "Firebase Hosting"
highlights:
  - "Static HTML-first architecture built with Astro"
  - "Supports English, Swedish and Chinese with language-specific routes"
  - "Project case studies and technical notes stored in Markdown Content Collections"
  - "Reusable static routes generated for project and article detail pages"
  - "Language-specific CV downloads"
  - "Responsive interface built with Tailwind CSS"
  - "Minimal client-side JavaScript for content-heavy pages"
  - "Designed for static deployment on Firebase Hosting"
architecture:
  - label: "Application"
    value: "Astro · TypeScript"
  - label: "Styling"
    value: "Tailwind CSS"
  - label: "Content"
    value: "Astro Content Collections · Markdown"
  - label: "Internationalization"
    value: "Static i18n · English · Swedish · Chinese"
  - label: "Rendering"
    value: "Pre-rendered Static HTML"
  - label: "Delivery"
    value: "Firebase Hosting"
links:
  github: "https://github.com/jiantaoshen/portfolio-dev"
  live: "https://jiantao-portfolio-dev.web.app"
draft: false
---

## Overview

This portfolio is a multilingual developer site built with Astro, TypeScript and Tailwind CSS to present my software projects, technical notes and development direction.

The site originally used a React SPA architecture. As the content grew, most pages did not need client-side application state or runtime rendering. The current implementation therefore uses Astro to generate static HTML during the build process while keeping reusable components, TypeScript and Tailwind CSS in the development workflow.

Project case studies and technical notes are stored as Markdown in Astro Content Collections, while shared interface text remains in lightweight language-specific translation files.

## The Problem

A developer portfolio should communicate more than a list of technologies. It needs to show technical strengths, evidence from real projects and a clear development direction to recruiters, clients and engineering teams.

At the same time, a content-heavy portfolio should remain easy to maintain. Project case studies, technical notes and multilingual content should not require duplicated page components or large client-side rendering libraries.

The previous React-based structure worked, but much of the site was fundamentally static content. Rendering those pages through a client-side application added complexity without providing much benefit.

## Solution

The current architecture uses Astro as an HTML-first static site framework.

Each language uses the same page templates with language-specific routes such as `/en/`, `/sv/` and `/zh/`. Shared interface translations are loaded at build time, while project case studies and technical notes are stored in Markdown Content Collections.

Astro generates the final HTML during the build process. This means project pages, technical notes and most navigation content remain readable without requiring client-side JavaScript.

Tailwind CSS provides a reusable responsive design system, and TypeScript is used for page data, component props and content schemas.

## Features

### Static HTML-First Rendering

Astro pre-renders content pages into static HTML. Project case studies and technical notes do not depend on a client-side framework to display their main content.

### Multilingual Routing

English, Swedish and Chinese share the same Astro templates while using language-specific URLs such as `/en/projects/`, `/sv/projects/` and `/zh/projects/`.

### Project Content Collections

Project case studies are stored as Markdown files under language-specific Content Collection directories. Project metadata such as technologies, architecture, status and links lives in frontmatter, while longer project documentation is written directly in Markdown.

### Technical Notes

Technical notes use the same Content Collection approach. Adding a new Markdown file automatically makes it available to the blog list, homepage previews and detail routes without maintaining duplicate JSON article data.

### Language-Specific CV Downloads

Visitors can download the English, Swedish or Chinese version of the CV based on the current site language.

### Responsive Design

The interface uses Tailwind CSS and a small reusable design system for typography, cards, buttons, navigation and layout across desktop and mobile screens.

### Minimal Client-Side JavaScript

Content rendering, route generation, navigation state and multilingual page generation are handled at build time wherever possible. JavaScript is reserved for features that genuinely need interaction.

### Simple Contact Experience

Visitors can contact me directly through email or LinkedIn without requiring a contact-form backend or account system.

## Challenges & Decisions

### Moving from React to Astro

The main migration challenge was separating content rendering from application behavior. React Router, react-i18next and React-based page components were removed while preserving the existing design system, multilingual structure and project URLs.

### Multilingual Content Structure

English, Swedish and Chinese need to remain structurally consistent without creating three copies of every page component. Language-specific routes and shared Astro templates solve this while keeping content files separated by locale.

### Content Model Design

Large project descriptions and technical notes were previously stored inside JSON structures. Moving long-form content into Markdown makes writing and maintaining technical documentation significantly easier, while frontmatter keeps structured metadata available for cards, sorting and sidebars.

### Static Routes from Content Collections

Project and article detail pages are generated from Content Collection entries. File paths provide stable language-aware identifiers, allowing the same slug to be reused across English, Swedish and Chinese.

### Reuse Without Overengineering

The site uses reusable Astro components for layout, navigation, project previews and article previews, while simple one-off page sections remain straightforward HTML and Tailwind rather than being abstracted unnecessarily.

## Deployment

Astro builds the site into static HTML, CSS and assets that can be deployed to Firebase Hosting.

The static architecture removes the need for SPA fallback routing for normal content pages and reduces the amount of client-side JavaScript required to render the site.

## Learnings

- Migrating a React SPA to an Astro static-site architecture
- Building HTML-first pages with Astro and TypeScript
- Designing multilingual static routes without runtime i18n libraries
- Managing project case studies with Astro Content Collections
- Managing technical notes as Markdown content
- Sharing one content model across homepage previews, list pages and detail pages
- Designing static routes from language-aware Content Collection IDs
- Maintaining a Tailwind CSS design system across Astro components
- Reducing client-side JavaScript for content-heavy websites
- Preparing static Astro output for Firebase Hosting

## Future Improvements

- Continue expanding project case studies and technical notes
- Add lightweight filtering or search as the technical note collection grows
- Improve project architecture diagrams and technical visualizations
- Add richer SEO metadata and structured data
- Continue improving accessibility and performance
