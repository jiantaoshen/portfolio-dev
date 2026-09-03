---
lang: sv
title: "LightManager"
description: "En projektledningsapplikation byggd kring ett ASP.NET Core Web API med autentisering, rollbaserad behörighet, projekt- och uppgiftsflöden, persistent PostgreSQL-data och driftsättning på Azure."
category: "Fullstacksutveckling"
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
  - "Azure"
highlights:
  - "ASP.NET Core Web API med strukturerad backendlogik"
  - "Autentisering med ASP.NET Identity och JWT"
  - "Rollbaserad auktorisering och projektbehörigheter"
  - "Projektmedlemskap och arbetsflöden för uppgiftstilldelning"
  - "Entity Framework Core med PostgreSQL och Neon"
  - "Separat frontend- och backenddriftsättning på Microsoft Azure"
links:
  github: "https://github.com/jiantaoshen/LightManager"
  live: "https://thankful-beach-0211add0f.7.azurestaticapps.net"
draft: false
---

## Projektöversikt

LightManager är en open source-applikation för projektledning, utvecklad för små och medelstora team som behöver ett enkelt sätt att organisera projekt och uppgifter utan komplexiteten i stora företagsverktyg. Applikationen är byggd kring en ASP.NET Core-backend och innehåller autentisering, auktorisering, rollbaserade behörigheter, projektmedlemskap, uppgiftstilldelning och ett Kanban-arbetsflöde.

## Problemet

En projektledningsapplikation kräver mer än grundläggande CRUD-operationer. Användare, projekt, medlemskap, roller och uppgifter behöver fungera tillsammans samtidigt som backend måste säkerställa att användare endast kan utföra de operationer de har behörighet till.

## Lösningen

Applikationen delar upp ansvaret mellan en React-frontend och ett ASP.NET Core Web API. ASP.NET Identity hanterar användaridentitet, JWT-token autentiserar skyddade API-anrop, Entity Framework Core hanterar relationsdata och PostgreSQL lagrar persistent applikationsdata. Viktiga affärsregler och behörighetskontroller verkställs av backend.

## Funktioner

### Autentisering

Användare autentiseras genom ASP.NET Identity och skyddade API-anrop använder JWT-token.

### Auktorisering

Backend-endpoints verkställer behörigheter oberoende av vilka knappar eller vyer som visas i frontend.

### Rollbaserade behörigheter

Projektoperationer beror på användarens roll och relation till det aktuella projektet.

### Projekthantering

Användare kan skapa, redigera, arkivera och ta bort projekt.

### Uppgiftshantering

Uppgifter kan skapas, redigeras, tas bort och tilldelas medlemmar i projektet.

### Kanban-arbetsflöde

Uppgifter kan flyttas mellan olika statusar genom en drag-and-drop Kanban-tavla.

## Utmaningar & beslut

### Backend-auktorisering

Behörigheter måste verkställas av API:et och kan inte enbart förlita sig på att knappar eller routes döljs i frontend.

### Relationsbaserad applikationsdata

Användare, projekt, medlemskap, roller, uppgifter och tilldelningar behöver tydliga relationer och förutsägbart beteende.

### Separat frontend och backend

React-applikationen och ASP.NET Core API:et distribueras separat och kräver korrekt autentisering, konfiguration och kommunikation i produktionsmiljön.

## Driftsättning

React-frontend körs på Azure Static Web Apps, ASP.NET Core API:et körs på Azure App Service och PostgreSQL tillhandahålls av Neon. Projektet använde tidigare Vercel och Render innan det flyttades till Microsoft Azure i augusti 2026. Eftersom gratisnivåer används kan backend ibland behöva kallstartas efter en längre period av inaktivitet.

## Lärdomar

- Design av ASP.NET Core Web API
- Autentisering med ASP.NET Identity
- JWT-baserad API-autentisering
- Backend-auktorisering och rollbaserade behörigheter
- Relationsbaserad datamodellering
- Entity Framework Core och PostgreSQL
- Integration mellan React och ett separat backend-API
- Produktionskonfiguration och Azure-driftsättning

## Framtida förbättringar

- Använda AI för att generera föreslagna uppgifter från en projektbeskrivning
- Lägga till sökning och filtrering av uppgifter i Kanban-tavlan
