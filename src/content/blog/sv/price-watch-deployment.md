---
lang: sv
title: "Driftsättning av scraper: molnet eller lokal körning"
description: "Varför jag gick från Google Cloud Run till lokal körning, inklusive testresultaten och avvägningarna bakom beslutet."
date: 2026-09-02
readingTime: "4 min"
tags:
  - "Deployment"
  - "Google Cloud"
  - "Automation"
  - "Windows"
draft: false
---

## Problemet

Prisövervakningen behöver köras automatiskt enligt ett schema. Jag ville från början att scrapern skulle kunna köras oberoende av min lokala dator och övervägde därför först en molnbaserad driftsättning.

## Försök och resultat

Till en början driftsatte jag scrapern med Google Cloud Run + Cloud Scheduler, där Scheduler skulle starta priskontroller med jämna mellanrum.

Själva driftsättningen fungerade korrekt, men i praktiska tester misslyckades inläsningen av samtliga målwebbsidor.

Samma scraper fungerade däremot korrekt från mitt lokala nätverk. Det tydde på att problemet troligen var kopplat till körmiljön och att vissa målwebbplatser kan begränsa trafik från molndatacenter.

## Övervägda alternativ

- **A.** Fortsätta använda Cloud Run och undersöka andra sätt att hantera åtkomstbegränsningarna.
- **B.** Testa andra molnbaserade körmiljöer.
- **C.** Avstå från molnkörning och köra scrapern lokalt.

## Avvägningar

**A** och **B** skulle kunna lösa problemet, men skulle kräva ytterligare tid för att undersöka nätverksmiljöer och webbplatsernas begränsningar. Även om problemet kunde lösas tillfälligt finns ingen garanti för att målwebbplatserna inte ändrar sina begränsningar igen.

Projektets mål är att övervaka priser på ett tillförlitligt sätt, inte att lösa webbplatsernas begränsningar för trafik från molndatacenter. Därför var nyttan av att lägga betydligt mer tid på problemet begränsad.

**C** har mindre avancerad infrastruktur än en molnbaserad lösning, men är enkel och praktiska tester visade att den lokala miljön kunde komma åt målwebbplatserna på ett stabilt sätt.

Jag valde därför slutligen **C**.

## Potentiella risker

- Schemalagda uppgifter kan inte köras när den lokala datorn är avstängd, i viloläge eller saknar nätverksanslutning.
- Scraperns anropsfrekvens behöver också kontrolleras för att undvika upprepade förfrågningar till målwebbplatser inom korta tidsperioder.

## Kriterier för ett lyckat resultat

- Scrapern körs enligt schema med Windows Task Scheduler samtidigt som applikationen behåller möjligheten att starta en manuell priskontroll.
- Vid en normal anropsfrekvens kan målwebbsidorna läsas kontinuerligt och hela prisövervakningsflödet fungerar utan att vara beroende av ytterligare molnbaserade åtkomstlösningar.
