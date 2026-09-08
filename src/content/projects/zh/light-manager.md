---
lang: zh
title: "LightManager"
description: "一个以后端 ASP.NET Core Web API 为核心的项目管理应用，包含身份认证、基于角色的权限控制、项目与任务工作流、PostgreSQL 持久化数据以及 Azure 部署。"
status: "已上线"
order: 1
featured: true
featuredOrder: 1
technologies:
  - "C#"
  - "ASP.NET Core"
  - "Entity Framework Core"
  - "PostgreSQL"
  - "React"
  - "TypeScript"
  - "Azure"
highlights:
  - "使用 ASP.NET Core Web API 构建结构清晰的后端应用逻辑"
  - "使用 ASP.NET Identity 与 JWT 实现身份认证"
  - "基于角色的授权与项目权限控制"
  - "项目成员关系与任务分配工作流"
  - "通过 Entity Framework Core、PostgreSQL 和 Neon 实现数据持久化"
  - "前端与后端分别部署到 Microsoft Azure"
links:
  github: "https://github.com/jiantaoshen/LightManager"
  live: "https://thankful-beach-0211add0f.7.azurestaticapps.net"
draft: false
---

## 更新信息

经过两个月的上线运行和开发，我发现这个项目存在不少问题。未来，我计划重新开发一个更加现代化的 TODO 应用。这个项目将作为备份保留。当新的应用能够稳定运行后，我会用新应用替代当前项目。

1. **应用缺少响应式设计**
   目前的界面设计只适用于电脑端，因此无法很好地在手机上使用。

2. **缺少公开发布功能**
   我正在考虑添加一个按钮，可以将计划设置为公开状态，这样其他人也能够查看我的计划。

3. **目前使用 Azure App Service**
   我计划将部署方式从 Azure App Service 更换为 Azure Container。

4. **增加更多功能**
   我希望未来加入更多功能，例如笔记功能。


## 项目概览

LightManager 是一个开源项目管理应用，面向希望以简单方式组织项目和任务的中小型团队。它避免企业级项目管理工具中大量复杂功能，重点提供清晰、实用的核心工作流。应用以后端 ASP.NET Core 为核心，并实现了身份认证、授权、基于角色的权限、项目成员管理、任务分配以及 Kanban 工作流。

## 要解决的问题

一个真正的项目管理应用并不只是简单的 CRUD。用户、项目、项目成员、角色和任务之间存在相互关联，同时后端必须确保用户只能执行自己有权限进行的操作。这个项目的目标是在保持产品简单易用的同时，正确处理这些相互关联的业务流程。

## 解决方案

应用将职责划分为 React 前端和 ASP.NET Core Web API。ASP.NET Identity 负责用户身份管理，JWT 用于认证受保护的 API 请求，Entity Framework Core 负责关系型数据访问，PostgreSQL 用于持久化应用数据。重要的业务规则和权限控制都由后端执行，而不是依赖前端界面。

## 核心功能

### 身份认证

用户通过 ASP.NET Identity 登录，受保护的 API 请求使用 JWT 进行认证。

### 权限控制

后端 API 会独立验证用户权限，而不是依赖前端是否显示某个按钮或页面。

### 基于角色的权限

项目操作会根据用户在项目中的角色和成员关系决定是否允许执行。

### 项目管理

用户可以创建、编辑、归档和删除项目。

### 任务管理

用户可以创建、编辑和删除任务，并将任务分配给对应项目中的成员。

### Kanban 工作流

任务可以通过拖放式 Kanban 看板在不同状态之间移动。

## 挑战与决策

### 后端权限验证

权限必须真正由 API 强制执行，而不能只依赖前端隐藏按钮、页面或操作入口。

### 关系型应用数据

用户、项目、成员关系、角色、任务和任务分配之间需要清晰的数据关系和稳定的业务行为。

### 前后端独立部署

React 应用和 ASP.NET Core API 分别部署，因此需要正确处理认证、环境配置以及生产环境中的前后端通信。

## 部署

React 前端部署在 Azure Static Web Apps，ASP.NET Core API 运行在 Azure App Service，PostgreSQL 数据库由 Neon 托管。项目此前使用 Vercel 和 Render，并于 2026 年 8 月迁移到 Microsoft Azure。目前使用免费层服务，因此后端长时间未活动后可能出现冷启动。

## 后续改进

- 根据项目描述使用 AI 自动生成建议任务
- 为 Kanban 看板增加任务搜索与筛选功能
