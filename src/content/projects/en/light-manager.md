---
lang: en
title: "LightManager"
description: "A project management application built around an ASP.NET Core Web API, with authentication, role-based authorization, project and task workflows, persistent PostgreSQL data and Azure deployment."
category: "Full-stack Development"
status: "Live"
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
  - "Microsoft Azure"
highlights:
  - "ASP.NET Core Web API with structured backend application logic"
  - "Authentication with ASP.NET Identity and JWT"
  - "Role-based project permissions and authorization"
  - "Project membership and task assignment workflows"
  - "PostgreSQL persistence through Entity Framework Core and Neon"
  - "Frontend and backend deployed separately on Microsoft Azure"
links:
  github: "https://github.com/jiantaoshen/LightManager"
  live: "https://thankful-beach-0211add0f.7.azurestaticapps.net"
draft: false
---

## Overview

LightManager is an open-source project management application designed for small and medium-sized teams that need a straightforward way to organize projects and tasks without the complexity of enterprise project management software. The application is built around an ASP.NET Core backend and includes authentication, authorization, role-based permissions, project membership, task assignment and a Kanban workflow.

## The Problem

A useful project management application requires more than CRUD operations. Users, projects, memberships, roles and tasks need to work together while the backend ensures that users can only perform operations they are authorized to perform. The goal was to build these connected workflows while keeping the product simple and easy to use.

## Solution

The application separates responsibilities between a React frontend and an ASP.NET Core Web API. ASP.NET Identity manages user identity, JWT tokens authenticate protected requests, Entity Framework Core manages relational data access and PostgreSQL stores persistent application data. Important business and authorization rules are enforced by the backend rather than depending on the frontend.

## Features

### Authentication

Users authenticate through ASP.NET Identity and protected API requests use JWT tokens.

### Authorization

Backend endpoints enforce application permissions independently of what is displayed in the frontend.

### Role-Based Permissions

Project operations depend on the user's role and relationship to the project.

### Project Management

Users can create, edit, archive and delete projects.

### Task Management

Tasks can be created, edited, deleted and assigned to members of the project.

### Kanban Workflow

Tasks can be moved between states using a drag-and-drop Kanban board.

## Challenges & Decisions

### Backend Authorization

Permissions must be enforced by the API rather than relying on buttons or routes being hidden in the frontend.

### Relational Application Data

Users, projects, memberships, roles, tasks and assignments need clear relationships and predictable behaviour.

### Separate Frontend and Backend

The React application and ASP.NET Core API are independent deployments and need correct authentication, configuration and production communication.

## Deployment

The React frontend is deployed with Azure Static Web Apps, the ASP.NET Core API runs on Azure App Service and PostgreSQL is hosted with Neon. The project previously used Vercel and Render before moving to Microsoft Azure in August 2026. Because the application currently uses free-tier services, the backend can experience a cold start after a period of inactivity.

## Learnings

- ASP.NET Core Web API design
- Authentication with ASP.NET Identity
- JWT-based API authentication
- Backend authorization and role-based permissions
- Relational application modelling
- Entity Framework Core and PostgreSQL
- Connecting a React frontend to a separate backend API
- Production configuration and Azure deployment

## Future Improvements

- Use AI to generate suggested tasks from a project description
- Add task search and filtering to the Kanban board
