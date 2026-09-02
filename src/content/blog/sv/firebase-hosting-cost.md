---
lang: sv
title: "Firebase Hosting: gratisnivå, användningsbaserad debitering och kostnadsrisk"
description: "Anteckningar om hur jag vägde tillgänglighet, användningsbaserad debitering och risken för oväntade kostnader när jag driftsatte en personlig webbplats med Firebase Hosting."
date: 2026-09-02
readingTime: "4 min"
tags:
  - "Firebase"
  - "Hosting"
  - "Deployment"
  - "Cost"
draft: false
---

## Problemet

Trafiken till en personlig portfolio är vanligtvis låg, så gratisnivån i Firebase Hosting är normalt tillräcklig. Efter en uppgradering till Blaze kan användning som överstiger gratisnivån däremot fortsätta generera kostnader. Jag är mindre orolig för den lilla kostnaden från normal trafik än för oväntade fakturor som kan orsakas av onormal trafik, felaktig konfiguration eller skadliga förfrågningar, därför behövde jag väga tillgänglighet mot förutsägbara kostnader.

## Alternativ

- **A.** Behålla gratisplanen Spark och acceptera tillfällig otillgänglighet om gränserna för gratis användning nås.
- **B.** Uppgradera till Blaze och övervaka kostnader med Budget Alerts.
- **C.** Använda Blaze och samtidigt lägga till autentisering, rate limiting, resursbegränsningar och övervakning för dynamiska tjänster.
- **D.** Separera den statiska Portfolion från framtida Backend- eller AI-tjänster med högre kostnadsrisk genom att använda olika projekt.

## Avvägningar

**A** ger lägst tillgänglighetstak men gör kostnaden mest förutsägbar. För den nuvarande statiska Portfolion accepterar jag hellre tillfällig otillgänglighet i ett extremfall än oförutsägbara användningsbaserade kostnader.

**B** gör det möjligt för Hosting att fortsätta fungera efter att gratisnivån har överskridits, men Budget Alerts är bara aviseringar och inte hårda kostnadstak. De kan därför inte helt förhindra oväntade kostnader.

**C** passar bättre för applikationer som faktiskt behöver Cloud Functions, Cloud Run, databaser eller AI-tjänster. En enda förfrågan till en dynamisk tjänst kan innebära kostnader för nätverk, beräkning och tredjeparts-API:er, vilket kräver ytterligare skydd på applikationsnivå.

**D** ger bättre kostnadsisolering genom att den publika Portfolion och dyrare backend-tjänster får separata resurs- och budgetgränser.

För det nuvarande projektet valde jag att stanna kvar på Spark. Portfolion behöver ännu inte de funktioner som motiverar Blaze, därför finns det liten anledning att ta på sig risken med användningsbaserad debitering innan det är nödvändigt.

## Risker

- Om gränserna för gratis användning i Spark nås kan webbplatsen tillfälligt bli otillgänglig.
- Om projektet senare uppgraderas till Blaze kan onormal trafik redan ha genererat extra kostnader innan en Budget Alert skickas, eftersom aviseringarna inte fungerar som kostnadstak i realtid.
- Stora statiska filer, felaktig cache-konfiguration eller ovanligt många förfrågningar kan öka mängden dataöverföring.
- Om Backend, Database eller AI-API:er läggs till senare blir kostnadsrisken betydligt högre än för enbart statisk Hosting. Billing-inställningar bör därför kombineras med autentisering, rate limiting, resursbegränsningar och övervakning.

## Framgångskriterier

- Portfolion ligger inom gratisnivån vid normal trafik.
- Den nuvarande driftsättningen kräver inte användningsbaserad debitering för funktioner som ännu inte behövs.
- Om Blaze införs senare går det tydligt att övervaka resursanvändning och kostnadsförändringar, samtidigt som dyrare tjänster har lämpliga begränsningar.
- Den statiska Portfolion och framtida Backend- eller AI-workloads med högre kostnad kan isoleras från varandra.
- Driftsättningen har en rimlig balans mellan tillgänglighet, underhållskomplexitet och kostnadsrisk i värsta fall.
