---
lang: sv
title: "LightManager"
description: "En personlig applikation för uppgiftshantering byggd med React, TypeScript, ASP.NET Core och PostgreSQL, med JWT-autentisering, användarspecifik uppgiftsdata, kalenderbaserad planering och separat molndistribution av frontend och backend."
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
  - "Omdesignad från ett projektledningssystem för team till en personlig uppgiftshanterare baserad på faktisk användning"
  - "ASP.NET Core Web API med JWT-autentisering och användarspecifik åtkomstkontroll för uppgifter"
  - "Förenklad backendmodell från projekt, medlemskap och uppgiftstilldelning till direkt användarägda uppgifter"
  - "Today-, Inbox-, Calendar- och All Tasks-flöden med responsiv layout för både desktop och mobil"
  - "Persistent PostgreSQL-data genom Entity Framework Core och Neon"
  - "Frontend distribuerad på Vercel med egen domän och backend distribuerad separat på Azure App Service"
links:
  github: "https://github.com/jiantaoshen/LightManager"
  live: "https://lightmanager.jiantao.dev"
draft: false
---

## Uppdateringsinformation

LightManager har genomgått en större omdesign.

Den första versionen byggdes som en lättviktig projektledningsapplikation för små och medelstora team. Den innehöll projekt, projektmedlemmar, rollbaserade behörigheter, uppgiftstilldelning och en drag-and-drop-baserad Kanban-tavla.

Efter fortsatt utveckling och användning insåg jag att den ursprungliga produktinriktningen inte motsvarade hur jag själv faktiskt skulle använda applikationen. Eftersom jag inte själv tillhörde den ursprungliga målgruppen blev det svårt att förbättra produkten utifrån verklig daglig användning.

I stället för att fortsätta lägga till funktioner för hypotetiska teamflöden valde jag därför att designa om LightManager till en **personlig uppgiftshanterare** som jag själv kan använda, utvärdera kontinuerligt och förbättra utifrån faktisk erfarenhet.

Den nuvarande versionen fokuserar på:

- Today
- Inbox
- Calendar
- All Tasks
- Prioriteringar
- Förfallodatum
- Slutförda uppgifter
- Responsiv layout för desktop och mobil

Applikationen är för närvarande webbaserad, men backendarkitekturen är medvetet utformad så att en framtida React Native-klient kan återanvända samma ASP.NET Core API.

## Översikt

LightManager är nu en personlig applikation för uppgiftshantering som fokuserar på ett enkelt dagligt arbetsflöde i stället för projektadministration för team.

Autentiserade användare kan skapa, schemalägga, slutföra och hantera sina egna uppgifter. Uppgifter utan förfallodatum ligger kvar i Inbox, schemalagda uppgifter kan granskas via Today och Calendar, och all uppgiftsdata lagras permanent i PostgreSQL.

Frontend är byggd med React, TypeScript, Tailwind CSS och shadcn/ui, medan backend är byggd med ASP.NET Core, Entity Framework Core och ASP.NET Identity.

## Varför jag ändrade produktens inriktning

Den ursprungliga versionen av LightManager innehöll:

- Projects
- Project members
- Role-based permissions
- Task assignment
- Kanban workflows

Funktionerna fungerade tekniskt, men jag märkte att jag själv hade väldigt liten anledning att faktiskt använda applikationen.

Det skapade ett viktigt produktproblem: jag kunde fortsätta implementera nya funktioner, men jag kunde inte på ett bra sätt bedöma om de faktiskt var användbara i vardagen.

Därför ändrade jag projektet från:

```text
Team Project Management
```

till:

```text
Personal Task Management
```

Den nya inriktningen ger mig ett verkligt användningsfall att testa mot. I stället för att bygga funktioner enbart för demonstration kan jag nu använda applikationen själv och förbättra den utifrån faktisk friktion och verkliga användningsmönster.

## Omdesign av arkitekturen

Backendmodellen förenklades kraftigt.

Den ursprungliga strukturen var:

```text
User
 └── Project
      ├── Members
      ├── Roles
      └── Tasks
           └── Assignees
```

Den nuvarande strukturen är:

```text
User
 ├── Task
 ├── Task
 └── Task
```

Projekt, projektmedlemskap, uppgiftstilldelning och projektbaserade roller togs bort från den centrala datamodellen.

Uppgifter ägs nu direkt av autentiserade användare.

Det gör systemet enklare att underhålla och bättre anpassat för personlig användning, samtidigt som det ger ett renare API för en framtida mobilklient.

## Backend

Backend är byggd som ett ASP.NET Core Web API.

Task-API:t förenklades från projektbaserade endpoints som:

```text
/api/projects/{projectId}/tasks
```

till:

```text
/api/tasks
```

Alla endpoints för uppgifter kräver autentisering.

Den autentiserade användarens identitet hämtas från JWT-token och används för att begränsa databasfrågor så att användaren endast kan läsa eller ändra sina egna uppgifter.

Den nuvarande Task-modellen innehåller:

- Title
- Description
- Status
- Priority
- Due date
- Created timestamp
- Updated timestamp
- Completed timestamp
- User ownership

Status och prioritet representeras med enums och lagras som läsbara strängar i PostgreSQL.

## Autentisering och behörighet

Autentisering implementeras med ASP.NET Identity och JWT.

Autentiseringsflödet är:

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

Även användarmodellen förbättrades.

I den ursprungliga implementationen användes användarens fullständiga namn som ASP.NET Identity-användarnamn.

Den nuvarande implementationen separerar inloggningsidentitet från visningsnamn:

```text
UserName = Email
DisplayName = FullName
```

Detta undviker konflikter när flera användare har samma namn.

Behörighetsmodellen fokuserar nu på **isolering av användardata** i stället för teamroller. Varje läsning, uppdatering och borttagning av en uppgift verifierar att uppgiften tillhör den autentiserade användaren.

## Funktioner

### Today

Visar uppgifter som är schemalagda för dagens datum och separerar öppna och slutförda uppgifter.

### Inbox

Lagrar uppgifter som ännu inte har fått något förfallodatum.

Det ger användaren ett snabbt sätt att registrera något först och bestämma när det ska göras senare.

### Calendar

Uppgifter kan visas och planeras per datum genom ett kalenderbaserat arbetsflöde.

### All Tasks

Visar användarens kompletta uppgiftslista med stöd för sökning och filtrering.

### Uppgiftshantering

Användaren kan:

- Skapa uppgifter
- Redigera uppgifter
- Slutföra uppgifter
- Återöppna slutförda uppgifter
- Ta bort uppgifter
- Ange prioritet
- Ange förfallodatum

### Autentisering

Användare kan registrera sig och logga in med ASP.NET Identity och JWT-autentisering.

### Användarspecifik data

Varje autentiserad användare kan endast komma åt sina egna uppgifter.

### Responsiv design

Gränssnittet har designats om med mobil användning i åtanke.

Desktopversionen använder sidonavigering, medan mindre skärmar använder en förenklad mobil layout.

## Omdesign av frontend

Det ursprungliga gränssnittet var organiserat kring:

```text
Dashboard
Projects
Kanban
Members
```

Den nya navigationen är:

```text
Today
Inbox
Calendar
All Tasks
Profile
```

Frontend använder nu:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

UI:t har organiserats om i återanvändbara komponenter och ett tydligare application shell.

Omdesignen förbereder också projektet för en framtida mobilversion genom att låta huvuddelen av affärslogiken ligga bakom API:t i stället för att vara hårt kopplad till webbgränssnittet.

## Databas

PostgreSQL används för persistent applikationsdata och hostas hos Neon.

Entity Framework Core hanterar databasåtkomst och migrations.

Den nuvarande tabellen `Tasks` innehåller:

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

Följande index har lagts till:

```text
(UserId, DueDate)
(UserId, Status)
```

Dessa stödjer vanliga frågor som används i Today-, Calendar- och Inbox-vyerna.

## Utmaningar och beslut

### Att lämna den ursprungliga domänmodellen

Ett av de största arkitekturbesluten var att ta bort den ursprungliga modellen med projekt, medlemmar och roller.

I stället för att behålla oanvänd komplexitet enbart för att demonstrera fler funktioner valde jag att förenkla datamodellen utifrån de faktiska produktkraven.

### Isolering av användardata

Efter övergången från projektbaserad behörighet blev uppgiftsägande den viktigaste behörighetsgränsen.

Alla skyddade endpoints för uppgifter verifierar den autentiserade användarens identitet innan data läses eller ändras.

### Web först, mobil senare

Jag övervägde att direkt gå över till React Native, men valde att först färdigställa webbapplikationen.

Det nuvarande målet är att stabilisera:

- Produktflödet
- API-designen
- Autentiseringen
- Databasstrukturen
- Uppgifternas beteende

När dessa delar är stabila kan en React Native-klient läggas till utan att backend behöver designas om samtidigt.

### Separat distribution av frontend och backend

Frontend och backend distribueras nu separat.

Det skapar en tydligare separation mellan klient och API och gör backend återanvändbar för framtida klienter.

## Distribution

Den nuvarande produktionsarkitekturen är:

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

React-frontend distribueras via Vercel.

Produktionsadressen är:

**https://lightmanager.jiantao.dev**

### Backend

ASP.NET Core Web API distribueras via Microsoft Azure App Service.

### Databas

PostgreSQL hostas hos Neon.

Produktionskonfiguration som JWT-hemligheter, frontend origins och databasanslutningar tillhandahålls via miljövariabler i stället för att sparas i källkoden.

## Äldre Azure Static Web Apps-distribution

En tidigare version av LightManager-frontend var distribuerad via Azure Static Web Apps på:

```text
https://thankful-beach-0211add0f.7.azurestaticapps.net
```

Efter migreringen av frontend till Vercel och övergången till den nya egna domänen:

```text
https://lightmanager.jiantao.dev
```

ville jag göra en sista uppdatering av den gamla Azure Static Web App-resursen så att den gamla URL:en automatiskt skulle omdirigera användare till den nya webbplatsen.

Flera olika metoder testades.

### Azure Static Web Apps CLI

Jag skapade en minimal redirectsida som endast innehöll `index.html` och `staticwebapp.config.json` och försökte distribuera den med SWA CLI.

Azure avvisade deploymenten med fel som:

```text
No matching static site found.
```

### Återställning av Deployment Token

Deployment-token återställdes via Azure Portal och testades igen med SWA CLI.

Deploymenten misslyckades fortfarande.

### GitHub Actions

Jag skapade därefter ett GitHub Actions-workflow med:

```text
Azure/static-web-apps-deploy@v1
```

GitHub-secret kunde läsas korrekt och den genererade redirect-katalogen identifierades korrekt av deployment action.

Azure avvisade ändå deploymenten med:

```text
No matching Static Web App was found or the api key was invalid.
```

### Azure Portal-konfiguration

Jag försökte kontrollera och ändra deployment-konfigurationen för den äldre Static Web App-resursen, men de relevanta inställningarna var skrivskyddade i Azure Portal.

### Azure CLI och Cloud Shell

Jag testade även Azure CLI och Azure Cloud Shell.

Ett av försöken var att koppla från den gamla source-control-integrationen och därefter återansluta Static Web App-resursen till det aktuella GitHub-repot.

Även disconnect-operationen misslyckades.

### Slutligt beslut

Efter att ha testat:

- SWA CLI
- Återställning av deployment token
- GitHub Actions
- Azure Portal-konfiguration
- Azure CLI
- Azure Cloud Shell
- Source-control disconnect / reconnect

valde jag till slut att inte lägga mer utvecklingstid på att återställa den äldre Azure Static Web Apps-distributionen.

Den gamla resursen betraktas nu som en **äldre och övergiven deployment**.

Den ingår inte längre i den aktiva LightManager-arkitekturen.

All dokumentation och fortsatt utveckling använder nu:

**https://lightmanager.jiantao.dev**

Detta blev också ett viktigt tekniskt beslut: det gamla deployment-endpointet gav inte längre tillräckligt värde för att motivera mer tid på återställning, särskilt eftersom applikationen redan hade migrerats till en ny arkitektur och en ny produktionsdomän.

## Projektets utveckling

### Version 1 — Projektledning för team

Den ursprungliga LightManager-versionen innehöll:

- Projects
- Members
- Role-based permissions
- Task assignment
- Kanban board
- Drag-and-drop task workflows

### Version 2 — Personlig uppgiftshantering

Den nuvarande LightManager-versionen fokuserar på:

```text
Inbox
  ↓
Today / Scheduled Tasks
  ↓
Calendar
  ↓
Completed Tasks
```

Projektet har därför utvecklats från ett mer demonstrationsorienterat system för teamhantering till en mindre applikation som jag själv faktiskt kan använda och förbättra utifrån verklig erfarenhet.

## Framtida förbättringar

- Förbättrad redigering av uppgifter
- Återkommande uppgifter
- Anteckningar
- Sökning och filtrering
- Notiser och påminnelser
- Bättre mobil interaktion
- React Native-klient för Android
- Persistent mobil inloggning
- Lokal SQLite-lagring
- Offline-stöd
- Synkronisering mellan webb och mobil

## Nuvarande mål

LightManager är inte avsett att konkurrera med stora projekt- eller uppgiftshanteringsplattformar.

Målet med projektet är att bygga en lättviktig applikation som jag faktiskt kan använda själv, samtidigt som jag fortsätter utveckla praktisk erfarenhet inom:

- Full-stack-applikationsarkitektur
- React och TypeScript
- ASP.NET Core
- REST API-design
- Autentisering och behörighet
- PostgreSQL och Entity Framework Core
- Molndistribution
- Responsiv design
- Mobile-first produktdesign
- Plattformsöverskridande applikationsutveckling