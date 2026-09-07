---
lang: sv
title: "Från React till Astro i min utvecklarportfolio"
description: "Varför jag flyttade en innehållstung utvecklarportfolio från en klientrenderad React-SPA till en HTML-first-arkitektur med Astro, statiska routes, Markdown och Content Collections."
date: 2026-09-02
readingTime: "8 min"
tags:
  - "Astro"
  - "React"
  - "TypeScript"
  - "Architecture"
  - "Static Site"
draft: false
---

## Problemet

Min portfolio använde ursprungligen React, React Router och react-i18next.

Arkitekturen fungerade tekniskt bra, men när webbplatsen växte blev det tydligt att de flesta sidor i grunden var innehållsdrivna:

- projektstudier
- tekniska anteckningar
- portfolioinformation
- flerspråkigt innehåll
- CV-filer på flera språk

Väldigt lite av detta innehåll behövde klientbaserat applikationstillstånd.

En projektstudie behöver inte React för att vara användbar. En teknisk anteckning bör inte kräva JavaScript bara för att visa text. Även större delen av navigationen består i praktiken av vanliga länkar mellan sidor.

Det ledde till en enkel arkitekturfråga:

**Varför skulle en klientapplikation ansvara för att rendera innehåll som redan kan existera som HTML?**

## Övervägda alternativ

Jag övervägde främst tre lösningar.

### A. Behålla den befintliga React-SPA:n

Det enklaste alternativet var att fortsätta använda React Router och react-i18next och bygga vidare på den befintliga arkitekturen.

Det skulle kräva minst migreringsarbete, men innebar också fortsatt klientrendering för sidor som egentligen inte hade någon nytta av den.

### B. Behålla React men införa statisk generering

Ett annat alternativ var att behålla Reacts komponentmodell men flytta till ett ramverk med stöd för förgenerering.

Det skulle minska mängden rendering i runtime, men React skulle fortfarande vara en central del av arkitekturen trots att de flesta sidor i praktiken är dokument.

### C. Flytta till Astro

Astro passade bättre för webbplatsens faktiska form.

Det gör det möjligt att fortsätta arbeta komponentbaserat samtidigt som statisk HTML genereras under build-processen.

Klientbaserad JavaScript kan därefter läggas till endast där en funktion faktiskt behöver det.

Jag valde **C**.

## Den nya arkitekturen

Den nuvarande webbplatsen använder Astro, TypeScript, Tailwind CSS, Markdown och Astro Content Collections.

```text
Markdown / översättningsdata
              ↓
            Astro
              ↓
         Build Process
              ↓
         Static HTML
              ↓
            Browser
```

Projektsidor och tekniska anteckningar genereras i förväg.

Webbläsaren får HTML och CSS för huvudinnehållet direkt i stället för att vänta på att en JavaScript-light-mutedlikation ska bygga sidan.

## Från runtime-i18n till statiska språk-routes

Den tidigare versionen använde react-i18next för att byta språk i runtime.

Den nya webbplatsen använder i stället tydliga språk-routes:

```text
/en/
/sv/
/zh/
```

Samma struktur används för projektsidor:

```text
/en/projects/price-watch/
/sv/projects/price-watch/
/zh/projects/price-watch/
```

och tekniska anteckningar:

```text
/en/blog/react-to-astro/
/sv/blog/react-to-astro/
/zh/blog/react-to-astro/
```

Astro genererar dessa sidor under build-processen.

Gemensam gränssnittstext kommer fortfarande från språkspecifika översättningsfiler, men huvudinnehållet behöver inte längre ett runtime-baserat i18n-bibliotek för att renderas.

URL:en beskriver dessutom direkt vilket språk sidan använder.

## Från långformad JSON till Markdown

Den ursprungliga webbplatsen lagrade projektdokumentation och tekniska anteckningar i JSON-strukturer.

Det fungerade bra för strukturerad metadata, men blev mindre praktiskt när de tekniska texterna blev längre.

Ett projekt kunde exempelvis innehålla fält som:

```text
overview
problem
solution
features
challenges
deployment
learnings
futureImprovements
```

Den nya arkitekturen separerar strukturerad metadata från längre innehåll.

Metadata ligger kvar i Markdown-frontmatter:

```yaml
title: "Price Watch"
status: "Done"
technologies:
  - ASP.NET Core
  - Python
  - Playwright
```

Resten av projektdokumentationen skrivs som vanlig Markdown:

```md
## Problemet

...

## Lösningen

...

## Utmaningar & beslut

...
```

Det gör projektstudierna betydligt enklare att skriva och underhålla.

## Content Collections

Både tekniska anteckningar och projekt använder nu Astro Content Collections.

```text
src/content/

  blog/
    en/
    sv/
    zh/

  projects/
    en/
    sv/
    zh/
```

Samma slug kan användas på alla språk:

```text
projects/en/price-watch.md
projects/sv/price-watch.md
projects/zh/price-watch.md
```

Samma Content Collection-entry kan dessutom användas på flera ställen på webbplatsen.

Projektdata kan exempelvis driva:

```text
Project Markdown
       │
       ├── Homepage Featured Projects
       ├── Projects List
       └── Project Detail Page
```

Tekniska anteckningar fungerar på samma sätt:

```text
Technical Note Markdown
          │
          ├── Homepage Latest Notes
          ├── Blog List
          └── Article Detail Page
```

Det eliminerar duplicerade innehållskällor.

## Ersätta React Router

React Router ansvarade tidigare för klientbaserad navigation.

Astro genererar nu vanliga statiska routes.

```html
<a href="/en/projects/price-watch/">
```

Dynamiska Astro-routes som:

```text
[lang]/projects/[...slug].astro
```

löses under build-processen utifrån de entries som finns i Content Collection.

## Behålla Tailwind CSS

Migreringen krävde inte att det visuella designsystemet byttes ut.

Tailwind CSS används fortfarande för:

- typografi
- spacing
- responsiva layouts
- kort
- navigation
- knappar
- återanvändbara design-primitives

Den viktiga skillnaden är att Tailwind producerar CSS. Webbläsaren behöver inte React för att dessa stilar ska fungera.

## JavaScript finns fortfarande tillgängligt

Att flytta till Astro betyder inte att JavaScript ska undvikas helt.

Målet är att endast använda JavaScript där det faktiskt skapar värde.

Framtida funktioner som klientsökning, interaktiv filtrering, avancerade visualiseringar eller stateful UI-verktyg kan fortfarande använda JavaScript.

Men själva renderingen av en projektbeskrivning eller teknisk artikel behöver det inte.

Till och med den nuvarande mobilnavigationen kan byggas med ett inbyggt HTML-element som `<details>` i stället för ett JavaScript-baserat state hook.

## Avvägningar

Migreringen introducerade mer struktur i build-processen.

Content schemas behöver vara konsekventa, statiska routes måste genereras korrekt och flerspråkiga Markdown-filer behöver använda matchande slugs.

Migreringen innebar också att:

```text
React components
React Router
react-i18next
JSON article data
JSON project documentation
```

ersattes med:

```text
Astro components
static routes
build-time translations
Markdown
Content Collections
```

Dessa kostnader ligger dock främst i utvecklingsfasen. Den resulterande runtime-arkitekturen är enklare.

## Resultat

Portfolion ligger nu betydligt närmare den typ av produkt den faktiskt är.

Den består framför allt av dokumentation och projektinformation, så det innehållet genereras direkt som HTML.

Utvecklingsflödet behåller fortfarande återanvändbara komponenter, TypeScript, Tailwind CSS, strukturerade content schemas, flerspråkigt innehåll och återanvändbara layouts.

Men webbläsaren får huvudsakligen HTML och CSS.

```text
Content
   ↓
Astro Build
   ↓
Static HTML + CSS
   ↓
Browser
```

i stället för:

```text
Content
   ↓
JavaScript Bundle
   ↓
React Runtime
   ↓
Browser Rendering
```

För den här typen av webbplats är det en bättre matchning.
