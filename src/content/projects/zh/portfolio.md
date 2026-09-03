---
lang: zh
title: "Developer Portfolio"
description: "一个使用 Astro、TypeScript 和 Tailwind CSS 构建的多语言开发者 Portfolio，通过静态 HTML、Content Collections 和 Markdown 展示项目、技术笔记和软件开发经验。"
category: "应用与 Web 交付"
status: "已上线"
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
  - "使用 Astro 构建 HTML-first 静态架构"
  - "支持英文、瑞典语和中文独立语言路由"
  - "项目 Case Study 和技术笔记通过 Markdown Content Collections 管理"
  - "为项目和文章详情页生成可复用的静态路由"
  - "根据当前网站语言提供对应语言的 CV 下载"
  - "使用 Tailwind CSS 构建响应式界面"
  - "内容型页面尽量减少客户端 JavaScript"
  - "面向 Firebase Hosting 的静态部署结构"
architecture:
  - label: "应用"
    value: "Astro · TypeScript"
  - label: "样式"
    value: "Tailwind CSS"
  - label: "内容"
    value: "Astro Content Collections · Markdown"
  - label: "国际化"
    value: "静态 i18n · English · Swedish · Chinese"
  - label: "渲染"
    value: "预渲染静态 HTML"
  - label: "应用交付"
    value: "Firebase Hosting"
links:
  github: "https://github.com/jiantaoshen/portfolio-dev"
  live: "https://jiantao-portfolio-dev.web.app"
draft: false
---

## 项目概览

这个 Portfolio 是一个使用 Astro、TypeScript 和 Tailwind CSS 构建的多语言开发者网站，用于展示我的软件项目、技术笔记和开发方向。

网站最初使用 React SPA 架构。随着内容增加，我发现大多数页面并不需要客户端应用状态或运行时渲染，因此当前实现改用 Astro 在构建阶段生成静态 HTML，同时继续保留组件化开发、TypeScript 和 Tailwind CSS 的开发体验。

项目 Case Study 和技术笔记现在通过 Astro Content Collections 以 Markdown 管理，而页面导航等共享 UI 文案继续保留在轻量级的多语言翻译文件中。

## 要解决的问题

开发者 Portfolio 不应该只是技术名称的列表。它需要向招聘者、客户和工程团队清楚展示技术优势、真实项目证据和明确的开发方向。

同时，一个以内容为主的 Portfolio 也应该容易维护。项目 Case Study、技术笔记和多语言内容不应该要求复制三套页面组件，也不应该为了显示静态内容而依赖大型客户端渲染框架。

原来的 React 架构可以正常工作，但网站的大部分内容本质上都是静态内容。继续通过客户端应用渲染这些页面会增加复杂度，却没有带来明显收益。

## 解决方案

当前架构使用 Astro 作为 HTML-first 的静态网站框架。

英文、瑞典语和中文共用同一套 Astro 页面模板，通过 `/en/`、`/sv/` 和 `/zh/` 等语言路由生成独立页面。共享 UI 翻译在构建阶段读取，而项目 Case Study 和技术笔记则存储在 Markdown Content Collections 中。

Astro 在 build 阶段生成最终 HTML，因此项目详情、技术笔记和大部分导航内容即使没有客户端 JavaScript 也可以正常阅读。

Tailwind CSS 提供统一的响应式设计系统，TypeScript 用于页面数据、组件 Props 和 Content Collection Schema。

## 核心功能

### HTML-First 静态渲染

Astro 会将内容页面预渲染为静态 HTML。项目 Case Study 和技术笔记不依赖客户端框架才能显示主要内容。

### 多语言静态路由

英文、瑞典语和中文共用 Astro 模板，但生成独立 URL，例如 `/en/projects/`、`/sv/projects/` 和 `/zh/projects/`。

### Project Content Collections

项目 Case Study 存储在按语言划分的 Markdown 文件中。technologies、architecture、status 和 links 等结构化数据保存在 frontmatter，较长的项目文档直接使用 Markdown 编写。

### 技术笔记

Technical Notes 使用相同的 Content Collection 模型。新增一篇 Markdown 后，可以自动出现在 Blog 列表、首页预览和详情路由中，不再需要同时维护 JSON 中的文章数据。

### 多语言 CV 下载

访问者可以根据当前网站语言下载英文、瑞典语或中文版 CV。

### 响应式设计

界面使用 Tailwind CSS 和一套轻量级可复用设计系统，统一管理 typography、card、button、navigation 和 layout。

### 尽量减少客户端 JavaScript

内容渲染、路由生成、导航状态和多语言页面生成尽量在构建阶段完成。只有真正需要交互的功能才使用客户端 JavaScript。

### 简洁的联系方式

访问者可以直接通过邮箱或 LinkedIn 联系我，不需要额外的联系表单后端或账户系统。

## 挑战与决策

### 从 React 迁移到 Astro

迁移的主要挑战是把内容渲染与真正的应用交互逻辑分开。React Router、react-i18next 和 React 页面组件被逐步移除，同时保留原来的设计系统、多语言结构和项目 URL 逻辑。

### 多语言内容结构

英文、瑞典语和中文需要保持相同的页面结构，但不能为每种语言复制一套组件。语言路由与共享 Astro 模板解决了这个问题，同时内容文件仍然可以按语言独立维护。

### 内容模型设计

原来较长的项目描述和技术笔记都放在 JSON 结构中。迁移到 Markdown 后，长篇技术内容更容易编写和维护，而 frontmatter 继续承担卡片、排序、状态和侧栏等结构化数据。

### 从 Content Collections 生成静态路由

Project 和 Blog 详情页根据 Content Collection entry 自动生成。文件路径提供稳定的语言标识，因此英文、瑞典语和中文可以使用相同 slug，同时生成不同语言的静态 URL。

### 复用但不过度设计

网站使用 Astro 组件复用 Layout、Navbar、Project Preview 和 Technical Note Preview 等结构，而简单的一次性页面区域仍然直接使用 HTML 和 Tailwind，不做没有必要的抽象。

## 部署

Astro 将网站构建为静态 HTML、CSS 和资源文件，可以直接部署到 Firebase Hosting。

静态架构不再需要普通内容页依赖 SPA fallback routing，也减少了浏览器为了渲染网站必须执行的客户端 JavaScript。

## 技术学习

- 将 React SPA 迁移到 Astro 静态网站架构
- 使用 Astro 和 TypeScript 构建 HTML-first 页面
- 不依赖运行时 i18n 库设计多语言静态路由
- 使用 Astro Content Collections 管理项目 Case Study
- 使用 Markdown 管理技术笔记
- 在首页预览、列表页和详情页之间复用同一个内容数据源
- 根据多语言 Content Collection ID 生成静态路由
- 在 Astro 组件中继续维护 Tailwind CSS 设计系统
- 减少内容型网站对客户端 JavaScript 的依赖
- 为 Firebase Hosting 准备 Astro 静态构建输出

## 后续改进

- 持续补充项目 Case Study 和技术笔记
- Technical Notes 数量增加后加入轻量级筛选或搜索
- 改进项目架构图和技术可视化
- 增加更完整的 SEO metadata 和 structured data
- 持续优化可访问性和性能
