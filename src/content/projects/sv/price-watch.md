---
lang: sv
title: "Price Watch"
description: "En local-first-applikation för prisbevakning byggd med React, TypeScript, ASP.NET Core, Python och Playwright för att automatiskt följa produktpriser, prishistorik, målpriser och resultat från scraper-körningar."
category: "Lokal automationsutveckling"
status: "Klar"
order: 2
featured: true
featuredOrder: 2
technologies:
  - "React"
  - "TypeScript"
  - "Vite"
  - "Tailwind CSS"
  - "ASP.NET Core"
  - ".NET 10"
  - "Python"
  - "Playwright"
  - "Pydantic"
  - "Windows Task Scheduler"
highlights:
  - "Dashboard för prisbevakning byggd med React och TypeScript"
  - "ASP.NET Core som tillhandahåller ett gemensamt lokalt REST-API"
  - "Automatisk laddning och analys av produktsidor med Python och Playwright"
  - "JSON-LD som primär priskälla med en försiktig DOM fallback"
  - "Stöd för produkthantering, målpriser, prishistorik och produktdetaljer"
  - "Identifiering av misstänkta prisförändringar för att minska risken för felaktiga priser"
  - "E-postnotifieringar med kontroll av duplicerade aviseringar"
  - "Automatiska priskontroller genom Windows Task Scheduler"
  - "Lokal JSON-lagring för kördata, historik och konfiguration"
links:
  github: "https://github.com/jiantaoshen/PriceWatch"
draft: false
---

## Projektöversikt

Price Watch är ett local-first-system för prisbevakning som automatiskt kontrollerar produktpriser på olika e-handelssajter. Applikationen består av ett frontend byggt med React och TypeScript, ett lokalt ASP.NET Core-API, en scraping-tjänst med Python och Playwright samt ett lokalt JSON-baserat datalager. Användaren kan hantera bevakade produkter, ange målpriser, se aktuella och historiska priser samt köra priskontroller manuellt eller automatiskt.

## Problemet

Produktsidor på olika e-handelssajter följer inte en gemensam struktur. Priser kan komma från JSON-LD, dynamiskt renderade DOM-element eller annat innehåll på sidan, samtidigt som webbplatser kan ändra produktnamn, URL-sluggar eller sidstruktur. Att enbart förlita sig på fasta CSS-selektorer eller rå sidtext kan därför leda till misslyckad scraping eller felaktiga priser. Ett komplett prisbevakningssystem behöver dessutom hantera historik, avvikande priser, schemalagda körningar och notifieringar.

## Lösningen

Projektet separerar frontend, API, scraping och databehandling i tydliga ansvarsområden. React-frontend kommunicerar med ett ASP.NET Core-API för att hantera produkter, starta scraping-jobb och läsa historiska data. Python använder Playwright för att ladda produktsidor och extraherar priser genom en utbyggbar scraper- och strategy-arkitektur. Systemet prioriterar Schema.org JSON-LD och använder endast en försiktig DOM fallback när strukturerad data saknas. Resultaten valideras innan de skrivs till lokala JSON-filer tillsammans med historik, körstatus och notifieringsstatus.

## Funktioner

### Produktbevakning

Besöker automatiskt konfigurerade produktsidor, hämtar aktuella priser och jämför dem med målpriser och tidigare priser.

### Prisextraktion med flera strategier

Prioriterar Schema.org JSON-LD och använder en försiktig DOM fallback när strukturerad data saknas, vilket förbättrar kompatibiliteten mellan olika webbplatser.

### Produkthantering

Gör det möjligt att lägga till, uppdatera och ta bort bevakade produkter via React-gränssnittet och ASP.NET Core-API, där produkt-ID genereras automatiskt av backend.

### Prishistorik

Sparar scraping-resultat som lokal historik och visar prisförändringar i dashboarden och på respektive produkts detaljsida.

### Målpriser

Gör det möjligt att ange ett målpris för varje produkt och identifierar automatiskt när det aktuella priset når målet.

### Identifiering av misstänkta priser

Markerar ovanligt stora prisförändringar som suspicious för att minska risken att delbetalningar, fraktkostnader eller annan felaktig data accepteras som produktpris.

### Körstatus

Registrerar resultatet från varje scraper-körning och visar hälsostatus, lyckade resultat, fel och avvikande resultat i applikationen.

### E-postnotifieringar

Skickar e-postnotifieringar när definierade prisvillkor uppfylls och sparar notifieringsstatus för att minska duplicerade aviseringar.

### Automatisk schemaläggning

Använder Windows Task Scheduler för återkommande priskontroller samtidigt som manuell körning via Run Now stöds.

## Utmaningar & beslut

### Olika prisstrukturer mellan webbplatser

Olika e-handelssajter använder olika JSON-LD-format, produktidentifierare och DOM-strukturer, vilket innebär att scrapern måste balansera kompatibilitet med tillförlitlighet.

### Undvika felaktiga priser

Produktsidor kan innehålla ordinarie priser, delbetalningspriser, fraktkostnader och priser för relaterade produkter, vilket kräver att DOM fallback är försiktig och använder kontext och tillförlitlighetsbedömning.

### Produktidentifiering

Webbplatser kan ändra produktnamn eller URL-sluggar, vilket innebär att JSON-LD-matchning inte enbart kan baseras på exakt URL utan även behöver använda stabila identifierare som productID, SKU och MPN.

### Tydliga lokala ansvarsområden

Projektet behöver behålla tydliga gränser mellan React, ASP.NET Core, Python-scrapern och lokala datafiler samtidigt som alla delar fungerar tillsammans som en komplett applikation.

## Driftsättning

Price Watch använder en local-first-arkitektur. React-applikationen serveras genom ASP.NET Core, det lokala API:t hanterar applikationsfunktioner och scraper-anrop, Python- och Playwright-scrapern körs i en Windows-miljö och kördata samt historik lagras i lokala JSON-filer. Automatiska körningar hanteras genom Windows Task Scheduler.

## Lärdomar

- Bygga en datadriven dashboard med React och TypeScript
- Designa ett lokalt REST-API med ASP.NET Core
- Koppla samman ASP.NET Core med automatiseringsuppgifter i Python
- Hämta dynamiskt webbinnehåll med Playwright
- Extrahera produktpriser från Schema.org JSON-LD
- Designa lagerbaserade scraping-strategier med JSON-LD och DOM fallback
- Hantera produktidentifiering genom URL, SKU, MPN och productID
- Designa prisvalidering, avvikelsedetektering och körstatus
- Använda lokala JSON-filer som ett lättviktigt persistenslager
- Bygga lokala automationsflöden med Windows Task Scheduler och PowerShell
