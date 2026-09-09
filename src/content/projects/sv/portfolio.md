---
lang: sv
title: "Utvecklarportfolio"
description: "En flerspråkig utvecklarportfolio byggd med Astro, React, TypeScript, Tailwind CSS och ASP.NET Core, med statisk innehållsrendering, ett publikt testläge för dashboarden och ett lokalt arbetsflöde för innehållshantering."
status: "Live"
order: 3
featured: true
featuredOrder: 3

technologies:
  - "Astro"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "ASP.NET Core"
  - "Astro Content Collections"
  - "Markdown"
  - "Vercel"

highlights:
  - "Statisk HTML-first-portfolio byggd med Astro"
  - "Stöd för engelska, svenska och kinesiska med språkspecifika routes"
  - "Blogg- och projektinnehåll hanteras med Markdown och Astro Content Collections"
  - "Flerspråkigt innehåll för Om mig, Kompetenser och Utbildning lagras som JSON"
  - "Publikt Trial-läge för dashboarden med redigering endast i webbläsaren"
  - "Lokal dashboard med React och ASP.NET Core för redigering av källinnehåll"
  - "Blogg- och projektredigerare med separata Edit- och Preview-flikar"
  - "Git-baserat publiceringsflöde med automatiska Vercel-byggen"

links:
  github: "https://github.com/jiantaoshen/portfolio-dev"
  live: "https://www.jiantao.dev"

draft: false
---

## Översikt

Developer Portfolio är en flerspråkig utvecklarportfolio byggd med Astro, React, TypeScript, Tailwind CSS och ASP.NET Core.

Den publika webbplatsen använder Astro för att generera statiska sidor från Markdown- och JSON-innehåll. De engelska, svenska och kinesiska versionerna delar samma applikationsstruktur men använder språkspecifika routes och innehåll.

Projektet innehåller också två dashboard-lägen: ett publikt Trial-gränssnitt där besökare kan testa redigeraren och en lokal dashboard med ASP.NET Core för att hantera portfolions källfiler.

Resultatet är en statisk produktionswebbplats med ett lättviktigt Git-baserat arbetsflöde för innehåll i stället för en produktionsdatabas eller ett traditionellt CMS.

## Problemet

En flerspråkig portfolio innehåller flera typer av innehåll som behöver vara organiserade och enkla att uppdatera.

Projektet innehåller:

- Information om mig och CV
- Kompetenser och utbildning
- Bloggartiklar
- Projektbeskrivningar
- Innehåll på engelska, svenska och kinesiska

Att redigera allt detta direkt i källfiler fungerar bra i mindre skala, men blir mindre praktiskt när mängden innehåll växer.

Samtidigt är den publika portfolion huvudsakligen statisk. Att införa en produktionsdatabas och en permanent backend skulle skapa ytterligare infrastruktur som inte behövs för innehåll som bara ändras när webbplatsen byggs om.

Målet var därför att behålla den publika webbplatsen statisk och samtidigt skapa ett enklare sätt att hantera Markdown- och JSON-innehållet.

## Lösning

Portfolion följer en content-to-code-arkitektur.

Blogg- och projektinnehåll lagras som Markdown och valideras med Astro Content Collections. Innehåll för Om mig, Kompetenser och Utbildning lagras som flerspråkig JSON.

```text
JSON / Markdown
       ↓
     Astro
       ↓
 Statisk build
       ↓
    Vercel
```

Astro använder dessa källfiler under byggprocessen för att generera den publika portfolion.

För innehållshantering lägger projektet till en React-baserad dashboard ovanpå samma filer.

Den publika routen `/trial` erbjuder en sandbox-version av redigeraren där ändringar endast finns i webbläsarens state.

Den lokala routen `/dashboard` ansluter till en ASP.NET Core-backend som direkt kan uppdatera portfolions JSON- och Markdown-filer.

```text
Dashboard
   ↓
ASP.NET Core
   ↓
JSON / Markdown
   ↓
Git commit
   ↓
Vercel rebuild
```

På så sätt förblir Git källan till sanningen samtidigt som innehållet kan redigeras via ett visuellt gränssnitt.

## Funktioner

### Statisk HTML-first-portfolio

Den publika portfolion är byggd med Astro och genereras som statiskt innehåll.

Markdown och JSON omvandlas till sidor under byggprocessen, vilket håller den driftsatta webbplatsen lättviktig och väl anpassad för innehållsdrivna sidor.

### Flerspråkigt stöd

Portfolion stöder engelska, svenska och kinesiska.

Varje språk använder statiska routes under:

```text
/en/
/sv/
/zh/
```

Samma struktur används även för språkspecifikt blogg- och projektinnehåll.

```text
/en/blog/
/sv/blog/
/zh/blog/

/en/projects/
/sv/projects/
/zh/projects/
```

Det gör det möjligt att återanvända samma mallar och komponenter samtidigt som innehållet hålls separerat per språk.

### Markdown Content Collections

Bloggartiklar och projektbeskrivningar lagras i språkspecifika Markdown-mappar.

```text
src/
├── content/
│   ├── blog/
│   │   ├── en/
│   │   ├── sv/
│   │   └── zh/
│   │
│   └── projects/
│       ├── en/
│       ├── sv/
│       └── zh/
```

Astro Content Collections används för att validera och hantera Markdown-innehållet.

Frontmatter innehåller strukturerad metadata, medan själva artikel- eller projektinnehållet skrivs i Markdown.

### Flerspråkigt JSON-innehåll

Innehåll för Om mig, Kompetenser och Utbildning lagras som flerspråkig JSON.

Språkfilerna är organiserade under:

```text
src/i18n/locales/
├── en/
├── sv/
└── zh/
```

Det separerar strukturerad profilinformation från längre Markdown-baserat innehåll samtidigt som båda typerna ligger kvar i repositoryt.

### Publikt Trial-läge

Portfolion innehåller en publik sandbox för dashboarden på:

```text
/trial
```

Besökare kan utforska redigeringsgränssnittet och ändra innehåll direkt i webbläsaren.

Ändringarna finns endast i webbläsarens state och skrivs aldrig till källfilerna.

När sidan laddas om återställs Trial-innehållet.

### Lokal innehållsdashboard

En separat lokal dashboard finns på:

```text
/dashboard
```

Den erbjuder ett React-baserat gränssnitt för att hantera portfolions innehåll under utveckling.

Dashboarden stöder flerspråkig hantering av CV, Blogg och Projekt.

Blogg- och projektredigerarna innehåller även separata `Edit`- och `Preview`-flikar, vilket gör det möjligt att granska Markdown-innehållet innan källfilerna uppdateras.

### ASP.NET Core-backend för innehåll

Den lokala dashboarden kommunicerar med en mindre ASP.NET Core-backend.

I stället för att lagra innehåll i en databas redigerar backend-tjänsten direkt de JSON- och Markdown-filer som används av Astro.

Backend-tjänsten används endast under lokal utveckling.

Det innebär att den publika produktionsportfolion inte är beroende av en applikationsserver för att leverera sitt innehåll.

### Språkspecifika CV-nedladdningar

Portfolion erbjuder CV-nedladdningar på engelska, svenska och kinesiska.

Besökare kan ladda ner den CV-version som motsvarar det valda språket på webbplatsen.

### Responsivt gränssnitt

Tailwind CSS används för både portfolions och dashboardens layout.

Gränssnittet är utformat för att fungera på både desktop och mindre skärmar och använder återanvändbara stil- och komponentmönster på olika sidor.

## Arkitektur

Projektet separerar publik rendering från lokal innehållshantering.

### Publik webbplats

```text
Markdown / JSON
      ↓
    Astro
      ↓
 Statisk HTML
      ↓
   Vercel
```

Den driftsatta portfolion läser sitt innehåll under byggprocessen och genererar en statisk webbplats.

### Lokal innehållshantering

```text
React Dashboard
       ↓
ASP.NET Core
       ↓
Markdown / JSON
       ↓
      Git
       ↓
 Astro Build
       ↓
    Vercel
```

Dashboarden fungerar som ett visuellt redigeringslager ovanpå samma källfiler som används av den publika portfolion.

Det finns ingen separat produktionsdatabas för innehållet.

## Viktiga beslut

### Behålla innehållet i Git

Markdown och JSON fortsätter att vara portfolions källa till sanningen.

Det håller innehållet tillsammans med applikationskoden och gör att ändringar kan följa samma Git-arbetsflöde som resten av projektet.

Det innebär också att Astro kan generera hela webbplatsen direkt från innehållet i repositoryt vid varje build.

### Använda en lokal backend

ASP.NET Core-backenden behövs endast när lokala källfiler ska redigeras.

Den behöver inte köras som en del av den driftsatta portfolion.

Det håller produktionsarkitekturen enklare samtidigt som dashboarden kan erbjuda filbaserad innehållshantering under utveckling.

### Separera Trial- och Dashboard-lägen

Projektet erbjuder två versioner av redigeringsupplevelsen för olika syften.

```text
/trial
```

är publik och icke-persistent.

```text
/dashboard
```

är avsedd för lokal utveckling och kan uppdatera det faktiska källinnehållet via ASP.NET Core.

Det gör det möjligt att demonstrera dashboarden publikt utan att exponera funktionalitet som skriver till filer.

### Använda Markdown och JSON för olika typer av innehåll

Längre Blogg- och Projektinnehåll lagras i Markdown, medan strukturerad profilinformation som Om mig, Kompetenser och Utbildning lagras i JSON.

Det gör att varje innehållstyp kan använda ett format som passar hur den redigeras och renderas.

## Utveckling

Installera frontend-beroenden:

```bash
npm install
```

Starta Astro:

```bash
npm run dev
```

Starta den lokala ASP.NET Core-backenden:

```bash
cd backend/Career.Api
dotnet run
```

Standardadresserna lokalt är:

```text
Astro:   http://localhost:4321
Backend: http://127.0.0.1:5080
```

## Deployment

Den publika portfolion distribueras via Vercel.

Astro bygger Markdown- och JSON-innehållet till den statiska webbplatsen, medan ASP.NET Core-tjänsten förblir en del av det lokala utvecklingsflödet.

Innehållsuppdateringar följer ett Git-baserat arbetsflöde:

```text
Redigera innehåll
       ↓
   Git commit
       ↓
 Vercel rebuild
```

Det gör att den driftsatta webbplatsen kan förbli statisk samtidigt som portfolioinnehållet versionshanteras i repositoryt.

## Framtida förbättringar

- Utöka Blogg och Projekt med mer innehåll
- Förbättra redigeringsflöden och validering i dashboarden
- Lägga till filtrering eller sökning för innehåll
- Förbättra arkitekturdiagram och projektvisualiseringar
- Lägga till rikare strukturerad SEO-metadata
- Fortsätta förbättra tillgängligheten
- Fortsätta förbättra prestandan