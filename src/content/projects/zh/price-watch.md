---
lang: zh
title: "Price Watch"
description: "一个本地优先的商品价格监控应用，使用 React、TypeScript、ASP.NET Core、Python 和 Playwright 构建，用于自动追踪商品价格、价格历史、目标价格状态和抓取运行结果。"
category: "全栈 Web 与自动化开发"
status: "已完成"
order: 2
featured: true
featuredOrder: 2
technologies:
  - "React"
  - "TypeScript"
  - "Vite"
  - "Tailwind CSS"
  - "ASP.NET Core"
  - ".NET 10"
  - "Python"
  - "Playwright"
  - "Pydantic"
  - "Windows Task Scheduler"
highlights:
  - "使用 React 和 TypeScript 构建价格监控 Dashboard"
  - "通过 ASP.NET Core 提供统一的本地 REST API"
  - "使用 Python 和 Playwright 自动加载和分析商品页面"
  - "优先使用 JSON-LD，并提供保守的 DOM fallback 价格提取策略"
  - "支持商品管理、目标价格、价格历史和商品详情"
  - "检测异常价格变化，降低错误价格被接受的风险"
  - "支持邮件价格通知和重复通知控制"
  - "通过 Windows Task Scheduler 实现自动价格检查"
  - "使用本地 JSON 保存运行数据、历史数据和配置"
architecture:
  - label: "应用界面"
    value: "React · TypeScript · Vite"
  - label: "本地 API"
    value: "ASP.NET Core · .NET 10"
  - label: "网页抓取"
    value: "Python · Playwright"
  - label: "价格提取"
    value: "JSON-LD · DOM Fallback"
  - label: "数据存储"
    value: "Local JSON"
  - label: "自动化"
    value: "Windows Task Scheduler · PowerShell"
links:
  github: "https://github.com/jiantaoshen/PriceWatch"
draft: false
---

## 项目概览

Price Watch 是一个本地优先的商品价格监控系统，用于自动检查不同电商网站上的商品价格。应用由 React 和 TypeScript 前端、ASP.NET Core 本地 API、Python Playwright 抓取服务以及本地 JSON 数据层组成。用户可以管理监控商品、设置目标价格、查看当前价格和历史价格，并手动或自动运行价格检查。

## 要解决的问题

不同电商网站的商品页面结构并不统一。价格可能来自 JSON-LD、动态 DOM 或其他页面内容，同时网站还可能修改商品名称、URL slug 或页面结构。仅依赖固定 CSS Selector 或直接读取页面文本容易导致抓取失败或错误价格。完整的价格监控系统还需要处理历史记录、异常价格、自动调度和通知，而不仅仅是执行一次网页抓取。

## 解决方案

项目将前端界面、API、网页抓取和数据处理拆分为独立职责。React 前端通过 ASP.NET Core API 管理商品、运行抓取任务和读取历史数据。Python 使用 Playwright 加载商品页面，并通过可扩展的 scraper 和 strategy 架构提取价格。系统优先读取 Schema.org JSON-LD，在结构化数据不可用时才进入保守的 DOM fallback。抓取结果经过价格验证后写入本地 JSON，同时维护历史数据、运行状态和通知状态。

## 核心功能

### 商品价格监控

自动访问配置中的商品页面，提取当前价格，并与目标价格和历史价格进行比较。

### 多策略价格提取

优先使用 Schema.org JSON-LD，并在结构化数据不可用时使用保守的 DOM fallback，提高不同网站之间的兼容性。

### 商品管理

通过 React 界面和 ASP.NET Core API 新增、修改和删除监控商品，商品 ID 由后端自动生成。

### 价格历史

将抓取结果保存为本地历史数据，并在 Dashboard 和商品详情页面展示价格变化。

### 目标价格

为每个商品设置目标价格，并自动识别当前价格是否已经达到目标。

### 异常价格检测

对异常幅度的价格变化进行 suspicious 标记，减少分期价格、配送费用或其他错误数据被当作真实商品价格的风险。

### 运行状态

记录每次 scraper 运行结果，并在应用中显示健康状态、成功结果、失败结果和异常结果。

### 邮件通知

在满足价格条件时发送邮件通知，并维护通知状态以减少重复提醒。

### 自动化调度

通过 Windows Task Scheduler 定期执行价格检查，同时保留手动 Run Now 功能。

## 挑战与决策

### 不同网站的价格结构

不同电商网站使用不同的 JSON-LD 格式、商品标识和 DOM 结构，因此 scraper 需要在通用性和可靠性之间保持平衡。

### 避免错误价格

商品页面可能同时包含原价、分期价格、配送费用和关联商品价格，因此 DOM fallback 必须保持保守，并结合上下文和可信度进行判断。

### 商品身份匹配

网站可能修改商品名称或 URL slug，因此 JSON-LD 匹配不能只依赖完整 URL，还需要结合 productID、SKU 和 MPN 等稳定标识。

### 本地应用职责分离

项目需要在 React、ASP.NET Core、Python scraper 和本地数据文件之间保持清晰边界，同时让它们作为一个完整应用协同运行。

## 部署

Price Watch 采用本地优先架构。React 应用由 ASP.NET Core 提供，本地 API 负责应用功能和 scraper 调用，Python Playwright scraper 在 Windows 环境运行，运行数据和历史数据保存在本地 JSON 中，并通过 Windows Task Scheduler 实现自动化调度。

## 技术学习

- 使用 React 和 TypeScript 构建数据驱动的 Dashboard
- 使用 ASP.NET Core 设计本地 REST API
- 连接 ASP.NET Core 与 Python 自动化任务
- 使用 Playwright 抓取动态网页内容
- 从 Schema.org JSON-LD 中提取商品价格
- 设计 JSON-LD 与 DOM fallback 的分层抓取策略
- 处理 URL、SKU、MPN 和 productID 等商品身份匹配
- 设计价格验证、异常检测和运行状态机制
- 使用本地 JSON 实现轻量级持久化
- 通过 Windows Task Scheduler 和 PowerShell 构建本地自动化流程
