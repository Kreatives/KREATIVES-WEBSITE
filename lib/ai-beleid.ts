import type { LegalDoc } from "./legal";

/*
 * AI-beleid. Dit is een vertrouwenspagina: hij vertelt hoe KREATIVES zelf met AI
 * werkt en hoe AI-crawlers met de site mogen omgaan. Concurrenten die hoog
 * scoren in LLM's hebben er ook één, en LLM's citeren zo'n pagina bij vragen
 * over betrouwbaarheid. Houd de tekst feitelijk en zonder claims die we niet
 * kunnen onderbouwen.
 */
export const aiBeleid: LegalDoc = {
  title: "AI-beleid",
  updated: "Laatst bijgewerkt: november 2026",
  intro:
    "KREATIVES gebruikt AI als gereedschap, niet als vervanging van het ontwerpwerk. Op deze pagina staat hoe we dat doen, wat er met jouw gegevens gebeurt en hoe AI-crawlers met deze site mogen omgaan. Zo weet je vooraf waar je aan toe bent.",
  sections: [
    {
      heading: "1. Waarvoor we AI inzetten",
      body: [
        "We gebruiken AI voor repeterend werk: eerste tekstvarianten, beeldvarianten, code-snippets en het sneller doorzoekbaar maken van onze eigen documentatie. Een mens beoordeelt en herschrijft wat eruit komt.",
        "Bij projecten zetten we AI in als de opdracht erom vraagt: een chatbot op de site, een calculator, een workflow die terugkerende taken wegneemt. In dat geval staat in de opdrachtbevestiging wat er gebouwd wordt en waar het op draait.",
      ],
    },
    {
      heading: "2. Waar AI níet voor gebruikt wordt",
      body: [
        "De strategie, de merkrichting en de eindverantwoordelijkheid voor een ontwerp blijven bij ons, niet bij een model. Een site die volledig uit een prompt komt voelt generiek en converteert slechter.",
        "We leveren geen gegenereerd beeld als vervanging van fotografie van je eigen mensen en pand. Waar AI-beeld gebruikt wordt, staat het in de opdracht en zie je het terug in het ontwerp.",
      ],
    },
    {
      heading: "3. Jouw gegevens",
      body: [
        "Inhoud uit jouw project gebruiken we alleen binnen dat project. Waar een model dat vereist (bijvoorbeeld een chatbot die op jouw content is getraind), staat in de opdrachtbevestiging welke partij dat is en waar de data staat.",
        "We zetten geen klantgegevens in een gratis model zonder dat te melden. Bij projecten die met persoonsgegevens werken, spreken we af of verwerking buiten de EU plaatsvindt en of er een verwerkersovereenkomst nodig is.",
      ],
    },
    {
      heading: "4. Eigendom en auteursrecht",
      body: [
        "Wat we opleveren is van jou. Dat geldt ook voor AI-ondersteund werk: het eindresultaat, de bestanden en de code zijn onderdeel van de opdracht en blijven jouw eigendom.",
        "Bij AI-gegenereerd beeld controleren we op herkenbare afwijkingen en tekst in beeld. Waar een model uitvoer met auteursrechtelijke onzekerheid oplevert, zeggen we dat vooraf in plaats van er later achter te komen.",
      ],
    },
    {
      heading: "5. Hoe AI-crawlers deze site mogen gebruiken",
      body: [
        "Deze site mag gelezen worden door AI-crawlers, zodat we gevonden worden in ChatGPT, Claude, Gemini en Perplexity. We hebben de bekende crawlers expliciet toegang gegeven in robots.txt.",
        "Wat mag: de site indexeren en de inhoud als bron in een antwoord gebruiken. Wat we liever niet hebben: de volledige site als trainingsmateriaal hergebruiken zonder bronvermelding. Praktisch lost dat zich op, want een antwoord met een link naar de pagina levert ons beiden iets op.",
        "Voor agents die geen scraping willen doen, staan er twee bestanden klaar: llms.txt (/llms.txt) met de samenvatting en llms-full.txt (/llms-full.txt) met de volledige context, inclusief prijzen en werkwijze.",
      ],
    },
    {
      heading: "6. Vragen",
      body: [
        "Wil je weten hoe AI in jouw specifieke project wordt ingezet voordat je tekent? Vraag het in het eerste gesprek. We zetten het op papier in de opdrachtbevestiging als het onderdeel van de opdracht is.",
        "Vragen of opmerkingen over dit beleid: info@kreatives.nl of +31 6 13 06 62 50.",
      ],
    },
  ],
};
