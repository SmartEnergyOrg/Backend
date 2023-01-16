# 1. Installatiehandleiding API
![120393305](https://user-images.githubusercontent.com/38434237/212727884-4746ef79-9726-4618-8a16-37bde6750281.png)


### Schrijvers

Geschreven door: Xin Wang

Applicatie ontwikkeld door:

- Xin
- Silvester
- Marcello
- Jens
- Mick
- Joost

## Inhoudsopgave

<ol>
  <li ><a href="#Introduction">Introductie</a></li>
  <li ><a href="#Installation">Installatie</a></li>
  <li><a href="#OpenApp">Openen van de API</a></li>
  <li><a href="#VerdereStappen">Verdere stappen</a></li>
</ol>

## Introductie

<div id="#Introduction"></div>

In het schooljaar 2022/23 hebben tweedejaars studenten van Avans Informatica Breda in opdracht van het Lectoraat Smart Energie een systeem ontwikkeld, waarin gebruikers inzicht kunnen krijgen op zijn energieverbruik en opwekking. Via een dashboard krijgt een gebruiker informatie te zien over hun energie verbruik en opwekking.

### Achtergrondinformatie

Een belangrijke reden voor de ontwikkeling van dit systeem, is dat er een energietransitie van fossiele brandstof naar duurzame energie plaatsvind.
Het gevolg hiervan is dat een gebruiker energie ontvangt van meerdere bronnen. Dit systeem is bedoeld om deze energietransitie te ondersteunen.

### Dankwoord

Namens het projectgroep, willen we onze contactpersoon Arno Broeders bedanken voor onze samenwerking tijdens het project. Ook willen onze begeleiders bedanken voor het ondersteunen van het ontwikkelingsproces.

## Applicatieinformatie

Om dit systeem op te zetten, is het vereist om twee soorten applicaties te installeren:

1. De API. (Huidige pagina)
2. <a href="https://github.com/SmartEnergyOrg/Frontend#readme"> De webapplicatie</a>

De webapplicatie is het gedeelte waarmee de applicatie bediend kan worden en weergeeft alle data die de applicatie ontvangt van de API.
De API zorgt ervoor dat alle data opgehaald wordt van de databases en zorgt voor de opslag, wijziging en ophalen van zelf ingevoerde data.

Dit is een installatiehandleiding voor de API, waarmee de website ernaar communiceert. De API zorgt ervoor dat alle data van het energieverbruik ophaald en afhandeld. Ook zorgt het ervoor dat gegevens zoals widgetcofiguratie en woonplaats opgeslagen, gewijzigd, verwijderd en opgehaald kan worden.
Deze handleiding bevatten de nodige informatie om de applicatie te downloaden, installeren en te openen.


## Installatie van de API

<div id="#Installation"></div>

1. Klik op de groene knop en druk op 'Download ZIP' om een zip-map met de code te ontvangen.

![Voorbeeld](https://user-images.githubusercontent.com/38434237/212729935-693d859d-b1cc-4a9e-94d6-e55a2fbafb98.png)

2. Vervolgens, pak het ZIP-bestand uit

3. Open cmd of terminal om te navigeren naar de applicatiefolder en om de installatiescript uit te voeren.

`(root) -> Backend -> Backend`

4. Navigeer vanuit de root folder, direct naar de Backend folder via de volgende commando

```
cd ./Backend/Backend
```

Of als men vanuit de zip-folder de terminal opent

```
cd ./Backend
```

5. Binnen de Backend folder, voer in de terminal de volgende commando uit om het installatiescript uit te voeren.

Deze commando installeert docker en de bijbehorende docker container en packages. 

Let op! Als het apparaat geen editor geïnstalleerd, dan geeft het script een foutmelding terug. In dat geval zal men een terminal moeten downloaden zoals, cmd of een vergelijkbare editor.

```
./install.sh
```
Als het installatiescript zonder fouten uitgevoerd is, dan start applicatie automatisch op en kan er gebruik gemaakt worden.

### Opstarten van de API

<div id="#OpenApp"></div>

In het geval dat de applicatie correct is geïnstalleerd. Open de onderstaande link om de API te bedienen.

`http://localhost:12345/api`

## Verdere stappen

<div id="#VerdereStappen"></div>
Als de API correct geïnstalleerd, is de volgende stap om de webapplicatie te installeren.

Klik op deze link om de installatiehandleiding van de webapplicatie te openen

<a href="https://github.com/SmartEnergyOrg/Frontend#readme">
  <h4>2. Installatie webapplicatie</h4>
  <p>Frontend</p>
</a>

## Veelgestelde vragen

<div id="#FAQ">Veelgestelde vragen</div>
(Vragen en antwoorden voor troubleshooting)
