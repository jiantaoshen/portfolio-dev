---
lang: sv
title: "PriceWatch: prisjämförelse mellan flera webbplatser, mängdnormalisering och hantering av bundles"
description: "Hur PriceWatch hanterar enstaka varor, flerpack och bundles när användaren själv väljer flera shoppingwebbplatser, med avvägning mellan inmatningsarbete, jämförbarhet och flexibilitet i aviseringar."
date: 2026-09-02
readingTime: "5 min"
tags:
  - "PriceWatch"
  - "Price Comparison"
  - "UX"
  - "Product Design"
draft: false
---

## Problemet

PriceWatch söker inte automatiskt efter produkter på internet och avgör inte heller om produkter på olika webbplatser är samma vara. Användaren definierar själv produkten som ska bevakas, inklusive exempelvis namn och specifikation, och väljer aktivt en eller flera shoppingwebbplatser. Dessa webbplatser kan därför betraktas som de erbjudanden som användaren själv vill jämföra.

Det verkliga problemet är att samma användardefinierade produkt kan säljas i olika mängder på olika webbplatser. En webbplats kan till exempel sälja en enhet för €20 medan en annan säljer ett trepack för €45. Om endast det visade totalpriset jämförs ser €20 billigare ut, trots att trepacket har ett enhetspris på €15. PriceWatch behöver därför göra priserna jämförbara utan att skapa för mycket extra arbete vid registreringen.

Vissa webbplatser kan också sälja bundles som innehåller tillbehör, gåvor eller andra produkter. Ett bundle-erbjudande är inte helt likvärdigt med ett vanligt erbjudande för en enskild produkt. Om det tvingas in i beräkningen av enhetspris och lägsta pris kan resultatet därför bli missvisande.

## Övervägda alternativ

- **A.** Registrera endast det aktuella totalpriset för varje webbplats och jämför de visade priserna direkt, utan att hantera olika mängder eller bundles.
- **B.** Låt användaren ange antal för varje webbplats. PriceWatch beräknar Unit Price från aktuellt pris och antal och visar både Lowest Total Price och Lowest Unit Price. Bundles hanteras inte separat.
- **C.** Bygg vidare på B, men låt bundles inte delta i den vanliga prisrankingen. Om ett bundle är något användaren uttryckligen vill följa över tid skapas ett separat produkt-Watch.
- **D.** Bygg vidare på B, men om användaren främst bryr sig om originalprodukten och endast vill få en avisering när ett bundle når ett visst pris, kan en separat alert läggas till under samma Watch för bundle-erbjudandets totalpris.

## Avvägningar

**A** ger det enklaste skapandeflödet, men prisjämförelsen blir lätt missvisande när enstaka produkter och flerpack blandas. Lösningen passar därför främst när alla erbjudanden använder samma mängd.

**B** gör erbjudandena inom samma Watch mer jämförbara. Användaren behöver bara ange ett antal för varje webbplats. En vanlig singelprodukt kan använda antal = 1, medan flerpack transparent kan visa beräkningen "totalpris ÷ antal = enhetspris". Nackdelen är en liten ökning av mängden information som måste anges. Bundles skulle fortfarande delta i den vanliga prisrankingen och kan därför ge missvisande resultat.

**C** behandlar bundles som separata produkt-Watches. Det håller datamodellen och prishistoriken mycket tydliga, men användaren måste skapa ytterligare ett Watch.

**D** passar bättre när ett bundle endast är ett sekundärt köptillfälle. En användare kan till exempel främst bevaka en telefon men också vara villig att köpa ett paket med "telefon + laddare" om priset sjunker under 5000 kr. I ett sådant fall behöver bundle-erbjudandet inte ha en fullständig prisjämförelse och kan i stället använda en separat alert utan att påverka rankingen i det ursprungliga Watch-et.

Jag valde slutligen **C**. Målet med PriceWatch är att hjälpa användare jämföra priser mellan olika webbplatser, inte att automatiskt avgöra om produkter är likvärdiga. Värdet av ett bundle är subjektivt. Om jag redan har en laddare kan laddaren i ett paket med telefon och laddare i praktiken ha värdet 0 för mig, medan en användare som faktiskt behöver en laddare kan värdera exakt samma bundle annorlunda. Genom att behandla bundles som separata produkt-Watches hålls datamodellen och prishistoriken tydliga samtidigt som användaren själv får avgöra om ett bundle är värt att bevaka.

## Potentiella risker

- Användaren kan ange fel antal. En webbplats kan exempelvis sälja ett 24-pack medan användaren anger 12, vilket ger ett felaktigt enhetspris. Gränssnittet bör därför tydligt visa beräkningsunderlaget och göra antalet enkelt att ändra.
- Webbplatsens försäljningsmängd kan förändras över tid. Ett spårat URL kan vara ett 12-pack när Watch-et skapas och senare ändras till ett 10-pack. Om det sparade antalet inte uppdateras kan jämförelsen bli felaktig.
- Lägsta enhetspris kan göra att användaren förbiser den faktiska utgiften. Ett 12-pack kan ha lägst enhetspris men samtidigt kräva en betydligt högre total betalning. Gränssnittet måste därför visa enhetspris, antal och totalpris tillsammans.
- Användaren kan lägga olika modeller, kapaciteter eller versioner i samma Watch. PriceWatch litar medvetet på den jämförelserelation som användaren definierar och behöver därför inte automatisk produktmatchning, men gränssnittet bör tydligt visa användarens produktspecifikation och informationen för varje webbplats så att jämförelsen kan kontrolleras.
- Om för många fält krävs när ett Watch skapas kan slutförandegraden minska. Strukturerad information som antal bör därför hållas enkel och endast visas när den behövs för prisnormalisering.

## Kriterier för ett lyckat resultat

- Användaren kan skapa ett Watch med flera shoppingwebbplatser på kort tid och förstå hur antal och enhetspris används i jämförelsen.
- När användaren har angett korrekta priser och mängder förblir beräkningen av enhetspris, lägsta totalpris och lägsta enhetspris 100% korrekt.
- Jämförelsesidan visar totalpris, inköpsmängd och enhetspris tydligt tillsammans, så att användaren inte blandar ihop lägsta enhetspris med lägsta faktiska betalning.
- Användaren kan lägga till anteckningar i ett Watch beroende på hur viktigt eller relevant ett bundle är, vilket gör det lättare att skilja mellan olika produkter eller köpformer.
- Antal, totalpris, villkor för aviseringar och anteckningar kan enkelt uppdateras om shoppingwebbplatsens försäljningsformat förändras.
- Den övergripande lösningen behåller en rimlig balans mellan enkel skapandeprocess, korrekt prisjämförelse mellan webbplatser och flexibilitet för olika köpformer.
