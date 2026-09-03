---
lang: sv
title: "Orkestrera Python-automation med ASP.NET Core"
description: "Hur jag separerade applikationsorkestrering från webbläsarautomation i ett lokalt prisövervakningssystem byggt med ASP.NET Core, Python och Playwright."
date: 2026-09-02
readingTime: "5 min"
tags:
  - ".NET"
  - "Python"
  - "Playwright"
  - "Automation"
draft: false
---

## Problemet

Prisövervakning handlar om mer än att hämta priser från webbsidor. Systemet behöver även hantera produktkonfiguration, schemalagd körning, notifieringar, historiska resultat och körningskontroll.

Om all logik placeras i scrapern blir automationslogiken och applikationslogiken allt svårare att underhålla när funktionaliteten växer.

## Övervägda alternativ

- **A.** Använd C# + Playwright for .NET för hela systemet.
- **B.** Använd Python + Playwright för hela systemet.
- **C.** Låt ASP.NET Core ansvara för applikationsorkestrering och Python + Playwright för webbläsarautomation.

## Avvägningar

**A** ger en enhetlig teknikstack och förenklar driftsättning och underhåll, men applikationslogik och automationslogik blir koncentrerade till samma teknikstack.

**B** gör webbläsarautomation enkel och direkt, men när konfiguration, schemaläggning, notifieringar och körningshantering växer behöver applikationsstrukturen organiseras mer noggrant.

**C** skapar en tydlig gräns mellan applikationslagret och automationslagret, men introducerar ytterligare komplexitet kring kommunikation mellan processer, felhantering och hantering av körmiljön.

Jag valde slutligen **C**, där ASP.NET Core hanterar applikationens arbetsflöde och Python fokuserar på webbläsarautomation.

## Potentiella risker

Externa webbplatser kan ändra sidstruktur, prisformat eller nätverksbeteende.

Python-processer kan också få timeout, avslutas oväntat eller köras parallellt. Därför innehåller systemet datavalidering, identifiering av misstänkta prisförändringar, diagnostisk loggning och kontroll av parallell körning.

## Kriterier för ett lyckat resultat

- Schemalagda jobb kan köras stabilt.
- Felaktiga data och scraper-fel kan upptäckas.
- Upprepade körningar skapar inte konflikter.
- När en webbplats förändras kan ändringarna i största möjliga utsträckning begränsas till automationslagret utan att påverka hela applikationen.
