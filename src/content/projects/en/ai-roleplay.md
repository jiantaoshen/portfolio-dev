---
lang: en
title: "AI Roleplay"
description: "An AI roleplay chat application built with React, ASP.NET Core, FastAPI, and Ollama, featuring multiple characters, streaming responses, multi-turn context, character prompt construction, and conversation summarization."
category: "AI Application Development"
status: "In Development"
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
  - "Chat interface built with React and TypeScript"
  - "ASP.NET Core used as the main backend and AI proxy layer"
  - "FastAPI handles character prompts, context, and AI logic"
  - "Local qwen3:4b model running through Ollama"
  - "End-to-end streaming responses"
  - "Multiple characters with dynamic character loading"
  - "Stop Generation and Regenerate support"
  - "Conversation Summary for compressing long chat history"
  - "Frontend component refactor and backend service-layer refactor"
draft: false
---

## Overview

AI Roleplay is an experimental project focused on exploring the architecture of a complete AI character chat application. It uses a React frontend, ASP.NET Core as the main backend, FastAPI as a dedicated AI service, and Ollama as the local model runtime. The current version has completed the core AI roleplay MVP and focuses on character differentiation, streaming conversations, multi-turn context, and long-conversation summarization.

## The Problem

Many AI chat demos simply send a prompt to a language model and display the returned text. They often lack a real application architecture, structured character management, context handling, and clear service boundaries. As conversations grow, they can also suffer from oversized context windows, inconsistent character behavior, and unclear separation of frontend, backend, and AI responsibilities.

## Solution

The project separates responsibilities into three application layers. React handles the user interface, interaction, and streaming rendering. ASP.NET Core provides the main product API and acts as the bridge between the frontend and AI service. FastAPI handles the Character Engine, Prompt Builder, conversation context, summarization, and model integration. Ollama provides the local LLM runtime. This architecture keeps AI logic separated from product logic while leaving room for future persistence, long-term memory, authentication, and production deployment.

## Features

### Multi-Character Chat

Characters are managed through structured character configuration. React loads available characters dynamically and routes chat requests using a characterId.

### Character Engine

Character configuration supports background, personality, speaking style, scenario, relationship, response rules, and example dialogues to create clearly differentiated personalities.

### Streaming Chat

Ollama output is streamed through FastAPI StreamingResponse and the ASP.NET Core streaming proxy before being rendered in real time through React ReadableStream.

### Multi-Turn Context

React keeps the current conversation history and sends it with each generation request so the model can continue the conversation using previous messages.

### Conversation Summary

When the conversation exceeds the recent-message window, FastAPI summarizes older messages and combines the summary with the latest 20 messages for context construction.

### Stop and Regenerate

Users can stop an active generation with AbortController or regenerate the latest AI response while preserving the current conversation context.

## Challenges & Decisions

### Character Consistency

Character configuration, prompt construction, and example dialogues must create distinct personalities without causing the model to mechanically repeat examples or invent shared memories.

### Long Conversation Context

Sending the entire conversation history becomes inefficient as chats grow, so the project uses a recent-message window together with Conversation Summary.

### Streaming Architecture

AI output must remain streamed across Ollama, FastAPI, ASP.NET Core, and React without being buffered into a complete response at an intermediate layer.

### Separation of Responsibilities

The project gradually separates frontend UI logic, ASP.NET Core product logic, and Python AI logic to avoid concentrating too much responsibility in individual components or controllers.

## Deployment

The project is currently developed and run locally. React, ASP.NET Core, and FastAPI can be started together using dev.ps1, while the AI model runs locally through Ollama. PostgreSQL and production deployment have not yet been added.

## Learnings

- Building a complete React → ASP.NET Core → FastAPI → Ollama AI application pipeline
- Implementing streaming AI responses across multiple services
- Designing structured character prompts and differentiated character personalities
- Managing long conversations with Conversation Summary
- Using AbortController for AI generation cancellation
- Refactoring a React application into components, services, and shared types
- Refactoring ASP.NET Core controllers into a Controller → Service architecture
- Designing an AI integration as part of a complete software application rather than a standalone model demo

## Future Improvements

- Persist Conversations and Messages with PostgreSQL
- Persist and incrementally update Conversation Summary
- Add conversation history and conversation switching
- Build long-term memory with pgvector
- Add user registration, authentication, and conversation ownership
- Add character creation, editing, and discovery features
- Add usage tracking, credits, and subscription features
- Introduce Docker and CI/CD for production deployment
