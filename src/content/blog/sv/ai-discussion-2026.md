---
lang: sv
title: "Diskussion om AI-utveckling 2026"
description: "En diskussion om fördelarna, begränsningarna och programmerarens förändrade roll vid AI-assisterad mjukvaruutveckling år 2026"
date: 2026-09-03
readingTime: "7 min"
tags:
  - "AI-utveckling"
  - "Diskussionsanteckningar"
draft: false
---

## Frågeställning

Allt fler företag använder i dag AI för att effektivisera utvecklingsarbetet. Tidigare kunde utvecklingen av en webbplats eller ett program kräva att flera programmerare arbetade tillsammans. I dag kan en programmerare med hjälp av AI utföra delar av det arbete som tidigare krävde flera personer. Därför hör man ofta ett påstående som: En programmerare plus AI motsvarar tre programmerare. Men stämmer det verkligen?

OpenAI har dessutom genomfört ett betydligt mer extremt experiment. De började med ett tomt Git-repository och lät Codex skriva projektets kod, tester, CI-konfiguration, dokumentation, interna verktyg och mycket annat. Projektet drevs från början av 3 ingenjörer och teamet växte senare till 7 personer. Efter fem månader hade kodbasen vuxit till omkring en miljon kodrader och ungefär 1 500 Pull Requests hade slagits samman. OpenAI-teamet uppskattade att projektet tog ungefär en tiondel av den tid som motsvarande utveckling skulle ha tagit med ett mer traditionellt, människodrivet arbetssätt. Betyder detta att mjukvaruföretag i framtiden kommer att behöva färre programmerare, eller kanske till slut inga programmerare alls?

## Personliga erfarenheter

Jag har använt både gratisversionen av ChatGPT och ChatGPT Plus för att utveckla webbplatser. När jag studerade webbutveckling på Lexicon AB nämnde mina mentor också att AI-baserad snabb utveckling hade blivit allt vanligare och att många företag i allt högre grad kommer att förvänta sig att utvecklare kan arbeta med AI-verktyg. Därför har jag använt AI-stöd i nästan alla projekt jag har gjort sedan dess. Under den här processen har jag tydligt märkt att AI kan öka utvecklingshastigheten.

Tidigare, när jag stötte på ett problem som jag inte kände igen, behövde jag ofta söka på Google flera gånger:

- Vad betyder det här felmeddelandet?
- Finns det en liknande fråga på Stack Overflow?
- Var finns den officiella dokumentationen?
- Vilken lösning passar just mitt projekt?

I dag kan jag i många fall direkt ge koden, felmeddelandet och sammanhanget till en AI och låta den föreslå möjliga lösningar. För ett relativt enkelt projekt kan det med hjälp av AI vara möjligt att skapa en fungerande prototyp på en eller två dagar. Jämfört med när jag gick på universitetet och främst använde Google, Stack Overflow och officiell dokumentation går det mycket snabbare att testa nya tekniker i dag. AI-assisterad utveckling innebär däremot inte att man bara “skriver en mening och låter programmet bygga sig självt”. I min egen användning har jag också märkt att AI kan skapa många nya problem.

### Fel som uppstår på grund av kontext

När jag använde gratisversionen upplevde jag ofta att AI:n tappade bort hur den befintliga kodstrukturen såg ut. Det generera ny kod med ny arkitekturen. När den läggs in i det verkliga projektet kan den leda till bug och behöver fixa bug genom att ändra nuvarande arkitekturen. Det här problemet blir tydligare i mer komplexa projekt.

I min egen användning upplevde jag detta mer sällan med den betalda versionen. Men det blir större chans att lämna efter sig “kodskräp”. Ett projekt kan till exempel redan ha genomgått många ändringar, men AI:n kan ändå generera ny kod utifrån en äldre version av arkitekturen. Den nya koden kan se helt rimlig ut i sig själv, men när den läggs in i det verkliga projektet kan den hamna i konflikt med den nuvarande implementationen.

Som jämförelse upplevde jag att den här typen av problem förekom mer sällan när jag använde betalversionen. Däremot verkade den lättare lämna efter sig “kodskräp”. Till exempel kunde AI i senare svar fortfarande generera kod som tillhörde en äldre arkitektur som redan hade övergivits. Den goda nyheten var att koden oftast inte hamnade i konflikt med den befintliga implementationen när den lades in i projektet. Den låg helt enkelt kvar där utan att egentligen fylla någon funktion. Även om man skapar tydliga kodregler kan AI efter många svar gradvis glömma dem och börja generera kod som inte längre följer standarden. Ett konkret exempel är Tailwind CSS. AI brukade generera className-attribut där varje klass låg på en separat rad, vilket gjorde att ett enda className kunde ta upp sju eller åtta kodrader. Därför införde jag en kodregel: ett className ska skrivas på en enda rad. Efter ett antal ytterligare svar började AI ändå återgå till det gamla beteendet och generera className-attribut som återigen sträckte sig över sju eller åtta rader.

I ett litet projekt kanske resultatet bara blir att koden ser rörig ut. I ett stort projekt som ska underhållas under lång tid kan detta däremot utvecklas till teknisk skuld. Det intressanta är att OpenAI stötte på ett liknande problem i sitt eget experiment med agentbaserad utveckling. De beskrev hur Codex tenderar att återskapa mönster som redan finns i ett repository, även dåliga sådana. Under en period behövde teamet avsätta särskild tid för att städa upp det som de kallade “AI slop”. Senare valde de att inte låta ingenjörerna fortsätta städa allt manuellt. I stället kodade de in goda utvecklingsprinciper som regler och lät andra agenter regelbundet söka igenom kodbasen, hitta problem och automatiskt skapa refaktoreringar.

Det visar att AI inte bara kan öka hastigheten för att generera kod，utan kan även öka hastigheten för att skapa teknisk skuld.

## Motsvarar AI verkligen flera programmerare?

Jag tycker att det stämmer. En programmerare som är duktig på att använda AI kan i vissa fall faktiskt producera en kodmängd som tidigare hade krävt två eller tre personer.

Det verkligt intressanta av OpenAI:s experiment är att programmerarnas arbete i experimentet gradvis förändrades från att “själva skriva kod” till att “bygga en miljö där AI kan arbeta på ett tillförlitligt sätt”. Ingenjörerna lägger då inte längre största delen av sin tid på att personligen implementera varje funktion. I stället arbetar de allt mer med att:

- definiera uppgifter;
- designa systemarkitektur;
- bygga tester;
- skapa kodstandarder;
- skapa återkopplingsmekanismer;
- göra loggar och övervakning tillgängliga för AI;
- avgöra om slutresultatet uppfyller kraven;
- identifiera vilka förmågor som saknas när en agent misslyckas.

Det innebär att AI kan omvandla tydligt definierade krav till kod.

## Potentiella risker

### Beroende av AI-tjänster

När man väl har vant sig vid snabbare utveckling kan det vara svårt att helt återgå till ett traditionellt arbetssätt där all kod skrivs manuellt. Det skapar en ny typ av beroende. Om kraftfulla AI-tjänster i framtiden:

- höjer sina priser;
- ändrar användningsgränser;
- minskar tillgänglig kontext;
- flyttar viktiga funktioner till dyrare företagsabonnemang;

kan personer och företag som är mycket beroende av AI tvingas acceptera de högre kostnaderna. Mjukvaruföretag är redan beroende av molnservrar, databaser, utvecklingsramverk och tredjeparts-API:er. I framtiden kan ytterligare en typ av infrastruktur bli viktig:

> AI-inferenskapacitet.

### Programmerare kan förlora förmågan att hantera komplexa problem

Om jag i dag vill testa ett nytt ramverk kan jag direkt be AI att skapa ett enkelt projekt.Det är väldigt användbart. Tidigare kunde jag behöva lägga flera dagar eller till och med veckor på att lära mig ett ramverk innan jag upptäckte att det här ramverket passar inte alls mitt projektNu går det att först låta AI skapa en prototyp och snabbt avgöra om tekniken är lämplig. Men här finns också en fälla att kunna få AI att skriva något betyder inte att man själv kan det.Det är lätt för en programmerare att börja tänka:

“Jag har arbetat med React.”

“Jag har arbetat med Docker.”

“Jag har använt den här databasen.”

I verkligheten kanske AI:n skrev större delen av koden medan programmeraren aldrig riktigt förstod varför den fungerade.I ett enkelt projekt behöver det inte vara ett problem. Problemet uppstår när något komplicerat går fel.Om programmeraren inte förstår systemet som AI:n har skrivit blir det svårt att avgöra:

- varför AI:n har fel;
- i vilket lager problemet faktiskt finns;
- vilken ändring som kan påverka en annan funktion;
- om den lösning som AI:n föreslår bara döljer symptomen.

Därför tror jag att en av framtidens viktigaste färdigheter blir:

> Att kunna avgöra om koden som AI har skrivit faktiskt är korrekt.

### AI kan vara mycket självsäker och samtidigt ha fel

Svar som genereras av AI är inte alltid korrekta. I *Why Language Models Hallucinate* diskuterar OpenAI ett intressant problem: många befintliga tränings- och utvärderingssystem kan i vissa situationer belöna modeller för att “gissa” i stället för att belöna dem för att erkänna osäkerhet. Anta att en modell bara har 40 procents sannolikhet att känna till rätt svar.

Om:

- Rätt svar: 1 poäng
- Fel svar: 0 poäng
- “Jag vet inte”: 0 poäng

är det rationellt för modellen att gissa. Att svara “jag vet inte” garanterar noll poäng, medan en gissning åtminstone ger en möjlighet att få en poäng. Detta kan också bli farligt inom mjukvaruutveckling. AI:n kan då ge en mycket detaljerad och övertygande förklaring. Men att något “låter korrekt” och att det “är korrekt” är två helt olika saker. Om programmeraren inte har tillräcklig kunskap för att bedöma svaret kan projektet fortsätta ändras i helt fel riktning.

## Avvägningar

Trots dessa risker tror jag fortfarande att de flesta företag har väldigt få skäl att helt avstå från AI-assisterad utveckling.

Anledningen är enkel:

> Tid är en kostnad, och snabbhet till marknaden är i sig en konkurrensfördel.

Anta att två företag upptäcker samma marknadsmöjlighet.

Företag A tar sex månader på sig att bygga sin produkt.

Företag B använder AI och kan lansera en fungerande version på två månader.

Även om kodkvaliteten hos företag B inte är lika elegant kan företaget ändå få ett försprång genom att:

- få användare tidigare;
- samla in feedback tidigare;
- validera sin affärsmodell;
- justera produktens riktning;
- ta marknadsandelar.

I en sådan situation kan företag välja att acceptera många risker med låg sannolikhet som kanske inte visar sig förrän långt senare.Det betyder inte att riskerna inte finns. Det betyder att företag tvingas göra avvägningar. 

## Sammanfattning

AI-assisterad utveckling är verkligen snabb. Även när man räknar in tiden som krävs för att rätta buggar, förklara krav igen och städa upp felaktig kod är utveckling med AI i många fall fortfarande snabbare än utveckling utan AI. Marknaden i framtiden kan behöva färre personer vars enda uppgift är att skriva kod, samtidigt som efterfrågan ökar på ingenjörer som kan definiera problem, designa system, bedöma resultat och styra AI.

OpenAI:s experiment visar egentligen också en sådan framtid. Det handlade inte om att sju personer utan kunskap om mjukvaruutveckling bygga ett program i 5 månader. I stället lade ingenjörerna mycket arbete på att designa systemet. Med andra ord, AI skrev koden, men människor designade systemet som gjorde det möjligt för AI att fortsätta skriva kod på ett tillförlitligt sätt.

I framtiden kan en viktig förmåga i allt högre grad bli:

> Jag kan få AI att kontinuerligt och tillförlitligt producera mjukvara av hög kvalitet, och jag vet när jag inte bör lita på den.

## Referenser

- OpenAI, *Why Language Models Hallucinate*  
  https://openai.com/index/why-language-models-hallucinate/

- OpenAI, *Harness engineering: leveraging Codex in an agent-first world*  
  https://openai.com/index/harness-engineering/