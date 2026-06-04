// Juridische pagina's — privacybeleid en algemene voorwaarden.
// Let op: dit is een degelijke basis op grond van de AVG, geen juridisch
// advies. Laat het bij twijfel nakijken door een jurist.

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  title: "Privacybeleid",
  updated: "Laatst bijgewerkt: juni 2026",
  intro:
    "KREATIVES hecht waarde aan je privacy. In dit beleid leggen we uit welke persoonsgegevens we verwerken, waarom, en welke rechten je hebt. We verwerken niet meer gegevens dan nodig en houden ons aan de Algemene Verordening Gegevensbescherming (AVG).",
  sections: [
    {
      heading: "1. Wie zijn wij",
      body: [
        "KREATIVES is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit beleid.",
        "Je bereikt ons via info@kreatives.nl of telefonisch op +31 6 13 06 62 50. Ons kantooradres delen we op aanvraag.",
      ],
    },
    {
      heading: "2. Welke gegevens we verwerken",
      body: [
        "We verzamelen alleen de gegevens die je zelf invult in een van onze contact- of aanvraagformulieren. Dat zijn: je naam, e-mailadres, telefoonnummer (optioneel), de link naar je website (optioneel) en de inhoud van je bericht.",
        "We verzamelen geen gegevens op de achtergrond en gebruiken geen tracking.",
      ],
    },
    {
      heading: "3. Waarvoor we je gegevens gebruiken",
      body: [
        "We gebruiken je gegevens uitsluitend om op je bericht te reageren, je aanvraag te behandelen en, als daar aanleiding toe is, een offerte of voorstel op te stellen.",
        "We gebruiken je gegevens niet voor marketing en verkopen ze nooit door aan derden.",
      ],
    },
    {
      heading: "4. Grondslag",
      body: [
        "We verwerken je gegevens op basis van je toestemming (door het formulier te versturen) en ons gerechtvaardigd belang om op je aanvraag te kunnen reageren en onze dienstverlening uit te voeren.",
      ],
    },
    {
      heading: "5. Cookies",
      body: [
        "Onze website gebruikt geen cookies en plaatst geen trackers. Er worden dus geen surfgegevens van je opgeslagen.",
      ],
    },
    {
      heading: "6. Bewaartermijn",
      body: [
        "We bewaren je gegevens niet langer dan nodig. Aanvragen die niet tot een samenwerking leiden, verwijderen we uiterlijk twaalf maanden na het laatste contact. Gegevens die horen bij een opdracht bewaren we zolang dat nodig is voor de uitvoering en eventuele wettelijke (bijvoorbeeld fiscale) bewaarplichten.",
      ],
    },
    {
      heading: "7. Delen met derden",
      body: [
        "Voor het laten werken van onze website en het ontvangen van je berichten schakelen we een aantal verwerkers in die je gegevens namens ons verwerken: onze hostingpartij, onze databasedienst en onze e-maildienst. Met deze partijen zijn passende afspraken gemaakt over de bescherming van je gegevens.",
        "We delen je gegevens verder met niemand, tenzij we daartoe wettelijk verplicht zijn.",
      ],
    },
    {
      heading: "8. Beveiliging",
      body: [
        "We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen verlies of onrechtmatig gebruik. Verbindingen met onze website verlopen versleuteld (https).",
      ],
    },
    {
      heading: "9. Je rechten",
      body: [
        "Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen. Ook kun je je toestemming intrekken of bezwaar maken tegen de verwerking.",
        "Stuur daarvoor een bericht naar info@kreatives.nl. We reageren binnen de wettelijke termijn. Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.",
      ],
    },
  ],
};

export const termsConditions: LegalDoc = {
  title: "Algemene voorwaarden",
  updated: "Laatst bijgewerkt: juni 2026",
  intro:
    "Deze algemene voorwaarden zijn van toepassing op alle offertes, opdrachten en overeenkomsten tussen KREATIVES en de opdrachtgever, tenzij schriftelijk anders is overeengekomen.",
  sections: [
    {
      heading: "1. Definities",
      body: [
        "KREATIVES: de opdrachtnemer die de werkzaamheden uitvoert.",
        "Opdrachtgever: de partij die KREATIVES opdracht geeft tot het verrichten van werkzaamheden.",
        "Overeenkomst: de afspraak op grond waarvan KREATIVES werkzaamheden verricht.",
      ],
    },
    {
      heading: "2. Toepasselijkheid",
      body: [
        "Deze voorwaarden gelden voor iedere aanbieding en overeenkomst tussen KREATIVES en de opdrachtgever. Afwijkingen gelden alleen als ze schriftelijk zijn bevestigd.",
      ],
    },
    {
      heading: "3. Offertes en aanbiedingen",
      body: [
        "Alle offertes zijn vrijblijvend en dertig dagen geldig, tenzij anders aangegeven. Een overeenkomst komt tot stand zodra de opdrachtgever de offerte of het voorstel akkoord geeft.",
        "Een gratis ontwerpvoorstel (zoals een hero-redesign) is vrijblijvend en verplicht je tot niets.",
      ],
    },
    {
      heading: "4. Prijzen en betaling",
      body: [
        "Prijzen zijn in euro's en exclusief btw, tenzij anders vermeld. De afgesproken prijs staat vooraf vast; er komen geen verrassingen achteraf bij.",
        "Tenzij anders afgesproken factureren we een aanbetaling bij aanvang en het restant bij oplevering. Facturen worden binnen veertien dagen voldaan.",
      ],
    },
    {
      heading: "5. Uitvoering en oplevering",
      body: [
        "KREATIVES voert de opdracht naar beste inzicht en vermogen uit. Genoemde opleverdata zijn een indicatie en gelden alleen als richttermijn, geen fatale termijn.",
        "Een typische livegang vindt plaats binnen ongeveer vier weken, mits de opdrachtgever tijdig de benodigde content en feedback aanlevert.",
      ],
    },
    {
      heading: "6. Revisies",
      body: [
        "Bij een ontwerptraject zijn twee revisierondes inbegrepen. Aanvullende wijzigingen of meerwerk buiten de oorspronkelijke opdracht worden in overleg en tegen het geldende tarief uitgevoerd.",
      ],
    },
    {
      heading: "7. Medewerking van de opdrachtgever",
      body: [
        "De opdrachtgever zorgt dat alle gegevens, teksten en beeldmateriaal die nodig zijn voor de uitvoering tijdig worden aangeleverd, en staat in voor de juistheid en rechten daarvan.",
      ],
    },
    {
      heading: "8. Intellectueel eigendom",
      body: [
        "Na volledige betaling verkrijgt de opdrachtgever het gebruiksrecht op het opgeleverde werk voor het overeengekomen doel. KREATIVES mag het werk gebruiken voor eigen portfolio en promotie, tenzij anders afgesproken.",
      ],
    },
    {
      heading: "9. Aansprakelijkheid",
      body: [
        "De aansprakelijkheid van KREATIVES is beperkt tot het factuurbedrag van de betreffende opdracht. KREATIVES is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.",
      ],
    },
    {
      heading: "10. Overmacht",
      body: [
        "Bij overmacht worden de verplichtingen opgeschort. Duurt de overmacht langer dan dertig dagen, dan kunnen beide partijen de overeenkomst ontbinden zonder schadevergoeding.",
      ],
    },
    {
      heading: "11. Toepasselijk recht",
      body: [
        "Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen leggen we bij voorkeur eerst in onderling overleg op; lukt dat niet, dan worden ze voorgelegd aan de bevoegde Nederlandse rechter.",
      ],
    },
  ],
};
