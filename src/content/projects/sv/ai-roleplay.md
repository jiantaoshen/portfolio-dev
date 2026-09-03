---
lang: sv
title: "AI Roleplay"
description: "En AI-baserad rollspelschatt byggd med React, ASP.NET Core, FastAPI och Ollama, med stöd för flera karaktärer, strömmande svar, kontext över flera meddelanden, strukturerade karaktärsprompter och konversationssammanfattning."
category: "AI-applikationsutveckling"
status: "Under utveckling"
order: 4
featured: false
technologies:
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "ASP.NET Core"
  - "C#"
  - "Python"
  - "FastAPI"
  - "Ollama"
  - "Qwen3"
highlights:
  - "Chattgränssnitt byggt med React och TypeScript"
  - "ASP.NET Core används som huvudbackend och proxy mot AI-tjänsten"
  - "FastAPI ansvarar för karaktärsprompter, kontext och AI-logik"
  - "Lokal qwen3:4b-modell körs via Ollama"
  - "Strömmande svar genom hela applikationskedjan"
  - "Flera karaktärer med dynamisk inläsning"
  - "Stöd för Stop Generation och Regenerate"
  - "Conversation Summary för komprimering av långa konversationer"
  - "Refaktorering av frontend-komponenter och backendens service-lager"
draft: false
---

## Projektöversikt

AI Roleplay är ett experimentellt projekt för att utforska arkitekturen bakom en komplett AI-baserad karaktärschatt. Projektet använder React i frontend, ASP.NET Core som huvudbackend, FastAPI som separat AI-tjänst och Ollama som lokal modellmiljö. Den nuvarande versionen har färdigställt kärnan i AI Roleplay-MVP:n och fokuserar på tydliga skillnader mellan karaktärer, strömmande konversationer, kontext över flera meddelanden och sammanfattning av längre konversationer.

## Problemet

Många AI-chattdemonstrationer stannar vid att skicka en prompt till en språkmodell och visa svaret. De saknar ofta en riktig applikationsarkitektur, strukturerad hantering av karaktärer, kontextkontroll och tydliga gränser mellan olika tjänster. När konversationer blir längre kan även problem med stora kontextfönster, inkonsekvent karaktärsbeteende och otydlig ansvarsfördelning uppstå.

## Lösningen

Projektet delar upp ansvaret i tre applikationslager. React hanterar användargränssnitt, interaktion och rendering av strömmande svar. ASP.NET Core tillhandahåller applikationens huvudsakliga API och fungerar som länken mellan frontend och AI-tjänsten. FastAPI ansvarar för Character Engine, Prompt Builder, konversationskontext, sammanfattning och modellintegration. Ollama används som lokal LLM-runtime. Denna arkitektur håller AI-logik separerad från produktlogik och gör det möjligt att senare lägga till persistens, långtidsminne, autentisering och produktionsdriftsättning.

## Funktioner

### Chatt med flera karaktärer

Karaktärer hanteras genom strukturerad konfiguration. React laddar tillgängliga karaktärer dynamiskt och skickar chattförfrågningar baserat på characterId.

### Character Engine

Karaktärskonfigurationen innehåller bakgrund, personlighet, talstil, scenario, relation, svarsregler och exempelkonversationer för att skapa tydligt differentierade personligheter.

### Strömmande chatt

Svar från Ollama strömmas genom FastAPI StreamingResponse och ASP.NET Core-proxyn innan de renderas i realtid med React ReadableStream.

### Kontext över flera meddelanden

React behåller den aktuella konversationshistoriken och skickar den vid varje generering så att modellen kan fortsätta dialogen utifrån tidigare meddelanden.

### Conversation Summary

När konversationen blir längre än det aktuella meddelandefönstret sammanfattar FastAPI äldre meddelanden och kombinerar sammanfattningen med de senaste 20 meddelandena.

### Stop och Regenerate

Användaren kan avbryta en pågående generering med AbortController eller generera om det senaste AI-svaret utan att förlora den aktuella kontexten.

## Utmaningar & beslut

### Konsekvent karaktärsbeteende

Karaktärskonfiguration, promptkonstruktion och exempelkonversationer måste skapa tydliga personligheter utan att modellen mekaniskt upprepar exempel eller hittar på gemensamma minnen.

### Långa konversationer

Att skicka hela konversationshistoriken blir ineffektivt när chatten växer, därför används ett fönster med de senaste meddelandena tillsammans med Conversation Summary.

### Streamingarkitektur

AI-svaret måste fortsätta vara strömmande genom Ollama, FastAPI, ASP.NET Core och React utan att buffras till ett komplett svar i något mellanlager.

### Ansvarsfördelning

Projektet separerar successivt frontendens UI-logik, ASP.NET Core-baserad produktlogik och Python-baserad AI-logik för att undvika att enskilda komponenter eller controllers får för stort ansvar.

## Driftsättning

Projektet utvecklas och körs för närvarande lokalt. React, ASP.NET Core och FastAPI kan startas tillsammans med dev.ps1, medan AI-modellen körs lokalt via Ollama. PostgreSQL och produktionsdriftsättning har ännu inte lagts till.

## Lärdomar

- Bygga en komplett AI-kedja med React → ASP.NET Core → FastAPI → Ollama
- Implementera strömmande AI-svar genom flera tjänstelager
- Designa strukturerade karaktärsprompter och tydligt differentierade personligheter
- Hantera längre konversationer med Conversation Summary
- Använda AbortController för att avbryta AI-generering
- Refaktorera en React-applikation till komponenter, services och gemensamma typer
- Refaktorera ASP.NET Core från direkt controller-logik till Controller → Service-arkitektur
- Designa AI-integration som en del av en komplett mjukvaruapplikation istället för som en fristående modelldemo

## Framtida förbättringar

- Spara Conversations och Messages permanent med PostgreSQL
- Spara och uppdatera Conversation Summary inkrementellt
- Lägga till konversationshistorik och möjlighet att växla mellan konversationer
- Bygga långtidsminne med pgvector
- Lägga till registrering, autentisering och ägarskap av konversationer
- Lägga till funktioner för att skapa, redigera och upptäcka karaktärer
- Lägga till användningsmätning, credits och prenumerationer
- Introducera Docker och CI/CD för produktionsdriftsättning
