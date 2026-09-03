---
lang: en
title: "Building an AI Application with React, Python and Ollama"
description: "How I separated the frontend, AI service and local model runtime while keeping clear system boundaries for future expansion."
date: 2026-09-02
readingTime: "6 min"
tags:
  - "React"
  - "Python"
  - "Ollama"
  - "AI"
draft: false
---

## The Problem

The application needs to let the React frontend interact with a language model without placing model calls, prompts and AI-related logic directly in the frontend.

It also needs a model runtime suitable for the development stage, making it easy to quickly test different prompts and interaction behaviors.

## Options Considered

- **A.** Let the React frontend call the model service directly.
- **B.** Use Python as an AI service layer connected to a hosted language model API.
- **C.** Use Python as an AI service layer while running language models locally through Ollama.

## Trade-offs

**A** provides the simplest architecture, but the frontend becomes directly dependent on the model interface. AI logic and UI logic can become tightly coupled, and model-related configuration is more difficult to keep private.

**B** maintains a clear frontend/backend boundary and can provide more stable model services through a hosted provider, but development and testing depend on an external API.

**C** also keeps the frontend and AI logic separated while allowing prompts, models and interaction flows to be tested quickly on a local machine. The trade-off is the need for a local runtime environment and hardware limitations on model performance.

I ultimately chose **C** during development, using React + Python + Ollama to keep model experimentation flexible while preventing the frontend from depending directly on a specific model.

## Potential Risks

Local model performance and response times depend on the machine running them, and different models have different memory and compute requirements.

If the system later moves to a hosted model or another provider, model interfaces and response formats may change, so these details should not spread into the frontend.

## Success Criteria

- The React frontend is responsible only for user interaction and does not depend directly on a specific language model.
- The Python service independently handles prompts, model calls and response transformation.
- During development, Ollama makes it possible to quickly switch between and test local models.
- Switching to another model or hosted service in the future should not require large-scale changes to the frontend.
