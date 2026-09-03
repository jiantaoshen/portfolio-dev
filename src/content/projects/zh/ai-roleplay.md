---
lang: zh
title: "AI Roleplay"
description: "一个基于 React、ASP.NET Core、FastAPI 和 Ollama 构建的 AI 角色扮演聊天应用，支持多角色、流式回复、多轮上下文、角色 Prompt 构建和对话摘要。"
category: "AI 应用开发"
status: "开发中"
order: 4
featured: false
technologies:
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "ASP.NET Core"
  - "C#"
  - "Python"
  - "FastAPI"
  - "Ollama"
  - "Qwen3"
highlights:
  - "React 与 TypeScript 构建聊天界面"
  - "ASP.NET Core 作为主后端和 AI 请求代理层"
  - "FastAPI 独立负责角色 Prompt、上下文和 AI 逻辑"
  - "通过 Ollama 运行本地 qwen3:4b 模型"
  - "支持端到端 Streaming 流式回复"
  - "支持多角色和动态角色加载"
  - "支持 Stop Generation 和 Regenerate"
  - "通过 Conversation Summary 压缩长对话上下文"
  - "完成 Frontend Component 和 Backend Service Layer 重构"
draft: false
---

## 项目概览

AI Roleplay 是一个用于探索完整 AI 角色聊天产品架构的实验性项目。项目采用 React 前端、ASP.NET Core 主后端、FastAPI AI 服务和 Ollama 本地模型运行环境。当前版本已经完成 AI Roleplay Core MVP，并重点验证角色差异化、流式对话、多轮上下文和长对话摘要等核心能力。

## 要解决的问题

许多 AI 对话 Demo 只是直接向语言模型发送 Prompt 并显示返回文本，缺少真正的软件架构、角色管理、上下文控制和可扩展的服务边界。随着对话变长，也容易出现上下文过大、角色行为不稳定以及前后端职责混乱等问题。

## 解决方案

项目将应用职责拆分为三层。React 负责界面、用户交互和流式渲染；ASP.NET Core 负责产品 API、请求代理和未来的业务逻辑；FastAPI 负责 Character Engine、Prompt Builder、Conversation Context、Summary 和模型调用。Ollama 则作为本地 LLM Runtime。通过这种结构，AI 逻辑与产品业务保持相对独立，同时为未来加入数据库、长期记忆、用户系统和生产部署保留扩展空间。

## 核心功能

### 多角色对话

角色通过结构化 Character Config 管理，React 从后端动态加载角色，并根据 characterId 调用对应角色的 AI Prompt。

### Character Engine

角色配置支持 background、personality、speaking_style、scenario、relationship、response_rules 和 example_dialogues，用于构建具有明显差异化的人格表现。

### Streaming Chat

Ollama 输出经过 FastAPI StreamingResponse 和 ASP.NET Core Streaming Proxy 实时传递到 React，实现逐步生成的聊天体验。

### 多轮上下文

React 保存当前完整聊天历史，并在每次生成时将 Conversation 发送到 AI 服务，使模型能够根据之前的聊天内容继续回复。

### Conversation Summary

当聊天记录超过最近消息窗口后，FastAPI 会将较早消息压缩为 Summary，并结合最近 20 条消息构建新的模型上下文。

### Stop 与 Regenerate

用户可以通过 AbortController 停止当前生成，也可以删除最后一条 AI 回复并重新生成。

## 挑战与决策

### 角色一致性

需要通过 Character Config、Prompt Builder 和 Example Dialogues 调整不同角色的语言风格，同时避免模型机械复制示例或编造不存在的共同记忆。

### 长对话上下文

随着聊天变长，直接发送完整历史会增加上下文成本，因此加入最近消息窗口和 Conversation Summary 来压缩旧信息。

### Streaming 架构

AI 输出需要从 Ollama 经过 FastAPI 和 ASP.NET Core 两层服务继续保持流式传输，最终由 React ReadableStream 实时渲染。

### 职责分离

项目逐步将前端 UI、ASP.NET Core 产品逻辑和 Python AI 逻辑拆分，避免把所有功能集中在单个组件或 Controller 中。

## 部署

项目目前处于本地开发阶段。React、ASP.NET Core 和 FastAPI 可以通过 dev.ps1 一键启动，AI 模型通过本地 Ollama 运行。当前尚未加入 PostgreSQL 和正式生产部署。

## 技术学习

- 构建 React → ASP.NET Core → FastAPI → Ollama 的完整 AI 应用链路
- 实现跨多个服务的 Streaming AI Response
- 设计结构化 Character Prompt 和角色人格差异
- 使用 Conversation Summary 管理长对话上下文
- 使用 AbortController 实现 AI Generation Cancellation
- 将 React 单文件界面拆分为 Components、Services 和 Types
- 将 ASP.NET Core Controller 重构为 Controller → Service 架构
- 从 AI Demo 逐步设计可扩展的完整应用架构

## 后续改进

- 使用 PostgreSQL 持久化 Conversations 和 Messages
- 保存并增量更新 Conversation Summary
- 增加 Conversation History 和聊天切换功能
- 使用 pgvector 构建 Long-term Memory
- 增加用户注册、登录和会话归属
- 增加角色创建、编辑和角色发现功能
- 加入 Usage Tracking、Credits 和 Subscription
- 使用 Docker 和 CI/CD 进行正式生产部署
