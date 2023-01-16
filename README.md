# Installatiehandleiding

## Schrijvers

Xin Wang

## Introductie

### Achtergrondinformatie

In het schooljaar 2022/23 hebben tweedejaars studenten van Avans Informatica Breda in opdracht van het Lectoraat Smart Energie een systeem ontwikkeld, waarin gebruikers inzicht kunnen krijgen op zijn energieverbruik en opwekking. Via een dashboard krijgt een gebruiker informatie te zien over hun energie verbruik en opwekking.

Een belangrijke reden voor de ontwikkeling van dit systeem, is dat er een energietransitie van fossiele brandstof naar duurzame energie plaatsvind.
Het gevolg hiervan is dat een gebruiker energie ontvangt van meerdere bronnen. Dit systeem is bedoeld om deze energietransitie te ondersteunen.

### Dankwoord

Namens het projectgroep, willen we onze contactpersoon Arno Broeders bedanken voor onze samenwerking tijdens het project. Ook willen onze begeleiders bedanken voor het ondersteunen van het ontwikkelingsproces.

### Applicatieinformatie

Om dit systeem op te zetten, is het vereist om twee soorten applicaties te installeren:

- De webapplicatie.
- De API.

De webapplicatie is de voorkant van de website en weergeeft alle data die de applicatie ontvangt van de API.
De API zorgt ervoor dat alle data opgehaald wordt van de databases en zorgt voor de opslag, wijziging en ophalen van zelf ingevoerde data.

Dit is een installatiehandleiding voor de API, waarmee de website ernaar communiceert. De API zorgt ervoor dat alle data van het energieverbruik ophaald en afhandeld. Ook zorgt het ervoor dat gegevens zoals widgetcofiguratie en woonplaats opgeslagen, gewijzigd, verwijderd en opgehaald kan worden.
Deze handleiding bevatten de nodige informatie om de applicatie te downloaden, installeren en te openen.

Nadat de API geïnstalleerd is op het apparaat, moet de webapplicatie op het apparaat om de installatie van het gehele systeem af te ronden.

Klik op de link hieronder om naar de webapplicatie te gaan.

<a href="https://github.com/SmartEnergyOrg/Frontend#readme">Frontend</a>

## Inhoudsopgave

<ol>
  <li href="#Installation">Installatie API</li>
  <li href="#StartupApp">Opstarten API</li>
  <li href="#OpenApp">Openen van de API</li>
  <li href="#FAQ">Veelgestelde vragen</li>
</ol>

## Installatie van de API

<div id="#Installation"></div>
(Instructies voor het installeren van de api)

Om de API te installeren, zal download op github de ZIP-bestand met daarin alle code.

Pak het ZIP-bestand uit en open het project in de visual studio code.

Open cmd om vervolgens te navigeren naar de
Backend-folder
->Backend
--> Hier
----> src
----> node_modules
----> Andere bestanden.

Voer in de terminal het installatie script uit
install.sh

De installatiescript installeert vervolgens de nodige instructies uit om de API in de lucht te krijgen.

## Openen van de API

In het geval dat de applicatie correct is geïnstalleerd, open Docker ga naar (Pagina) om de url van de api url.

`Url`

<div id="#OpenApp"></div>
(De url van de API om de API te openen)

## Verdere stappen

Als de API correct geïnstalleerd, is de volgende stap om de webapplicatie te installeren.

Klik op deze link om de installatiehandleiding van de webapplicatie te openen
<a href="https://github.com/SmartEnergyOrg/Frontend#readme">Frontend</a>

## Veelgestelde vragen

<div id="#FAQ">Veelgestelde vragen</div>
(Vragen en antwoorden voor troubleshooting)
