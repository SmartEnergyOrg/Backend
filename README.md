# Installatiehandleiding API

## Schrijvers

Geschreven door: Xin Wang

Applicatie ontwikkeld door:

- Xin
- Silvester
- Marcello
- Jens
- Mick
- Joost

## Introductie

In het schooljaar 2022/23 hebben tweedejaars studenten van Avans Informatica Breda in opdracht van het Lectoraat Smart Energie een systeem ontwikkeld, waarin gebruikers inzicht kunnen krijgen op zijn energieverbruik en opwekking. Via een dashboard krijgt een gebruiker informatie te zien over hun energie verbruik en opwekking.

### Achtergrondinformatie

Een belangrijke reden voor de ontwikkeling van dit systeem, is dat er een energietransitie van fossiele brandstof naar duurzame energie plaatsvind.
Het gevolg hiervan is dat een gebruiker energie ontvangt van meerdere bronnen. Dit systeem is bedoeld om deze energietransitie te ondersteunen.

### Dankwoord

Namens het projectgroep, willen we onze contactpersoon Arno Broeders bedanken voor onze samenwerking tijdens het project. Ook willen onze begeleiders bedanken voor het ondersteunen van het ontwikkelingsproces.

## Applicatieinformatie

Om dit systeem op te zetten, is het vereist om twee soorten applicaties te installeren:

- <a href="https://github.com/SmartEnergyOrg/Frontend#readme">De webapplicatie</a>
- De API. (Huidige pagina)

De webapplicatie is de voorkant van de website en weergeeft alle data die de applicatie ontvangt van de API.
De API zorgt ervoor dat alle data opgehaald wordt van de databases en zorgt voor de opslag, wijziging en ophalen van zelf ingevoerde data.

Dit is een installatiehandleiding voor de API, waarmee de website ernaar communiceert. De API zorgt ervoor dat alle data van het energieverbruik ophaald en afhandeld. Ook zorgt het ervoor dat gegevens zoals widgetcofiguratie en woonplaats opgeslagen, gewijzigd, verwijderd en opgehaald kan worden.
Deze handleiding bevatten de nodige informatie om de applicatie te downloaden, installeren en te openen.

## Inhoudsopgave

<ol>
  <li href="#Installation">Installatie API</li>
  <li href="#OpenApp">Openen van de API</li>
  <li href="#VerdereStappen">Verdere stappen</li>
</ol>

## Installatie van de API

<div id="#Installation"></div>

Om de API te installeren, download het ZIP-bestand met daarin de code van de API.

Open vervolgens het zip-bestand uit.

Open cmd of terminal om vervolgens te navigeren naar de Backend folder

`(root) -> Backend -> Backend`

Navigeer vanuit de root folder naar de Backend folder via de volgende commando

`cd ./Backend/Backend`

Of als men vanuit de zip-folder de terminal opent

`cd ./Backend`

Binnen de Backend folder, voer in de terminal de volgende commando uit om het installatiescript uit te voeren.

`./install.h`

Deze commando installeert docker en de bijbehorende docker container en packages.

Als het installatiescript zonder fouten uitgevoerd is, is mogelijk om de API te gebruiken.

### Opstarten van de API

<div id="#OpenApp"></div>

In het geval dat de applicatie correct is geïnstalleerd. Open de onderstaande link om de API te bedienen.

`http://localhost:12345/api`

## Verdere stappen

<div id="#VerdereStappen"></div>
Als de API correct geïnstalleerd, is de volgende stap om de webapplicatie te installeren.

Klik op deze link om de installatiehandleiding van de webapplicatie te openen
<a href="https://github.com/SmartEnergyOrg/Frontend#readme">Frontend</a>

## Veelgestelde vragen

<div id="#FAQ">Veelgestelde vragen</div>
(Vragen en antwoorden voor troubleshooting)
