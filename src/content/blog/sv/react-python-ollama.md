---
lang: sv
title: "Bygga en AI-applikation med React, Python och Ollama"
description: "Hur jag separerade frontend, AI-tjänsten och den lokala modellmiljön samtidigt som tydliga systemgränser behölls för framtida vidareutveckling."
date: 2026-09-02
readingTime: "6 min"
tags:
  - "React"
  - "Python"
  - "Ollama"
  - "AI"
draft: false
---

## Problemet

Applikationen behöver låta React-frontend kommunicera med en språkmodell utan att modellanrop, prompts och AI-relaterad logik placeras direkt i frontend.

Det behövs också ett sätt att köra modeller som passar utvecklingsfasen och gör det enkelt att snabbt testa olika prompts och interaktionsmönster.

## Övervägda alternativ

- **A.** Låt React-frontend anropa modelltjänsten direkt.
- **B.** Använd Python som AI-tjänstelager och anslut till ett hostat språkmodell-API.
- **C.** Använd Python som AI-tjänstelager och kör samtidigt språkmodeller lokalt via Ollama.

## Avvägningar

**A** ger den enklaste arkitekturen, men frontend blir direkt beroende av modellens gränssnitt. AI-logik och gränssnittslogik riskerar att kopplas för tätt samman och modellrelaterad konfiguration blir svårare att hålla privat.

**B** behåller en tydlig gräns mellan frontend och backend och kan ge mer stabil modellåtkomst genom en hostad tjänst, men utveckling och testning blir beroende av ett externt API.

**C** separerar också frontend från AI-logiken och gör det samtidigt möjligt att snabbt testa prompts, modeller och interaktionsflöden lokalt. Nackdelen är att en lokal körmiljö krävs och att modellernas prestanda begränsas av den lokala hårdvaran.

Jag valde slutligen **C** under utvecklingsfasen och använde React + Python + Ollama för att behålla flexibiliteten i modellexperimenten utan att göra frontend direkt beroende av en specifik modell.

## Potentiella risker

Lokala modellers prestanda och svarstid beror på den enhet de körs på, och olika modeller har olika krav på minne och beräkningsresurser.

Om systemet senare byter till en hostad modell eller en annan leverantör kan modellgränssnitt och svarsformat förändras. Därför bör dessa detaljer inte spridas till frontend.

## Kriterier för ett lyckat resultat

- React-frontend ansvarar endast för användarinteraktionen och är inte direkt beroende av en specifik språkmodell.
- Python-tjänsten hanterar prompts, modellanrop och omvandling av svar självständigt.
- Under utvecklingen gör Ollama det möjligt att snabbt byta mellan och testa lokala modeller.
- Ett framtida byte till en annan modell eller hostad tjänst ska inte kräva omfattande ändringar i frontend.
