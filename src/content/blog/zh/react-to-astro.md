---
lang: zh
title: "将我的 Portfolio 从 React 迁移到 Astro"
description: "为什么我把一个以内容为主的开发者 Portfolio 从客户端 React SPA 迁移到使用静态路由、Markdown 和 Content Collections 的 HTML-first Astro 架构。"
date: 2026-09-02
readingTime: "8 分钟"
tags:
  - "Astro"
  - "React"
  - "TypeScript"
  - "Architecture"
  - "Static Site"
draft: false
---

## 要解决的问题

我的 Portfolio 最初使用 React、React Router 和 react-i18next。

从技术上来说，这套架构能够正常工作。但随着网站内容增加，我逐渐发现，大多数页面本质上都是内容驱动的：

- 项目 Case Study
- 技术笔记
- Portfolio 信息
- 多语言内容
- 多语言 CV 下载

这些内容几乎不需要客户端应用状态。

一个项目 Case Study 并不需要 React 才能保持可用。技术笔记也不应该仅仅为了显示文字就依赖 JavaScript。网站的大部分导航，本质上也只是普通页面链接。

这带来了一个很直接的架构问题：

**为什么要让客户端应用负责渲染本来就可以直接以 HTML 存在的内容？**

## 可选方案

我主要考虑了三种方案。

### A. 保留现有 React SPA

最简单的方案是继续使用 React Router 和 react-i18next，并在现有架构上继续增加内容。

这种方式迁移成本最低，但也意味着那些并不需要客户端渲染的页面仍然要通过 React Runtime 显示。

### B. 保留 React，但引入静态生成

另一种方案是保留 React 组件模型，同时迁移到支持预渲染的框架。

这样可以减少运行时渲染，但即使网站大部分页面本质上只是文档，React 仍然会处于架构中心。

### C. 迁移到 Astro

Astro 更符合这个网站实际的内容形态。

它仍然允许使用组件化开发方式编写页面，同时可以在构建阶段生成静态 HTML。

客户端 JavaScript 只需要在真正需要交互的功能中加入。

最终我选择了 **C**。

## 新架构

当前网站使用 Astro、TypeScript、Tailwind CSS、Markdown 和 Astro Content Collections。

```text
Markdown / 翻译数据
          ↓
        Astro
          ↓
      Build Process
          ↓
      Static HTML
          ↓
        Browser
```

项目页面和技术笔记都在构建阶段提前生成。

浏览器直接收到主要内容对应的 HTML 和 CSS，而不是等待 JavaScript 应用在客户端构建页面。

## 从运行时 i18n 迁移到静态语言路由

旧版本使用 react-i18next 在运行时切换语言。

新版本改用明确的语言路由：

```text
/en/
/sv/
/zh/
```

Project 页面也是同样的结构：

```text
/en/projects/price-watch/
/sv/projects/price-watch/
/zh/projects/price-watch/
```

Technical Notes 同样如此：

```text
/en/blog/react-to-astro/
/sv/blog/react-to-astro/
/zh/blog/react-to-astro/
```

这些页面由 Astro 在构建阶段生成。

共享 UI 文案仍然来自按语言拆分的翻译文件，但主要内容不再依赖运行时 i18n 库进行渲染。

URL 本身也可以直接表达当前语言。

## 将长内容从 JSON 迁移到 Markdown

旧网站把 Project 文档和 Technical Notes 内容放在 JSON 结构中。

这种方式非常适合结构化 metadata，但当技术内容越来越长时，维护体验会变差。

例如一个项目原本可能包含：

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

新架构把结构化 metadata 与长篇内容分开。

Metadata 保留在 Markdown frontmatter 中：

```yaml
title: "Price Watch"
status: "Done"
technologies:
  - ASP.NET Core
  - Python
  - Playwright
```

而项目正文则直接写成普通 Markdown：

```md
## 要解决的问题

...

## 解决方案

...

## 挑战与决策

...
```

这样 Project Case Study 会更容易编写和维护。

## Content Collections

Technical Notes 和 Projects 现在都使用 Astro Content Collections。

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

三个语言可以使用相同 slug：

```text
projects/en/price-watch.md
projects/sv/price-watch.md
projects/zh/price-watch.md
```

同一个 Content Collection entry 还可以同时提供给网站多个区域。

例如 Project：

```text
Project Markdown
       │
       ├── Homepage Featured Projects
       ├── Projects List
       └── Project Detail Page
```

Technical Notes 也是一样：

```text
Technical Note Markdown
          │
          ├── Homepage Latest Notes
          ├── Blog List
          └── Article Detail Page
```

这样可以消除重复的数据来源。

## 替换 React Router

旧版本由 React Router 负责客户端导航。

Astro 现在直接生成普通静态路由。

```html
<a href="/en/projects/price-watch/">
```

像下面这样的 Astro 动态路由：

```text
[lang]/projects/[...slug].astro
```

会在 build 阶段根据 Content Collection 中已有的 entries 生成对应静态页面。

## 保留 Tailwind CSS

这次迁移并不需要更换原有视觉设计系统。

Tailwind CSS 仍然负责：

- typography
- spacing
- responsive layout
- cards
- navigation
- buttons
- reusable design primitives

关键区别在于 Tailwind 最终生成的是 CSS。浏览器并不需要 React 才能使用这些样式。

## JavaScript 仍然可以使用

迁移到 Astro 并不代表完全拒绝 JavaScript。

目标只是让 JavaScript 出现在真正需要它的地方。

未来的客户端搜索、交互式筛选、复杂可视化或需要状态管理的 UI 工具仍然可以使用 JavaScript。

但显示项目描述或技术文章本身并不需要 JavaScript。

甚至当前移动端导航也可以通过 `<details>` 这样的原生 HTML 元素实现，而不需要 JavaScript state hook。

## 方案权衡

这次迁移增加了一些构建阶段的结构要求。

Content schema 需要保持一致，静态路由需要正确生成，多语言 Markdown 文件也需要保持相同 slug。

迁移本身还涉及把：

```text
React components
React Router
react-i18next
JSON article data
JSON project documentation
```

替换为：

```text
Astro components
static routes
build-time translations
Markdown
Content Collections
```

不过，这些成本主要存在于开发阶段，最终的浏览器运行架构反而更简单。

## 结果

现在的 Portfolio 更接近它真正的产品形态。

它本质上主要是一组技术文档和项目资料，因此这些文档直接被构建成 HTML。

开发流程仍然保留可复用组件、TypeScript、Tailwind CSS、结构化 Content Schema、多语言内容和可复用 Layout。

但浏览器最终主要收到 HTML 和 CSS。

```text
Content
   ↓
Astro Build
   ↓
Static HTML + CSS
   ↓
Browser
```

而不是：

```text
Content
   ↓
JavaScript Bundle
   ↓
React Runtime
   ↓
Browser Rendering
```

对于这个类型的网站来说，前者更加合适。

## 技术学习

这次迁移最大的收获并不是“React 不适合做网站”。

当浏览器需要管理大量应用状态和交互时，React 依然非常有价值。

更重要的经验是：**框架应该匹配产品真正的行为。**

我的 Portfolio 包含大量技术文档，但客户端应用状态很少。

当我从这个角度重新看待网站时，HTML-first 架构就成为了更简单、更自然的选择。
