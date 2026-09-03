---
lang: sv
title: "Developer Portfolio"
description: "En flerspråkig utvecklarportfolio byggd med Astro, TypeScript och Tailwind CSS, där statisk HTML, Content Collections och Markdown används för att presentera projekt, tekniska anteckningar och erfarenhet inom mjukvaruutveckling."
category: "Static webbsida"
status: "Live"
order: 3
featured: true
featuredOrder: 3
technologies:
  - "Astro"
  - "TypeScript"
  - "Tailwind CSS"
  - "Content Collections"
  - "Markdown"
  - "Firebase Hosting"
highlights:
  - "HTML-first-arkitektur med statisk rendering genom Astro"
  - "Stöd för engelska, svenska och kinesiska med språkspecifika routes"
  - "Projektstudier och tekniska anteckningar lagras som Markdown i Content Collections"
  - "Återanvändbara statiska routes för projekt- och artikeldetaljer"
  - "Språkspecifika CV-nedladdningar"
  - "Responsivt gränssnitt byggt med Tailwind CSS"
  - "Minimal klientbaserad JavaScript för innehållstunga sidor"
  - "Utformad för statisk driftsättning på Firebase Hosting"
links:
  github: "https://github.com/jiantaoshen/portfolio-dev"
  live: "https://jiantao-portfolio-dev.web.app"
draft: false
---

## Projektöversikt

Den här portfolion är en flerspråkig utvecklarwebbplats byggd med Astro, TypeScript och Tailwind CSS för att presentera mina mjukvaruprojekt, tekniska anteckningar och utvecklingsinriktning.

Webbplatsen byggdes ursprungligen som en React-SPA. När innehållet växte blev det tydligt att de flesta sidor inte behövde klientbaserat applikationstillstånd eller rendering i runtime. Den nuvarande implementationen använder därför Astro för att generera statisk HTML under build-processen samtidigt som återanvändbara komponenter, TypeScript och Tailwind CSS behålls i utvecklingsflödet.

Projektstudier och tekniska anteckningar lagras som Markdown i Astro Content Collections, medan gemensamma gränssnittstexter finns kvar i lätta språkspecifika översättningsfiler.

## Problemet

En utvecklarportfolio bör förmedla mer än en lista över tekniker. Den behöver visa tekniska styrkor, konkreta projektbevis och en tydlig utvecklingsinriktning för rekryterare, kunder och tekniska team.

Samtidigt behöver en innehållstung portfolio vara enkel att underhålla. Projektstudier, tekniska anteckningar och flerspråkigt innehåll bör inte kräva duplicerade sidkomponenter eller stora bibliotek för klientbaserad rendering.

Den tidigare React-baserade strukturen fungerade, men stora delar av webbplatsen bestod i praktiken av statiskt innehåll. Att rendera dessa sidor som en klientapplikation gav därför extra komplexitet utan motsvarande nytta.

## Lösningen

Den nuvarande arkitekturen använder Astro som ett HTML-first-ramverk för statiska webbplatser.

Alla språk använder samma sidmallar med språkspecifika routes som `/en/`, `/sv/` och `/zh/`. Gemensamma gränssnittsöversättningar laddas vid build, medan projektstudier och tekniska anteckningar lagras i Markdown Content Collections.

Astro genererar den slutliga HTML-koden under build-processen. Projekt, tekniska anteckningar och större delen av navigationsinnehållet kan därför läsas utan klientbaserad JavaScript.

Tailwind CSS används som responsivt designsystem och TypeScript används för siddata, komponent-props och innehållsscheman.

## Funktioner

### Statisk HTML-first-rendering

Astro förgenererar innehållssidor som statisk HTML. Projektstudier och tekniska anteckningar är inte beroende av ett klientramverk för att visa sitt huvudsakliga innehåll.

### Flerspråkig routing

Engelska, svenska och kinesiska delar samma Astro-mallar men använder språkspecifika URL:er som `/en/projects/`, `/sv/projects/` och `/zh/projects/`.

### Content Collections för projekt

Projektstudier lagras som Markdown-filer i språkspecifika Content Collection-mappar. Strukturerad metadata som tekniker, arkitektur, status och länkar finns i frontmatter, medan längre projektdokumentation skrivs direkt i Markdown.

### Tekniska anteckningar

Tekniska anteckningar använder samma Content Collection-modell. När en ny Markdown-fil läggs till kan den automatiskt visas i blogglistan, på startsidan och på en egen detaljsida utan duplicerad artikeldata i JSON.

### Språkspecifika CV-nedladdningar

Besökare kan ladda ner en engelsk, svensk eller kinesisk version av CV:t baserat på det aktuella språket.

### Responsiv design

Gränssnittet använder Tailwind CSS och ett mindre återanvändbart designsystem för typografi, kort, knappar, navigation och layout på både desktop och mobil.

### Minimal klientbaserad JavaScript

Rendering av innehåll, route-generering, navigationsstatus och flerspråkiga sidor hanteras vid build där det är möjligt. JavaScript reserveras för funktioner som faktiskt behöver interaktion.

### Enkel kontakt

Besökare kan kontakta mig direkt via e-post eller LinkedIn utan behov av ett separat kontaktformulärs-backend eller kontosystem.

## Utmaningar & beslut

### Migrering från React till Astro

Den största migreringsutmaningen var att separera innehållsrendering från applikationsbeteende. React Router, react-i18next och React-baserade sidkomponenter togs bort samtidigt som designsystemet, den flerspråkiga strukturen och projekt-URL:erna behölls.

### Flerspråkig innehållsstruktur

Engelska, svenska och kinesiska måste behålla samma struktur utan att skapa tre separata versioner av varje sidkomponent. Språkspecifika routes och gemensamma Astro-mallar löser detta samtidigt som själva innehållsfilerna kan hållas separerade per språk.

### Innehållsmodell

Långa projektbeskrivningar och tekniska anteckningar låg tidigare i JSON-strukturer. Genom att flytta längre innehåll till Markdown blir teknisk dokumentation enklare att skriva och underhålla, medan frontmatter fortfarande ger strukturerad metadata för kort, sortering och sidofält.

### Statiska routes från Content Collections

Projekt- och artikeldetaljsidor genereras från Content Collection-poster. Filvägar ger stabila språkspecifika identifierare och gör det möjligt att återanvända samma slug för engelska, svenska och kinesiska.

### Återanvändning utan överdesign

Webbplatsen använder återanvändbara Astro-komponenter för layout, navigation, projektförhandsvisningar och artikelförhandsvisningar, medan enklare engångssektioner förblir direkt HTML och Tailwind.

## Driftsättning

Astro bygger webbplatsen till statisk HTML, CSS och andra statiska resurser som kan distribueras via Firebase Hosting.

Den statiska arkitekturen minskar behovet av SPA-fallback-routing för vanliga innehållssidor och minskar mängden klientbaserad JavaScript som krävs för att rendera webbplatsen.

## Lärdomar

- Migrera en React-SPA till en statisk Astro-arkitektur
- Bygga HTML-first-sidor med Astro och TypeScript
- Designa flerspråkiga statiska routes utan runtime-baserade i18n-bibliotek
- Hantera projektstudier med Astro Content Collections
- Hantera tekniska anteckningar som Markdown
- Återanvända samma innehållsmodell för startsida, listor och detaljsidor
- Generera statiska routes från språkspecifika Content Collection-ID:n
- Underhålla ett Tailwind CSS-designsystem i Astro-komponenter
- Minska klientbaserad JavaScript på innehållstunga webbplatser
- Förbereda statisk Astro-output för Firebase Hosting

## Framtida förbättringar

- Fortsätta bygga ut projektstudier och tekniska anteckningar
- Lägga till lätt filtrering eller sökning när samlingen tekniska anteckningar växer
- Förbättra arkitekturdiagram och tekniska visualiseringar
- Lägga till rikare SEO-metadata och strukturerad data
- Fortsätta förbättra tillgänglighet och prestanda
