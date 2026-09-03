---
lang: en
title: "Orchestrating Python Automation with ASP.NET Core"
description: "How I separated application orchestration from browser automation in a local price monitoring system built with ASP.NET Core, Python and Playwright."
date: 2026-09-02
readingTime: "5 min"
tags:
  - ".NET"
  - "Python"
  - "Playwright"
  - "Automation"
draft: false
---

## The Problem

Price monitoring involves more than extracting prices from web pages. It also requires product configuration, scheduled execution, notifications, historical results and execution control.

If all of this logic is placed inside the scraper, the automation logic and application logic become increasingly difficult to maintain as the system grows.

## Options Considered

- **A.** Use C# + Playwright for .NET for the entire system.
- **B.** Use Python + Playwright for the entire system.
- **C.** Use ASP.NET Core for application orchestration and Python + Playwright for browser automation.

## Trade-offs

**A** keeps the technology stack unified and simplifies deployment and maintenance, but application logic and automation logic remain concentrated in the same technology stack.

**B** makes browser automation simple and direct, but as configuration, scheduling, notifications and execution management grow, the application structure requires more careful organization.

**C** keeps a clear boundary between the application layer and the automation layer, but introduces additional complexity around inter-process communication, error handling and runtime environment management.

I ultimately chose **C**, allowing ASP.NET Core to manage the application workflow while Python focuses on browser automation.

## Potential Risks

External websites can change their page structure, price formats or network behavior.

Python processes can also time out, exit unexpectedly or run concurrently, so the system includes data validation, suspicious-price detection, diagnostic logging and concurrency control.

## Success Criteria

- Scheduled jobs can run reliably.
- Invalid data and scraper failures can be detected.
- Repeated executions do not create conflicts.
- When a website changes, modifications can remain mostly isolated to the automation layer without affecting the entire application.
