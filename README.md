![120393305](https://user-images.githubusercontent.com/38434237/212727884-4746ef79-9726-4618-8a16-37bde6750281.png)
# Installatiehandleiding API Smart Energy

## Ontwikkelaars
Studenten
|Xin|Silvester|Marcello|Jens|Mick|Joost|
|----|----|----|----|----|----|

#### Projectbegeleiders
|Remo van der Heijden|Jan Montizaan|
|----|----|

### Versie

|Versie|Datum|
|----|----|
|1.0|16 januari 2023|

## Inhoudsopgave

<ol>
  <li><a href="#Introduction">Introductie</a></li>
  <li><a href="#Installation">Installatie</a></li>
  <li><a href="#OpenApp">Openen van de API</a></li>
  <li><a href="#VerdereStappen">Verdere stappen</a></li>
</ol>

## Introductie

<div id="#Introduction">
  <p>In opdracht van het Lectoraat Smart Energie, hebben studenten van de opleiding Informatica een energiemanagementsysteem ontwikkeld waarin gebruikers via een dashboard inzicht krijgen over hun energieverbruik. </p>
</div>

### Achtergrond
Een belangrijke reden voor de ontwikkeling van dit systeem, is dat er een energietransitie van fossiele brandstof naar duurzame energie plaatsvind. Eén voorbeeld van duurzame energie is via zonne-energie via zonnepanelen.
Het gevolg hiervan is dat een gebruiker energie ontvangt van meerdere bronnen. Dit systeem is bedoeld om deze energietransitie te ondersteunen.

### Dankwoord
Namens het projectgroep, willen we onze contactpersoon Arno Broeders bedanken voor onze samenwerking tijdens het project. Ook willen onze begeleiders Remo van der Heijden en Jan Montizaan bedanken bij het ondersteunen van het ontwikkelingsproces.

### Applicatieinformatie
Om dit systeem op te zetten, is het vereist om twee soorten applicaties te installeren:
1. **De API. (Huidige pagina)**
2. <a href="https://github.com/SmartEnergyOrg/Frontend#readme"> De webapplicatie</a>

De webapplicatie is het gedeelte waarmee de applicatie bediend kan worden en weergeeft alle data die de applicatie ontvangt van de API.
De API zorgt ervoor dat alle data opgehaald wordt vanuit de databases en zorgt voor het persisteren van alle zelf ingevoerde data.

In deze installatiehandleiding, heeft het betrekking tot het installeren van de API. Het bevat de nodige instructies

## Installatie van de API

<div id="#Installation"></div>

1. Klik op de groene knop **Code** en druk op **Download ZIP** om een zip-map met de code te ontvangen.

![Voorbeeld](https://user-images.githubusercontent.com/38434237/212729935-693d859d-b1cc-4a9e-94d6-e55a2fbafb98.png)

2. Open het ZIP-bestand en pak alles uit in de root folder.

3. Open de terminal/cmd of soortgelijke editor.

4. Navigeer naar de innerste Backend-main folder van de applicatie

5. Binnen de Backend folder, voer in de terminal de volgende commando uit om het installatiescript uit te voeren.

Deze commando installeert docker en de bijbehorende docker container en packages. 

**Let op!** Als het apparaat geen editor heeft geïnstalleerd, dan zal het installatiescript een foutmelding teruggeven. 
In dat geval zal men een terminal moeten downloaden zoals, cmd of een vergelijkbare editor.

```
./install.sh
```
Als het installatiescript zonder fouten uitgevoerd is, dan start applicatie automatisch op en kan er gebruik gemaakt worden.

#### Opstarten van de API

<div id="#OpenApp">
  <p>In het geval dat de applicatie correct is geïnstalleerd. Open de onderstaande link om de API te bedienen.<p>
</div>

```
http://localhost:12345/api
```

## Verdere stappen

<div id="#VerdereStappen"></div>
Als de API correct geïnstalleerd, is de volgende stap om de webapplicatie te installeren.

Klik op deze link om de installatiehandleiding van de webapplicatie te openen

[Installatie webapplicatie](https://github.com/SmartEnergyOrg/Frontend#readme)

