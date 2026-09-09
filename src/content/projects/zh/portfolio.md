---
lang: zh
title: "开发者作品集"
description: "一个使用 Astro、React、TypeScript、Tailwind CSS 和 ASP.NET Core 构建的多语言开发者作品集，采用静态内容渲染，并提供公开的 Dashboard 试用模式和本地内容管理工作流。"
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
  - "使用 Astro 构建的静态 HTML-first 开发者作品集"
  - "支持英语、瑞典语和中文，并使用独立的语言路由"
  - "Blog 和 Project 内容通过 Markdown 与 Astro Content Collections 管理"
  - "About、Skills 和 Education 的多语言内容以 JSON 形式存储"
  - "公开的 Dashboard Trial 模式，所有编辑仅保存在浏览器状态中"
  - "使用 React 和 ASP.NET Core 构建的本地内容管理 Dashboard"
  - "Blog 和 Project 编辑器提供独立的 Edit 与 Preview 标签页"
  - "基于 Git 的发布工作流，并通过 Vercel 自动重新构建"

links:
  github: "https://github.com/jiantaoshen/portfolio-dev"
  live: "https://www.jiantao.dev"

draft: false
---

## 项目概述

Developer Portfolio 是一个使用 Astro、React、TypeScript、Tailwind CSS 和 ASP.NET Core 构建的多语言开发者作品集。

公开网站使用 Astro 根据 Markdown 和 JSON 内容生成静态页面。英语、瑞典语和中文版本共享相同的应用结构，同时使用各自独立的语言路由和内容。

项目还包含两种 Dashboard 模式：一个供访客体验编辑界面的公开 Trial 模式，以及一个通过 ASP.NET Core 管理作品集源文件的本地 Dashboard。

最终的生产环境仍然是一个静态网站，内容管理采用轻量级的 Git 工作流，而不是生产数据库或传统 CMS。

## 问题背景

一个多语言开发者作品集通常包含多种需要持续维护的内容。

该项目包括：

- About 和 CV 信息
- Skills 和 Education
- Blog 文章
- Project 项目案例
- 英语、瑞典语和中文内容

当内容较少时，直接编辑源文件并不会带来太大问题。但随着内容逐渐增加，在多个文件中手动维护这些信息会变得越来越不方便。

与此同时，公开作品集本质上主要是静态内容。

如果为此引入生产数据库和长期运行的后端服务，就会增加额外的基础设施复杂度，而这些内容实际上只有在网站重新构建时才需要更新。

因此，这个项目的目标是在保持生产网站静态化的同时，提供一种更加方便的 Markdown 和 JSON 内容管理方式。

## 解决方案

作品集采用 content-to-code 架构。

Blog 和 Project 内容以 Markdown 存储，并通过 Astro Content Collections 进行验证。About、Skills 和 Education 等结构化多语言内容则存储为 JSON。

```text
JSON / Markdown
       ↓
     Astro
       ↓
   静态构建
       ↓
    Vercel
```

Astro 在构建阶段读取这些源文件，并生成公开作品集页面。

为了改善内容管理体验，项目在同一套源文件之上增加了一个基于 React 的 Dashboard。

公开的 `/trial` 路由提供一个沙盒版本的编辑器，所有修改都只存在于浏览器状态中。

本地 `/dashboard` 路由则连接到 ASP.NET Core 后端，可以直接修改作品集中的 JSON 和 Markdown 源文件。

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

通过这种方式，Git 仍然是内容的唯一事实来源，同时又能获得类似 CMS 的可视化编辑体验。

## 功能

### 静态 HTML-First 作品集

公开作品集使用 Astro 构建，并生成静态内容。

Markdown 和 JSON 会在构建阶段转换为页面，使部署后的站点保持轻量，同时非常适合以内容展示为主的页面。

### 多语言支持

作品集支持英语、瑞典语和中文。

每种语言都使用独立的静态路由：

```text
/en/
/sv/
/zh/
```

Blog 和 Project 内容同样采用语言独立的路由结构：

```text
/en/blog/
/sv/blog/
/zh/blog/

/en/projects/
/sv/projects/
/zh/projects/
```

这样可以让不同语言共享相同的模板和组件，同时保持各语言内容相互独立。

### Markdown Content Collections

Blog 文章和 Project 项目案例保存在按语言划分的 Markdown 目录中。

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

项目使用 Astro Content Collections 对这些 Markdown 内容进行管理和验证。

Frontmatter 用于保存结构化元数据，正文内容则直接使用 Markdown 编写。

### 多语言 JSON 内容

About、Skills 和 Education 内容以多语言 JSON 文件的形式存储。

语言文件位于：

```text
src/i18n/locales/
├── en/
├── sv/
└── zh/
```

这种方式将结构化个人资料与较长的 Markdown 内容分开，同时确保所有内容都保存在同一个 Git 仓库中。

### 公开 Trial 模式

作品集提供一个公开的 Dashboard 沙盒：

```text
/trial
```

访客可以在界面中体验内容编辑功能，并修改 CV、Blog 和 Project 等内容。

但所有修改都只存在于 React 的浏览器状态中，不会写入任何源文件。

刷新页面后，Trial 中的修改会被重置。

### 本地内容 Dashboard

项目还提供一个独立的本地 Dashboard：

```text
/dashboard
```

它使用 React 构建，为开发环境中的作品集内容管理提供可视化界面。

Dashboard 支持对 CV、Blog 和 Project 进行多语言管理。

Blog 和 Project 编辑器还提供独立的 `Edit` 和 `Preview` 标签页，可以在更新源文件之前预览 Markdown 内容。

### ASP.NET Core 内容后端

本地 Dashboard 与一个轻量级 ASP.NET Core 后端通信。

后端不会将内容保存到数据库，而是直接修改 Astro 使用的 JSON 和 Markdown 源文件。

该后端仅用于本地开发环境。

因此，生产环境中的公开作品集不依赖应用服务器来提供页面内容。

### 多语言 CV 下载

作品集提供英语、瑞典语和中文版本的 CV 下载。

访客可以根据当前选择的网站语言下载对应版本的 CV。

### 响应式界面

作品集和 Dashboard 的界面均使用 Tailwind CSS 构建。

页面针对桌面端和较小屏幕进行了响应式设计，同时在不同页面和组件之间复用统一的布局与样式模式。

## 架构

项目将公开页面渲染与本地内容管理明确分离。

### 公开网站

```text
Markdown / JSON
      ↓
    Astro
      ↓
   静态 HTML
      ↓
   Vercel
```

部署后的作品集在构建阶段读取内容，并生成静态网站。

### 本地内容管理

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

Dashboard 相当于同一套内容源文件之上的可视化编辑层。

项目不需要额外的生产内容数据库。

## 关键设计决策

### 将内容保留在 Git 中

Markdown 和 JSON 始终作为作品集内容的唯一事实来源。

这样可以让内容和应用代码保存在同一个仓库中，并让内容修改遵循与项目其他代码相同的 Git 工作流。

同时，Astro 可以在每次构建时直接根据仓库中的内容生成完整网站。

### 使用本地后端

ASP.NET Core 后端只在需要修改本地源文件时使用。

它不需要作为生产作品集的一部分长期运行。

这种设计让生产架构保持简单，同时又让本地 Dashboard 能够提供基于文件的内容管理能力。

### 分离 Trial 与 Dashboard 模式

项目针对不同用途提供了两种编辑模式。

```text
/trial
```

是公开且非持久化的。

```text
/dashboard
```

用于本地开发，并可以通过 ASP.NET Core 更新真实的源内容。

这样既可以公开展示 Dashboard 的功能，又不会暴露能够直接写入源文件的能力。

### 针对不同内容类型使用 Markdown 和 JSON

较长的 Blog 和 Project 内容使用 Markdown 存储，而 About、Skills 和 Education 等结构化资料则使用 JSON。

这样可以让不同类型的内容使用更适合其编辑和渲染方式的数据格式。

## 开发

安装前端依赖：

```bash
npm install
```

启动 Astro：

```bash
npm run dev
```

启动本地 ASP.NET Core 内容后端：

```bash
cd backend/Career.Api
dotnet run
```

默认本地地址：

```text
Astro:   http://localhost:4321
Backend: http://127.0.0.1:5080
```

## 部署

公开作品集部署在 Vercel。

Astro 会将 Markdown 和 JSON 内容构建为静态网站，而 ASP.NET Core 服务只保留在本地开发工作流中。

内容更新使用基于 Git 的流程：

```text
编辑内容
   ↓
Git commit
   ↓
Vercel rebuild
```

这样既能让生产网站保持静态和轻量，也能让作品集内容继续通过 Git 进行版本管理。

## 后续改进

- 持续扩充 Blog 文章和 Project 项目案例
- 改进 Dashboard 的编辑流程和内容验证
- 为内容增加筛选或搜索功能
- 改进架构图和项目技术可视化
- 增加更丰富的结构化 SEO 元数据
- 持续改进无障碍体验
- 持续优化性能