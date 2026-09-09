---
lang: en
title: "LightManager"
description: "A personal task management application built with React, TypeScript, ASP.NET Core and PostgreSQL, featuring JWT authentication, user-specific task data, calendar-based planning and independent cloud deployment."
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
  - "Redesigned from a team project management system into a personal task manager based on real usage"
  - "ASP.NET Core Web API with JWT authentication and user-specific task authorization"
  - "Simplified backend model from projects, memberships and assignments to direct user-owned tasks"
  - "Today, Inbox, Calendar and All Tasks workflows with responsive desktop and mobile layouts"
  - "PostgreSQL persistence through Entity Framework Core and Neon"
  - "Frontend deployed on Vercel with a custom domain and backend deployed independently on Azure App Service"
links:
  github: "https://github.com/jiantaoshen/LightManager"
  live: "https://lightmanager.jiantao.dev"
draft: false
---

## Update Information

LightManager has gone through a major redesign.

The original version was built as a lightweight project management application for small and medium-sized teams. It included projects, memberships, role-based permissions, task assignment and a drag-and-drop Kanban board.

After continuing to develop and use the application, I realized that the original product direction did not match how I would personally use it. Because I was not part of the target user group, it was difficult to improve the application based on real day-to-day experience.

Instead of continuing to add features for hypothetical team workflows, I decided to redesign LightManager as a **personal task management application** that I can use myself, evaluate continuously and improve based on actual usage.

The current version focuses on a simpler workflow built around:

- Today
- Inbox
- Calendar
- All Tasks
- Task priorities
- Due dates
- Task completion
- Responsive desktop and mobile layouts

The application is currently web-based, but the backend is intentionally structured so that a future React Native client can reuse the same ASP.NET Core API.

## Overview

LightManager is now a personal task management application designed around a simple daily workflow rather than team-based project administration.

The application allows authenticated users to create, schedule, complete and manage their own tasks. Unscheduled tasks remain in an Inbox, scheduled tasks can be reviewed through Today and Calendar views, and all task data is stored persistently in PostgreSQL.

The frontend is built with React, TypeScript, Tailwind CSS and shadcn/ui, while the backend is built with ASP.NET Core, Entity Framework Core and ASP.NET Identity.

## Why I Changed the Product Direction

The original LightManager included:

- Projects
- Project members
- Role-based permissions
- Task assignment
- Kanban workflows

These features worked technically, but I found that I had little reason to use the application myself.

This created an important product problem: I could implement features, but I could not evaluate whether those features were actually useful in everyday use.

I therefore changed the project from:

```text
Team Project Management
```

to:

```text
Personal Task Management
```

The new direction gives me a real user workflow to test against. Instead of designing features only for demonstration purposes, I can now use the application myself and improve it based on actual friction and usage patterns.

## Architecture Redesign

The backend model was simplified significantly.

The original structure was based on:

```text
User
 └── Project
      ├── Members
      ├── Roles
      └── Tasks
           └── Assignees
```

The current structure is:

```text
User
 ├── Task
 ├── Task
 └── Task
```

Projects, project memberships, task assignments and project-level roles were removed from the core data model.

Tasks are now directly owned by authenticated users.

This makes the system easier to maintain and better suited for personal use, while also creating a cleaner API for a future mobile client.

## Backend

The backend is built as an ASP.NET Core Web API.

The task API was simplified from project-scoped endpoints such as:

```text
/api/projects/{projectId}/tasks
```

to:

```text
/api/tasks
```

All task endpoints require authentication.

The authenticated user's identity is extracted from the JWT token and used to restrict database queries so that users can only read or modify their own tasks.

The task model now contains:

- Title
- Description
- Status
- Priority
- Due date
- Created timestamp
- Updated timestamp
- Completed timestamp
- User ownership

Task status and priority are represented with enums and stored as readable strings in PostgreSQL.

## Authentication & Authorization

Authentication is implemented with ASP.NET Identity and JWT.

The authentication flow is:

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

The user model was also improved.

The original implementation used the user's full name as the ASP.NET Identity username.

The current implementation separates login identity and display name:

```text
UserName = Email
DisplayName = FullName
```

This avoids conflicts when multiple users have the same name.

Authorization is now focused on **user data isolation** rather than team roles. Every task query, update and delete operation verifies that the task belongs to the authenticated user.

## Features

### Today

Displays tasks scheduled for the current day and separates open and completed tasks.

### Inbox

Stores tasks that have not yet been assigned a due date.

This provides a quick place to capture something before deciding when it should be completed.

### Calendar

Tasks can be viewed by date through a calendar-based workflow.

### All Tasks

Displays the user's complete task list with support for searching and filtering.

### Task Management

Users can:

- Create tasks
- Edit tasks
- Complete tasks
- Reopen completed tasks
- Delete tasks
- Set priorities
- Set due dates

### Authentication

Users can register and log in using ASP.NET Identity and JWT authentication.

### User-Specific Data

Each authenticated user can only access their own tasks.

### Responsive Design

The interface was redesigned with mobile use in mind.

Desktop navigation uses a sidebar, while smaller screens use a simplified mobile layout.

## Frontend Redesign

The original interface was organized around:

```text
Dashboard
Projects
Kanban
Members
```

The new navigation is:

```text
Today
Inbox
Calendar
All Tasks
Profile
```

The frontend now uses:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

The UI was reorganized into reusable components and a cleaner application shell.

The redesign also prepares the project for a future mobile version by keeping most business logic behind the API instead of coupling it tightly to the web interface.

## Database

PostgreSQL is used for persistent application data and is hosted with Neon.

Entity Framework Core handles database access and migrations.

The current `Tasks` table includes:

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

Indexes were added for:

```text
(UserId, DueDate)
(UserId, Status)
```

These support common queries used by Today, Calendar and Inbox views.

## Challenges & Decisions

### Moving Away from the Original Domain Model

The largest architectural decision was removing the original project/member/role model.

Instead of keeping unused complexity for the sake of demonstrating more features, I chose to simplify the data model around the actual product requirements.

### User Data Isolation

After moving away from project-based authorization, task ownership became the main authorization boundary.

All protected task endpoints now verify the authenticated user's identity before reading or modifying data.

### Web First, Mobile Later

I considered moving directly to React Native, but decided to finish the web application first.

The current goal is to stabilize:

- Product workflow
- API design
- Authentication
- Database structure
- Task behaviour

Once these are stable, a React Native client can be added without redesigning the backend at the same time.

### Independent Frontend and Backend Deployment

The frontend and backend are deployed independently.

This improves separation between the client and API and makes the backend reusable by future clients.

## Deployment

The current production architecture is:

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

### Frontend

The React frontend is deployed on Vercel.

The production application is available at:

**https://lightmanager.jiantao.dev**

### Backend

The ASP.NET Core Web API is deployed on Microsoft Azure App Service.

### Database

PostgreSQL is hosted with Neon.

Production configuration such as JWT secrets, frontend origins and database connection strings is provided through environment variables rather than committed to source control.

## Legacy Azure Static Web Apps Deployment

An earlier version of the LightManager frontend was hosted on Azure Static Web Apps at:

```text
https://thankful-beach-0211add0f.7.azurestaticapps.net
```

After migrating the frontend to Vercel and moving to the custom domain:

```text
https://lightmanager.jiantao.dev
```

I wanted to perform one final update to the old Azure Static Web App so that the previous URL would redirect users to the new site.

Several approaches were attempted.

### Azure Static Web Apps CLI

A minimal redirect site containing only `index.html` and `staticwebapp.config.json` was created and deployed with the SWA CLI.

The deployment was rejected by Azure with errors including:

```text
No matching static site found.
```

### Deployment Token Reset

The deployment token was reset through Azure Portal and tested again with the SWA CLI.

The deployment still failed.

### GitHub Actions

I created a GitHub Actions workflow using:

```text
Azure/static-web-apps-deploy@v1
```

The GitHub secret was successfully loaded and the generated redirect directory was correctly detected.

Azure still rejected the deployment with:

```text
No matching Static Web App was found or the api key was invalid.
```

### Azure Portal Configuration

I attempted to inspect and change the deployment configuration of the legacy Static Web App, but the relevant configuration options were read-only.

### Azure CLI and Cloud Shell

Azure CLI and Azure Cloud Shell were also tested.

I attempted to disconnect the old source-control integration so that the Static Web App could be reconnected to the current GitHub repository.

The disconnect operation also failed.

### Final Decision

After testing:

- SWA CLI
- Deployment token resets
- GitHub Actions
- Azure Portal configuration
- Azure CLI
- Azure Cloud Shell
- Source-control disconnect and reconnect

I decided to stop spending additional development time recovering the legacy Azure Static Web Apps deployment.

The old Azure Static Web Apps resource is now considered a **legacy and abandoned deployment**.

It is no longer part of the active LightManager architecture.

All documentation and active development now use:

**https://lightmanager.jiantao.dev**

This was also an important engineering decision: maintaining an obsolete deployment endpoint was no longer worth the time required to recover it, especially after the application had already moved to a new architecture and production domain.

## Project Evolution

### Version 1 — Team Project Management

The original LightManager included:

- Projects
- Members
- Role-based permissions
- Task assignment
- Kanban board
- Drag-and-drop task workflows

### Version 2 — Personal Task Management

The current LightManager focuses on:

```text
Inbox
  ↓
Today / Scheduled Tasks
  ↓
Calendar
  ↓
Completed Tasks
```

The project has therefore evolved from a demonstration-focused team management system into a smaller application that I can actually use and improve based on real experience.

## Future Improvements

- Improved task editing
- Recurring tasks
- Notes
- Search and filtering
- Notifications and reminders
- Better mobile interaction
- React Native Android client
- Persistent mobile authentication
- Local SQLite storage
- Offline support
- Synchronization between mobile and web

## Current Goal

LightManager is not intended to compete with large project or task management platforms.

The goal is to build a lightweight application that I can genuinely use while continuing to develop practical experience in:

- Full-stack application architecture
- React and TypeScript
- ASP.NET Core
- REST API design
- Authentication and authorization
- PostgreSQL and Entity Framework Core
- Cloud deployment
- Responsive design
- Mobile-first product design
- Cross-platform application development