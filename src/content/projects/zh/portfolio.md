---
lang: zh

title: "开发者作品集"

description: "一个使用 Astro、React、TypeScript 和 Tailwind CSS 构建的多语言开发者作品集，包含静态内容渲染、公开 Dashboard 体验模式，以及基于 ASP.NET Core 的本地内容编辑工具。"

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
  - "使用 Astro 构建的 Static HTML-first 架构"
  - "支持英语、瑞典语和中文，并使用独立语言路由"
  - "项目案例和技术文章通过 Markdown Content Collections 管理"
  - "提供基于 React 的公开 Dashboard 体验模式，修改仅保存在浏览器中"
  - "使用本地 ASP.NET Core 工具直接编辑 JSON 和 Markdown 源文件"
  - "通过本地 Dashboard 管理多语言 CV、博客和项目内容"
  - "采用 Git 驱动的发布流程，并通过 Vercel 自动重新构建"
  - "公开内容页面尽量减少客户端 JavaScript"

links:
  github: "https://github.com/jiantaoshen/portfolio-dev"
  live: "https://jiantao-dev.vercel.app"

draft: false
---

## 项目概述

这是一个使用 Astro、React、TypeScript 和 Tailwind CSS 构建的多语言开发者作品集，用于展示我的软件项目、技术文章和开发经验。

公开网站采用静态 content-to-code 架构。Astro 在构建阶段根据结构化 JSON 和 Markdown 内容生成 HTML，而 React 只用于 Dashboard 和公开 Trial 等真正需要交互的功能。

项目还包含一个基于 ASP.NET Core 的本地内容编辑工具，让我可以通过可视化 Dashboard 管理 Portfolio 内容，同时继续使用 Git 对实际源文件进行版本控制。

## 问题背景

一个开发者作品集不仅需要清晰展示技术能力，还需要随着项目和内容增加保持易于维护。

网站中包含多语言项目案例、技术文章、CV 信息和结构化 metadata。随着内容不断增加，如果始终手动维护多个源文件，操作会逐渐变得重复。

之前的 React SPA 架构还会对本质上属于静态内容的页面进行客户端渲染，因此增加了不必要的复杂度。

与此同时，如果把所有 Portfolio 内容迁移到数据库，又会与 Astro 的静态构建流程产生冲突，因为 Markdown 和 JSON 本身已经是构建时的内容来源。

## 解决方案

当前 Portfolio 使用 Astro 生成静态页面，并将公开内容直接保存在 Git repository 中。

项目案例和技术文章存储在 Markdown Content Collections 中，而多语言的个人背景、技能和教育信息则存储在对应语言的 JSON 文件中。

React Dashboard 为这些相同的内容提供可视化编辑界面。

公开的 `/trial` 路由用于展示 Dashboard 的功能，但不会保存任何修改。所有编辑内容只存在于浏览器 state 中，刷新页面后便会恢复。

在本地开发环境中，`/dashboard` 会与一个轻量的 ASP.NET Core 应用通信，由后端直接修改项目中的 JSON 和 Markdown 源文件。

因此发布流程仍然保持 Git-based：

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

这样既可以让生产环境保持纯静态，又能在本地获得类似 CMS 的内容编辑体验。

## 功能

### Static HTML-First Rendering

Astro 会预先生成公开 Portfolio 的静态 HTML。

项目案例、技术文章和多语言页面的主要内容无需依赖 React 或其他客户端框架即可显示。

### 多语言路由

英语、瑞典语和中文共用相同的 Astro 页面模板，同时使用不同语言路由，例如：

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

项目和技术文章以 Markdown 文件形式保存在对应语言目录下。

结构化信息保存在 frontmatter 中，而较长的技术内容直接使用 Markdown 编写。

### 本地内容管理 Dashboard

项目包含一个基于 React 的本地 Dashboard，可用于编辑：

- 个人背景 / CV 内容
- 技能
- 教育经历
- 博客文章
- 项目案例

CV、Blog 和 Projects 都分别提供英语、瑞典语和中文视图。

Blog 和 Project 编辑器还提供独立的 `Edit` 和 `Preview` Tab。

### ASP.NET Core 本地内容编辑器

本地 Dashboard 通过 ASP.NET Core API 直接修改 Portfolio 的源文件。

例如：

```text
/dashboard/cv
→ about.json

/dashboard/blog
→ src/content/blog/<language>/<slug>.md

/dashboard/projects
→ src/content/projects/<language>/<slug>.md
```

这个 backend 仅用于本地开发，不作为生产环境中的在线应用后端部署。

### 公开 Trial 模式

`/trial` 提供公开的 Dashboard sandbox。

访问者可以在界面中修改 CV、Blog 和 Project 内容，但这些修改只存在于 React state 中。

不会修改任何源文件或 backend 数据。

### 多语言 CV 下载

访问者可以根据当前语言下载英语、瑞典语或中文版 CV。

### 响应式设计

界面使用 Tailwind CSS，并通过可复用组件统一处理导航、卡片、文字样式、表单和 Dashboard 布局。

### 最小化客户端 JavaScript

公开 Portfolio 仍然以静态页面为主。

React 只用于确实需要交互状态的部分，而不是作为整个网站的渲染层。

## 挑战与技术决策

### 从 React SPA 迁移到 Astro

最初版本使用 React Router 和 `react-i18next`。

迁移过程中最重要的工作，是把静态内容渲染和真正需要客户端交互的功能分离。

现在 Astro 负责公开 Portfolio，而 React 主要负责 Dashboard。

### 将 Content 保留为 Source Code

数据库当然可以存储 Portfolio 内容，但当前网站已经直接使用 Markdown 和 JSON 作为 Astro build 输入。

如果再引入数据库，就会产生第二份内容来源，或者要求 Astro 在每次 build 时从外部 API 获取数据。

将内容直接保存在 repository 中，架构更加简单：

```text
Content
→ Git
→ Astro build
→ Static site
```

同时 Git 本身也提供版本历史、diff 和 rollback 能力。

### Local CMS 而不是在线 Backend

Dashboard 最初曾考虑发展成传统的在线 backend 架构。

但由于每次公开内容发生变化，本来就需要重新进行 Astro build，因此长期运行的在线 backend 并没有太大必要。

最终 ASP.NET Core 被简化为一个本地源文件编辑器。

这样既能保持生产架构简单，又能通过 Dashboard 提供实际可用的内容管理体验。

### Trial 与 Dashboard 分离

同一套 React UI 服务于两个不同用途。

`/trial` 面向公开访问，并且不持久化任何修改。

`/dashboard` 则是本地开发工具，可以真正修改项目源文件。

两种模式共用相同的 editor components，因此无需维护两套独立界面。

## 部署

Astro 会将 Portfolio 构建为静态 HTML、CSS、JavaScript 和其他资源。

公开网站部署在 Vercel。

生产部署只包含公开 Portfolio 和 Trial 界面，而本地 ASP.NET Core backend 和开发用 Dashboard 不会被部署。

内容更新继续采用标准 Git workflow：

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

## 后续改进

- 继续增加项目案例和技术文章
- 改进 Dashboard 的编辑流程和数据校验
- 为技术文章增加轻量级筛选或搜索
- 改进项目架构图和技术可视化
- 增加更丰富的结构化 SEO metadata
- 持续优化无障碍访问和性能