---
lang: zh
title: "LightManager"
description: "一个使用 React、TypeScript、ASP.NET Core 和 PostgreSQL 构建的个人任务管理应用，支持 JWT 身份验证、用户专属任务数据、基于日历的任务规划以及前后端独立云部署。"
status: "Live"
order: 1
featured: true
featuredOrder: 1
technologies:
  - "C#"
  - ".NET"
  - "ASP.NET Core"
  - "Entity Framework Core"
  - "PostgreSQL"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "shadcn/ui"
  - "Microsoft Azure"
  - "Vercel"
  - "Neon"
highlights:
  - "根据实际使用体验，将团队项目管理系统重新设计为个人任务管理工具"
  - "基于 ASP.NET Core Web API，实现 JWT 身份验证和用户专属任务授权"
  - "将后端模型从项目、成员和任务分配关系简化为用户直接拥有任务"
  - "提供 Today、Inbox、Calendar 和 All Tasks 工作流，并支持响应式桌面与移动端布局"
  - "通过 Entity Framework Core 和 Neon 实现 PostgreSQL 持久化"
  - "前端通过 Vercel 和自定义域名部署，后端独立部署在 Azure App Service"
links:
  github: "https://github.com/jiantaoshen/LightManager"
  live: "https://lightmanager.jiantao.dev"
draft: false
---

## 更新信息

LightManager 已经完成了一次较大的重新设计。

最初版本是一个面向中小型团队的轻量级项目管理应用，包含项目、成员、基于角色的权限、任务分配以及拖拽式 Kanban 看板。

随着开发和实际使用的推进，我发现原本的产品方向并不符合我自己的真实使用方式。由于我本身并不是最初设计中的目标用户，很难根据真实的日常体验持续改进这个应用。

因此，我决定不再继续为假设中的团队工作流添加功能，而是将 LightManager 重新设计成一个**个人任务管理应用**。这样我可以自己持续使用、测试，并根据实际体验不断改进。

当前版本主要围绕以下工作流：

- Today
- Inbox
- Calendar
- All Tasks
- 任务优先级
- 截止日期
- 任务完成状态
- 响应式桌面端和移动端布局

目前应用仍然以 Web 版本为主，但后端架构已经特意设计成可以让未来的 React Native 客户端复用同一套 ASP.NET Core API。

## 项目概览

LightManager 现在是一个个人任务管理应用，重点围绕简单的日常任务工作流，而不是团队项目管理。

已登录用户可以创建、安排、完成和管理自己的任务。没有截止日期的任务会保留在 Inbox 中，已安排日期的任务可以通过 Today 和 Calendar 查看，所有任务都会持久化存储在 PostgreSQL 中。

前端使用 React、TypeScript、Tailwind CSS 和 shadcn/ui 构建，后端则使用 ASP.NET Core、Entity Framework Core 和 ASP.NET Identity。

## 为什么改变产品方向

最初的 LightManager 包含：

- Projects
- Project members
- Role-based permissions
- Task assignment
- Kanban workflows

这些功能在技术层面都可以正常工作，但我发现自己实际上没有太多理由去使用这个应用。

这带来了一个很重要的产品问题：我可以不断实现新功能，但却很难判断这些功能在真实日常使用中是否真正有价值。

因此，我将项目从：

```text
Team Project Management
```

转变为：

```text
Personal Task Management
```

新的方向让我能够拥有一个真实的使用场景。相比于只为了展示而设计功能，我现在可以真正使用这个应用，并根据使用过程中的摩擦和习惯来持续改进它。

## 架构重构

后端的数据模型被大幅简化。

原本的结构是：

```text
User
 └── Project
      ├── Members
      ├── Roles
      └── Tasks
           └── Assignees
```

现在的结构是：

```text
User
 ├── Task
 ├── Task
 └── Task
```

项目、项目成员、任务分配以及项目级角色等概念都从核心数据模型中移除了。

现在任务直接归属于已登录用户。

这样不仅让系统更容易维护，也更符合个人使用场景，同时为未来的移动端客户端提供了更干净的 API 结构。

## 后端

后端使用 ASP.NET Core Web API 构建。

任务 API 从原来的项目作用域：

```text
/api/projects/{projectId}/tasks
```

简化为：

```text
/api/tasks
```

所有任务相关的 endpoint 都需要身份验证。

后端会从 JWT token 中获取当前登录用户的身份，并使用该用户 ID 限制数据库查询，确保用户只能读取或修改属于自己的任务。

当前 Task 模型包含：

- Title
- Description
- Status
- Priority
- Due date
- Created timestamp
- Updated timestamp
- Completed timestamp
- User ownership

任务状态和优先级使用 enum 表示，并以可读字符串形式存储在 PostgreSQL 中。

## 身份验证与授权

身份验证使用 ASP.NET Identity 和 JWT 实现。

认证流程：

```text
User Login
    ↓
ASP.NET Identity Validation
    ↓
PostgreSQL
    ↓
JWT Generated
    ↓
Token Stored by Client
    ↓
Authenticated API Requests
    ↓
User-Specific Task Data
```

用户模型也进行了改进。

最初实现中，用户的完整姓名被直接作为 ASP.NET Identity 的用户名。

现在则将登录身份和显示名称分开：

```text
UserName = Email
DisplayName = FullName
```

这样可以避免多个用户使用相同姓名时产生用户名冲突。

现在的授权逻辑主要围绕**用户数据隔离**，而不是团队角色。所有任务查询、更新和删除操作都会确认该任务是否属于当前已登录用户。

## 功能

### Today

显示当前日期的任务，并区分未完成和已完成任务。

### Inbox

存放尚未指定截止日期的任务。

这样用户可以先快速记录事项，再决定什么时候完成。

### Calendar

通过日历视图按日期查看和规划任务。

### All Tasks

显示当前用户的完整任务列表，并支持搜索和筛选。

### 任务管理

用户可以：

- 创建任务
- 编辑任务
- 完成任务
- 重新打开已完成任务
- 删除任务
- 设置优先级
- 设置截止日期

### 身份验证

用户可以通过 ASP.NET Identity 和 JWT 进行注册和登录。

### 用户专属数据

每个已登录用户只能访问自己的任务。

### 响应式设计

界面已经针对移动端使用进行了重新设计。

桌面端使用侧边栏导航，小屏设备则使用更简化的移动端布局。

## 前端重构

原来的界面围绕以下结构组织：

```text
Dashboard
Projects
Kanban
Members
```

新的导航结构变为：

```text
Today
Inbox
Calendar
All Tasks
Profile
```

前端目前使用：

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

UI 被重新拆分为可复用组件，并使用了更清晰的 application shell。

这次重构也为未来的移动端版本做了准备，因为大部分业务逻辑现在都由 API 负责，而不是紧密耦合在 Web 界面中。

## 数据库

PostgreSQL 用于持久化应用数据，并托管在 Neon。

Entity Framework Core 负责数据库访问和 migration。

当前 `Tasks` 表包含：

```text
Id
Title
Description
Status
Priority
DueDate
CreatedAt
UpdatedAt
CompletedAt
UserId
```

同时增加了以下索引：

```text
(UserId, DueDate)
(UserId, Status)
```

这些索引主要支持 Today、Calendar 和 Inbox 中常见的查询场景。

## 挑战与决策

### 放弃原来的领域模型

最大的架构决策之一，是移除原来的 project/member/role 模型。

相比为了展示更多功能而保留实际上不会使用的复杂结构，我选择围绕真实产品需求简化数据模型。

### 用户数据隔离

从项目级授权改成个人任务后，任务所有权成为主要的授权边界。

所有受保护的任务 endpoint 在读取或修改数据之前，都会验证当前用户身份。

### 先完成 Web，再开发 Mobile

我曾考虑直接切换到 React Native，但最终决定先把 Web 应用做完整。

目前优先稳定：

- 产品工作流
- API 设计
- 身份验证
- 数据库结构
- 任务行为

等这些部分稳定后，再增加 React Native 客户端，就不需要同时重新设计后端。

### 前后端独立部署

前端和后端现在完全独立部署。

这样不仅提高了客户端和 API 之间的分离，也让后端可以被未来其他客户端复用。

## 部署

当前生产环境架构：

```text
React + TypeScript
        ↓
      Vercel
        ↓
https://lightmanager.jiantao.dev

        ↓ HTTPS

ASP.NET Core Web API
        ↓
Microsoft Azure App Service
        ↓
PostgreSQL / Neon
```

### 前端

React 前端部署在 Vercel。

生产地址：

**https://lightmanager.jiantao.dev**

### 后端

ASP.NET Core Web API 部署在 Microsoft Azure App Service。

### 数据库

PostgreSQL 托管在 Neon。

JWT 密钥、前端来源和数据库连接字符串等生产配置均通过环境变量提供，不会提交到源代码仓库。

## 旧 Azure Static Web Apps 部署

较早版本的 LightManager 前端曾部署在 Azure Static Web Apps：

```text
https://thankful-beach-0211add0f.7.azurestaticapps.net
```

在前端迁移到 Vercel，并切换到新的自定义域名：

```text
https://lightmanager.jiantao.dev
```

之后，我原本希望对旧 Azure Static Web App 做最后一次更新，让旧网址能够自动跳转到新的正式域名。

为此尝试了多种方法。

### Azure Static Web Apps CLI

我创建了一个只包含 `index.html` 和 `staticwebapp.config.json` 的最小跳转站点，并通过 SWA CLI 尝试部署。

Azure 返回了类似以下错误：

```text
No matching static site found.
```

### 重置 Deployment Token

我在 Azure Portal 中重置了 deployment token，并再次通过 SWA CLI 测试。

部署依然失败。

### GitHub Actions

随后我创建了使用以下 Action 的 GitHub Actions workflow：

```text
Azure/static-web-apps-deploy@v1
```

GitHub secret 能够正确读取，生成的 redirect 目录也能够被 deployment action 正确识别。

但 Azure 仍然拒绝部署：

```text
No matching Static Web App was found or the api key was invalid.
```

### Azure Portal 配置

我尝试检查并修改旧 Static Web App 的 deployment configuration，但相关配置在 Azure Portal 中处于只读状态，无法修改。

### Azure CLI 和 Cloud Shell

我还测试了 Azure CLI 和 Azure Cloud Shell。

其中一个尝试是断开旧的 source-control integration，再重新将 Static Web App 连接到当前 GitHub repository。

但 disconnect 操作同样失败。

### 最终决定

在尝试了以下方法之后：

- SWA CLI
- Deployment token reset
- GitHub Actions
- Azure Portal configuration
- Azure CLI
- Azure Cloud Shell
- Source-control disconnect / reconnect

我最终决定不再继续投入开发时间修复这个旧的 Azure Static Web Apps deployment。

这个旧资源现在被视为一个**历史遗留并已放弃的部署**。

它已经不再属于当前 LightManager 的正式架构。

所有文档和后续开发都统一使用：

**https://lightmanager.jiantao.dev**

这也是一次重要的工程决策：旧部署端点已经没有足够的维护价值，而应用本身已经迁移到新的架构和正式域名，因此继续投入时间修复它并不值得。

## 项目演进

### Version 1 — 团队项目管理

最初版本包含：

- Projects
- Members
- Role-based permissions
- Task assignment
- Kanban board
- Drag-and-drop task workflows

### Version 2 — 个人任务管理

当前版本围绕以下工作流：

```text
Inbox
  ↓
Today / Scheduled Tasks
  ↓
Calendar
  ↓
Completed Tasks
```

因此，这个项目已经从一个偏展示性质的团队管理系统，逐渐演变成一个我自己能够真实使用，并根据实际体验持续改进的个人应用。

## 未来改进

- 更完善的任务编辑
- 重复任务
- Notes
- 搜索和筛选
- 通知与提醒
- 更好的移动端交互
- React Native Android 客户端
- 移动端持久登录
- 本地 SQLite 存储
- Offline support
- Web 与 Mobile 之间的数据同步

## 当前目标

LightManager 并不是为了与大型项目管理或任务管理平台竞争。

这个项目的目标是构建一个我自己真正会使用的轻量级应用，同时继续积累以下方面的实际经验：

- Full-stack 应用架构
- React 和 TypeScript
- ASP.NET Core
- REST API 设计
- 身份验证和授权
- PostgreSQL 和 Entity Framework Core
- 云端部署
- 响应式设计
- Mobile-first 产品设计
- 跨平台应用开发