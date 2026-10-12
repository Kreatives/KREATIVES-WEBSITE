// Projecten CMS — file-based content store.
// Eén entry per project. /projecten/[slug] leest hier uit en pre-rendert
// alle pagina's statisch via generateStaticParams.

export type ProjectSection = {
  heading?: string;
  body: string;
  bodyExtra?: string; // optionele tweede tekstkolom
  image?: string;
  video?: string; // mp4-pad; wint van image als beide gezet zijn
  poster?: string; // posterframe voor de video
  videoPortrait?: boolean; // staande video (smaller tonen, niet full-width)
  videoLoop?: boolean; // autoplay + loop zonder geluid (voor sfeer/walkthrough)
  quote?: string; // grote testimonial-quote; rendert een eigen quote-layout
  quoteAuthor?: string; // naam + bedrijf onder de quote
};

export type Project = {
  slug: string;
  name: string; // bedrijfsnaam (klein boven de titel)
  headline: string; // grote, beschrijvende titel op de detailpagina
  type: string;
  excerpt: string;
  intro: string;
  image: string;
  tags: string[];
  client: string;
  year: string;
  url?: string;
  sections: ProjectSection[];
  related?: string[]; // andere slugs
};

export const projecten: Project[] = [
  {
    slug: "smokey-joes",
    name: "Smokey Joe's",
    headline: "In twee weken van nul naar een rij voor de deur",
    type: "Branding",
    excerpt:
      "Een compleet merk in twee weken, van logo en brandbook tot gevel, tassen en landingspagina.",
    intro:
      "Smokey Joe's opende in Rotterdam met burgers die je nergens anders vindt, maar een merk was er nog niet. In twee weken bouwden we alles op: van logo, kleuren en brandbook tot gevel, tassen, posters en de landingspagina.",
    image: "/projects/smokey-joes.webp",
    tags: ["Branding", "Horeca", "Landingspagina"],
    client: "Smokey Joe's",
    year: "2026",
    sections: [
      {
        heading: "De klant",
        body:
          "Smokey Joe's is een burgerzaak in Rotterdam die bewust anders durft te zijn. Ze maken burgers met combinaties die je nergens anders tegenkomt, gemaakt voor een jonge doelgroep die uit eten gaat voor de ervaring en het daarna wil delen.",
        bodyExtra:
          "Toen ze bij ons kwamen, stond de zaak op het punt van openen. De keuken, het pand en de planning liepen allemaal tegelijk. Alleen het merk bestond nog niet.",
      },
      {
        heading: "Het probleem",
        body:
          "Er was nog niets. Geen logo, geen kleuren, geen uitstraling en geen website. Het team had zijn handen vol aan alles wat bij een opening komt kijken, en de opening kwam snel dichterbij.",
        bodyExtra:
          "Zonder merk ben je op straat gewoon de zoveelste zaak. Voor een zaak die het moet hebben van nieuwsgierigheid en mond-tot-mondreclame is dat een groot risico, zeker in een stad met zoveel aanbod als Rotterdam.",
      },
      {
        heading: "Hoe ze bij ons terechtkwamen",
        body:
          "Smokey Joe's kwam via ons netwerk bij ons binnen. Ze hadden iemand nodig die snel kon schakelen en alles in één keer kon neerzetten, van het logo tot de gevel en de website.",
      },
      {
        heading: "Het doel",
        body:
          "Een merk dat meteen laat zien dat Smokey Joe's anders is. De burgers zijn gedurfd en dat moest je aan alles zien.",
        bodyExtra:
          "Tegelijk moest het merk aantrekkelijk en hip zijn voor een jonge doelgroep, zodat ze binnen willen lopen en er een foto van willen maken.",
      },
      {
        heading: "Het proces",
        body:
          "We hadden twee weken. Daarom begonnen we bij de basis waar alles op leunt: het logo, de kleuren en de typografie. Die legden we vast in een brandbook, zodat elk volgend ontwerp er direct op kon voortbouwen.",
        bodyExtra:
          "Daarna vertaalden we het merk naar alles wat een klant tegenkomt: de gevel, de tassen waarin het eten mee naar huis gaat, de flyers en de landingspagina waar mensen het merk online leren kennen. De eigenaar had één duidelijke wens voor de opening: een rij voor de deur. Mensen gaan alleen in de rij staan voor iets dat er de moeite waard uitziet. Daarom ontwierpen we een poster die nieuwsgierig maakt en voorbijgangers laat weten dat hier iets nieuws opengaat.",
        image: "/projects/smokey-poster.webp",
      },
      {
        heading: "Wat we maakten",
        body:
          "Een compleet merk in twee weken. Een logo en kleurenpalet die opvallen tussen andere zaken, typografie die stoer en speels tegelijk is, en een brandbook dat vastlegt hoe het merk overal hetzelfde blijft.",
        bodyExtra:
          "Het merk staat op de gevel, op de tassen, op de flyers en posters en op de landingspagina.",
        image: "/projects/smokey-packaging.webp",
      },
      {
        heading: "Het resultaat",
        body:
          "Bij de opening stond er een volle rij voor de deur, precies waar de eigenaar op hoopte. Smokey Joe's is inmiddels een herkenbare naam in Rotterdam en mensen kennen de zaak van de gekke burgers.",
        bodyExtra:
          "Het merk staat zo stevig dat ze nu al bezig zijn met uitbreiden.",
        video: "/projects/smokey-video.mp4",
        poster: "/projects/smokey-video-poster.webp",
        videoPortrait: true,
      },
    ],
    related: ["burgers-frites", "mazadesign"],
  },
  {
    slug: "mazadesign",
    name: "Mazadesign",
    headline: "Een landingspagina die meehelpt in het verkoopgesprek",
    type: "Webdesign",
    excerpt:
      "Een rustige, conversiegerichte landingspagina die het niveau van het bureau laat zien en bezoekers naar een gesprek brengt.",
    intro:
      "Mazadesign is het marketingbureau van Mahmut Mazlum: social advertising, e-mailmarketing, creative strategy en consulting voor webshops met ambitie. Het bureau groeide hard, maar de zelfgebouwde site bleef achter. In twee weken bouwden we een nieuwe landingspagina die wél laat zien waar Mazadesign nu staat.",
    image: "/projects/mazadesign.webp",
    tags: ["Webdesign", "Marketing", "Conversie"],
    client: "Mazadesign",
    year: "2026",
    sections: [
      {
        heading: "De klant",
        body:
          "Mazadesign is het marketingbureau van Mahmut Mazlum. Hij helpt webshops groeien met social advertising, e-mailmarketing via Klaviyo, creative strategy en consulting. Voor merken die alles onder één dak willen, is hij hun vaste groeipartner.",
        bodyExtra:
          "Mahmut werkt voor merken met ambitie en levert daar aantoonbaar resultaat voor. Zijn klanten zijn ondernemers die cijfers willen zien voordat ze iemand hun marketingbudget toevertrouwen.",
      },
      {
        heading: "Het probleem",
        body:
          "Mahmut had zijn website jaren geleden zelf gebouwd. Zijn bureau groeide, zijn klanten werden groter, maar de site bleef staan waar hij begon. Veel verschillende kleuren, geen duidelijke knoppen die iemand verder helpen en een uitstraling die niet meer modern aanvoelde.",
        bodyExtra:
          "Voor een marketingbureau is dat lastig. Je verkoopt groei en een sterke uitstraling aan anderen, terwijl je eigen site het tegenovergestelde laat zien. Mahmut zag dat zelf ook: de website liet niet meer zien wie hij inmiddels was.",
      },
      {
        heading: "Waarom Mazadesign voor ons koos",
        body:
          "Mahmut kwam bij ons binnen nadat hij een van onze video's had gezien. Wat hem aansprak was de creativiteit in het werk.",
        bodyExtra:
          "Hij zocht iemand die verder kijkt dan een nette pagina en met een eigen idee komt over hoe een merk zich moet laten zien.",
      },
      {
        heading: "Het doel",
        body:
          "Een uitstraling die past bij waar Mazadesign nu staat.",
        bodyExtra:
          "Een landingspagina die Mahmut met trots aan klanten kan laten zien en die bij een nieuwe bezoeker meteen vertrouwen opbouwt.",
      },
      {
        heading: "Het proces",
        body:
          "Een ondernemer die een marketingbureau zoekt, wil maar één ding weten: werkt het? Daarom laat de pagina meteen resultaten zien. Bezoekers zien direct voor welke merken Mazadesign werkt en wat dat heeft opgeleverd, met resultaten uitgewerkt als korte cases.",
        bodyExtra:
          "Het ontwerp hebben we flink rustiger gemaakt. Minder kleuren, een strakke vormgeving en een lettertype dat we kozen op leesbaarheid, omdat de doelgroep vooral snel wil scannen. Elke sectie stuurt naar één duidelijke stap: een gesprek plannen. Prijzen staan bewust niet op de pagina, omdat elk traject op maat is en het gesprek de plek is om dat te bespreken. Mahmut had al een bestaande site met pagina's die goed gevonden worden in Google. We vervingen daarom alleen de homepage door deze nieuwe landingspagina en lieten de rest staan, zodat zijn vindbaarheid intact bleef. Binnen twee weken stond de pagina live.",
      },
      {
        heading: "Wat we maakten",
        body:
          "Een one-pager die een bezoeker van twijfel naar een afspraak brengt. Bovenaan direct de merken waarvoor Mazadesign werkt. Daarna de problemen die webshop-eigenaren herkennen, de resultaten als bewijs, de diensten, een vergelijking met andere bureaus, reviews en de meestgestelde vragen.",
        bodyExtra:
          "Elk blok is gebouwd om snel te scannen en eindigt bij dezelfde vraag: plan een kennismaking.",
      },
      {
        heading: "Het resultaat",
        body:
          "Sinds de livegang krijgt Mahmut veel complimenten van klanten en komen er betere aanvragen binnen. Het mooiste verhaal kwam uit een verkoopgesprek. Mahmut liet een potentiële klant de nieuwe website zien. Die zag de resultaten op de pagina en was direct overtuigd. De deal was rond nog voordat het gesprek voorbij was.",
        image: "/projects/mazadesign-before-after.webp",
      },
      {
        body: "",
        quote:
          "Ik had mijn website jaren geleden zelf gemaakt, maar die liet gewoon niet meer zien wie ik ben. Nu kan ik hem met trots aan klanten laten zien.",
        quoteAuthor: "Mahmut Mazlum, Mazadesign",
        video: "/projects/mazadesign-testimonial.mp4",
        poster: "/projects/mazadesign-testimonial-poster.webp",
        videoPortrait: true,
      },
    ],
    related: ["health-champs", "mazar-skin-clinic"],
  },
  {
    slug: "health-champs",
    name: "Health Champs",
    headline: "Van online visitekaartje naar een site die aanvragen binnenhaalt",
    type: "Webdesign",
    excerpt:
      "Van online visitekaartje naar een conversiegerichte site die aanvragen binnenhaalt.",
    intro:
      "Een coach die op Instagram groot is, maar online klein oogde. Voor Health Champs bouwden we een nieuwe site die laat zien wie Abdu echt is en die bezoekers in één lijn naar een intake brengt. Van start tot livegang in twee weken.",
    image: "/projects/health-champs.webp",
    tags: ["Webdesign", "Coaching", "Conversie"],
    client: "Health Champs",
    year: "2026",
    sections: [
      {
        heading: "De klant",
        body:
          "Abdu Khalil speelde in zijn jeugd bij FC Twente, tot blessures een einde maakten aan zijn voetbaldroom. Hij vond fitness, ging bodybuilden en kwalificeerde zich in 2018 voor het NK Muscular Physique. Sinds 2019 helpt hij met Health Champs mensen aan een sterker lichaam via voeding, training en persoonlijke begeleiding.",
        bodyExtra:
          "Zijn klanten zijn drukke vaders, ondernemers, profvoetballers en artiesten. Mensen die de basis kennen, maar het nooit lang genoeg volhouden. Inmiddels begeleidde Abdu meer dan 1500 transformaties en volgen bijna 16.000 mensen hem op Instagram.",
      },
      {
        heading: "Het probleem",
        body:
          "Op Instagram was Abdu sterk. Zijn website was dat niet. Het was een oude template die vooral vertelde wie hij was, een online visitekaartje zonder plan om bezoekers tot een aanvraag te brengen. En juist op mobiel, waar bijna al zijn volgers binnenkomen, werkte de site slecht.",
        bodyExtra:
          "Daardoor liep bijna alles via Instagram. Wie vanuit zijn profiel doorklikte, zag een coach die er online kleiner uitzag dan hij in werkelijkheid is. Abdu wist dat het beter moest, maar hij is zelf niet technisch en was er nooit aan toegekomen.",
      },
      {
        heading: "Het doel",
        body:
          "Twee dingen moesten samenkomen. De site moest laten zien wie Abdu echt is, op hetzelfde niveau als zijn Instagram en zijn resultaten.",
        bodyExtra:
          "En de site moest gebouwd zijn op conversie, zodat een bezoeker zo snel mogelijk de stap zet naar een intake.",
      },
      {
        heading: "Het proces",
        body:
          "We begonnen bij de vraag wat iemand in de fitnesswereld overtuigt om contact op te nemen. Het antwoord is zien dat het werkt. Daarom staan de before en afters direct in beeld, nog voordat je iets hoeft te lezen.",
        bodyExtra:
          "Abdu heeft veel bekende Nederlanders, artiesten en profvoetballers begeleid. Dat is sterk bewijs, maar het kan ook afschrikken. Een gewone vader van drie zou kunnen denken dat deze coach alleen voor bekende mensen is. We zetten daarom een paar bekende namen bovenaan als bewijs en gaven de rest een eigen plek verderop. Zo werkt het als vertrouwen zonder dat iemand zich buitengesloten voelt. Zijn bestaande logo bleef staan, de rest bouwden we opnieuw op in WordPress. Binnen twee weken stond de site live.",
      },
      {
        heading: "Wat we maakten",
        body:
          "Een landingspagina die een bezoeker in één logische lijn meeneemt. Eerst het bewijs, met cijfers als 1500+ transformaties, 15 jaar ervaring en een 4.9 uit 5 aan reviews. Daarna de herkenning: je traint en let op je voeding, maar je ziet het niet terug in de spiegel. Dan de aanpak in drie heldere stappen, het verhaal van Abdu zelf en de resultaten van echte klanten.",
        bodyExtra:
          "De drie trajecten staan overzichtelijk naast elkaar, met het Supreme-traject als exclusief topaanbod voor maximaal vijf klanten per maand. Wie nog twijfelt, stuurt met één tik een appje naar Abdu. Precies het contact dat zijn volgers van Instagram al gewend zijn.",
        video: "/projects/health-champs-walkthrough.mp4",
        poster: "/projects/health-champs-walkthrough-poster.webp",
        videoLoop: true,
      },
      {
        heading: "Het resultaat",
        body:
          "Sinds de livegang zijn de aanvragen sterk gestegen. Bezoekers komen binnen met een duidelijk beeld van wat Abdu doet en welk traject bij hen past. En voor het eerst sinds de start van Health Champs koos een klant voor het Supreme-traject, de persoonlijke 1-op-1 begeleiding waar hij maar vijf plekken per maand voor vrijmaakt.",
      },
      {
        body: "",
        quote: "Sinds de nieuwe website zijn de aanvragen echt abnormaal.",
        quoteAuthor: "Abdu Khalil, Health Champs",
        video: "/projects/health-champs-testimonial.mp4",
        poster: "/projects/health-champs-testimonial-poster.webp",
        videoPortrait: true,
      },
    ],
    related: ["mazar-skin-clinic", "burgers-frites"],
  },
  {
    slug: "burgers-frites",
    name: "Burgers&Frites Rotterdam",
    headline:
      "Hoe wij Burgers&Frites hun webdesign vertaalden naar 200% meer conversie",
    type: "Webdesign",
    excerpt:
      "Een conversiegerichte site voor het best beoordeelde bezorgrestaurant van Nederland.",
    intro:
      "Burgers&Frites is een uitgesproken Rotterdamse zaak met een eigen smoel en bezorging van hoge kwaliteit. Ondanks de titel van best beoordeelde bezorgrestaurant van Nederland liep de online uitstraling daar in alles op achter.",
    image: "/projects/burgers-frites.webp",
    tags: ["Webdesign", "Horeca", "Conversie"],
    client: "Burgers&Frites Rotterdam",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "De zaak zelf straalde karakter en kwaliteit uit, maar de website deed vermoeden dat het om een heel ander bedrijf ging. De wens was om de in-store ervaring en de site weer op één lijn te krijgen.",
        bodyExtra:
          "Tegelijk moest de site investeerders aantrekken voor het franchise-concept, en dus ook zakelijk overtuigen, niet alleen culinair.",
      },
      {
        heading: "De aanpak",
        body:
          "We zijn langsgegaan om de sfeer van het merk in het echt te voelen. De branding is funky en vrolijk gehouden, maar strak genoeg om serieus genomen te worden door investeerders.",
        bodyExtra:
          "Door onderzoek te doen naar franchise-pagina's van concurrenten konden we conversie vooropstellen in plaats van puur op ontwerp te leunen.",
      },
      {
        heading: "Het resultaat",
        body:
          "De nieuwe site vertegenwoordigt het merk eindelijk zoals het hoort, en sluit naadloos aan op de ervaring in de zaak.",
        bodyExtra:
          "Na livegang ging de conversie van de franchise-pagina met meer dan 500% omhoog. Online en offline vertellen nu hetzelfde verhaal.",
      },
    ],
    related: ["mazar-skin-clinic", "swims-official"],
  },
  {
    slug: "sabreen-mia",
    name: "Sabreen MIA",
    headline: "Uitverkocht in de eerste week na lancering",
    type: "Webshop",
    excerpt:
      "Van verkopen via Instagram-DM's naar een luxe webshop die zichzelf in een week terugverdiende.",
    intro:
      "Sabreen MIA is een stijlvol modemerk uit Amsterdam Osdorp met duizenden volgers en een sterke community. Verkopen ging volledig via Instagram-DM's, terwijl het merk toe was aan een webshop die net zo luxe aanvoelt als de stukken zelf.",
    image: "/projects/sabreen-mia.webp",
    tags: ["Webshop", "E-commerce", "Fashion"],
    client: "Sabreen MIA",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Verkopen via DM's was intensief en niet schaalbaar. Er was behoefte aan een webshop die aansluit op de bestaande branding, met een luxe uitstraling en heldere navigatie.",
        bodyExtra:
          "Daarbij moest het ontwerp conversiegericht en mobiel-first zijn, en tegelijk makkelijk te beheren voor het merk zelf.",
      },
      {
        heading: "De aanpak",
        body:
          "We zijn naar de fysieke winkel gegaan om de sfeer en merkidentiteit te voelen, en hebben die vertaald naar een digitaal concept. Veel witruimte en typografie die het merk ademt.",
        bodyExtra:
          "Alles is maatwerk gebouwd, zonder templates, met een soepele launch zodat het merk vanaf dag één zelfstandig kon verkopen.",
      },
      {
        heading: "Het resultaat",
        body:
          "De volledige investering was binnen één week terugverdiend. Klanten en volgers reageerden enthousiast op de nieuwe ervaring.",
        bodyExtra:
          "De verkoopstructuur is overzichtelijker, het vertrouwen groter, en de webshop voelt net zo luxe als de winkel zelf.",
      },
    ],
    related: ["swims-official", "the-goody-foody"],
  },
  {
    slug: "swims-official",
    name: "Swimss Official",
    headline: "20.000 volgers in het eerste jaar na lancering",
    type: "Webshop",
    excerpt:
      "Een premium e-commerce ervaring met een Mix and Match-configurator voor luxe badmode.",
    intro:
      "Swimss Official richt zich op veeleisende klanten die zoeken naar stijlvolle én functionele badmode. Ze wilden een platform dat hun unieke concept en premium branding perfect zou vertegenwoordigen, met een innovatieve aanpak binnen e-commerce.",
    image: "/projects/swims-official.webp",
    tags: ["Webdesign", "E-commerce", "Branding"],
    client: "Swimss Official",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Een visuele stijl die luxe en exclusiviteit uitstraalt, terwijl de Mix and Match-functie om badmode te combineren intuïtief moest blijven werken.",
        bodyExtra:
          "Daarbij moest de site conversiegericht zijn en complexe technische onderdelen naadloos integreren, zonder de ervaring te verstoren.",
      },
      {
        heading: "De aanpak",
        body:
          "Maatwerk webdesign dat intuïtieve navigatie en visuele aantrekkingskracht in balans brengt, met een eigen merkidentiteit als basis.",
        bodyExtra:
          "De e-commerce is geoptimaliseerd met een soepele checkout en een gebruiksvriendelijke Mix and Match-plugin die het combineren tot een spel maakt.",
      },
      {
        heading: "Het resultaat",
        body:
          "De eerste collectie was binnen een week volledig uitverkocht, zonder advertentiekosten. Bezoekers roemden de bruikbaarheid en het intuïtieve gebruik.",
        bodyExtra:
          "De nieuwe branding positioneerde Swimss als herkenbaar merk binnen de premium-niche, goed voor 20.000 volgers in het eerste jaar na lancering.",
      },
    ],
    related: ["sabreen-mia", "burgers-frites"],
  },
  {
    slug: "van-niets-naar-iets",
    name: "Van Niets Naar Iets Podcast",
    headline:
      "Hoe “Van Niets Naar Iets Podcast” een frisse, moderne branding kreeg",
    type: "Branding",
    excerpt:
      "Een eigentijdse merkidentiteit voor dé nummer één podcast voor multiculturele ondernemers.",
    intro:
      "Van Niets Naar Iets is dé nummer één podcast voor multiculturele ondernemers, met meer dan 3 miljoen views. De visuele identiteit liep achter op die professionele status en de verwachtingen van het publiek.",
    image: "/projects/van-niets-naar-iets.webp",
    tags: ["Branding", "Logo", "Podcast"],
    client: "Van Niets Naar Iets Podcast",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Ondanks de sterke positie in de markt ondermijnde de verouderde uitstraling de geloofwaardigheid. Het doel was een eigentijdse branding die de groei en invloed van de podcast weerspiegelt.",
        bodyExtra:
          "De identiteit moest professioneel ogen, maar tegelijk toegankelijk blijven voor een breed, ondernemend publiek.",
      },
      {
        heading: "De aanpak",
        body:
          "We hebben een grondige merkanalyse en doelgroeponderzoek gedaan en op basis daarvan een nieuw logo ontwikkeld dat professionaliteit en toegankelijkheid combineert.",
        bodyExtra:
          "Daarbovenop kwamen eigen Instagram-iconen die de social-media presence versterken, met elk element afgestemd op de kernwaarden van de podcast.",
      },
      {
        heading: "Het resultaat",
        body:
          "Een modern, herkenbaar logo en een set social-iconen die consistentie en professionaliteit uitstralen over alle kanalen.",
        bodyExtra:
          "De reacties van luisteraars waren positief en de merkperceptie ging merkbaar omhoog.",
      },
    ],
    related: ["the-goody-foody", "sabreen-mia"],
  },
  {
    slug: "the-goody-foody",
    name: "TheGoodyFoody",
    headline:
      "Hoe wij TheGoodyFoody een gezicht gaven dat net zo lekker is als hun maaltijden",
    type: "Branding",
    excerpt:
      "Een verpakkingsontwerp dat het verhaal van verse, gezonde maaltijden eindelijk vertelt.",
    intro:
      "TheGoodyFoody is het merk van Opa Norma: verse, gezonde maaltijden voor mensen die goed willen eten zonder er veel tijd aan kwijt te zijn. Het product was sterk, maar de verpakking vertelde dat verhaal nog niet.",
    image: "/projects/the-goody-foody.webp",
    tags: ["Branding", "Verpakking", "Webdesign"],
    client: "TheGoodyFoody",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "Op kantoor bij Opa Norma zagen we een sterk merkfundament, maar een verpakking die achterliep. De sleeves voelden vlak aan en lieten niet zien wat erin zat.",
        bodyExtra:
          "TheGoodyFoody groeide hard online met een groeiende community, terwijl de oude sleeves niet onderscheidend genoeg waren voor het merk dat ze inmiddels waren.",
      },
      {
        heading: "De aanpak",
        body:
          "We zijn uitgegaan van de kern van het merk: zelfgemaakt, eerlijk, energiek en recht voor zijn raap. Het logo is subtiel opgewaardeerd en de voedingsinformatie beter zichtbaar gemaakt.",
        bodyExtra:
          "Elke maaltijd kreeg een eigen kleuraccent en een ingrediënten-illustratie, zodat er een familie ontstaat die samenhangt én ieder gerecht zijn eigen karakter houdt.",
      },
      {
        heading: "Het resultaat",
        body:
          "De nieuwe sleeves brengen het merk tot leven, met heldere communicatie en een professionele uitstraling.",
        bodyExtra:
          "Na de launch groeide de merkherkenning flink. Klanten delen hun maaltijden op social media en de verpakking is onderdeel geworden van de merkidentiteit.",
      },
    ],
    related: ["sabreen-mia", "van-niets-naar-iets"],
  },
  {
    slug: "mazar-skin-clinic",
    name: "Mazar Skin Clinic",
    headline: "120%+ conversie en volgeboekt binnen 3 weken na hun rebranding",
    type: "Webdesign",
    excerpt:
      "120%+ conversie en volgeboekt binnen drie weken na de rebranding.",
    intro:
      "Mazar Skin Clinic is een huidkliniek die toe was aan een uitstraling die past bij de kwaliteit van de behandelingen. De oude site bracht de premium ervaring niet over en liet kansen op nieuwe afspraken liggen.",
    image: "/projects/mazar-skin-clinic.webp",
    tags: ["Webdesign", "CRO", "Zorg"],
    client: "Mazar Skin Clinic",
    year: "2026",
    sections: [
      {
        heading: "De uitdaging",
        body:
          "De kliniek wilde een site die net zo verzorgd en betrouwbaar oogt als de behandelkamer, met een boekingsflow die bezoekers moeiteloos naar een afspraak leidt.",
        bodyExtra:
          "De bestaande site miste hiërarchie en focus, waardoor bezoekers afhaakten voordat ze een afspraak inplanden.",
      },
      {
        heading: "De aanpak",
        body:
          "We hebben de huisstijl doorgetrokken naar een rustige, premium website met een heldere structuur en een conversiegerichte opbouw per pagina.",
        bodyExtra:
          "De afspraakflow staat centraal en is op elke pagina binnen handbereik, zodat de stap van interesse naar boeking zo klein mogelijk is.",
      },
      {
        heading: "Het resultaat",
        body:
          "Na de rebranding steeg de conversie met meer dan 120% en zat de agenda binnen drie weken vol.",
        bodyExtra:
          "De kliniek straalt online nu dezelfde kwaliteit uit als in de praktijk, en trekt structureel meer afspraken aan.",
      },
    ],
    related: ["burgers-frites", "swims-official"],
  },
];

export function getAllProjectSlugs() {
  return projecten.map((p) => p.slug);
}

export function getProject(slug: string): Project | undefined {
  return projecten.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string): Project[] {
  const project = getProject(slug);
  if (!project?.related) return [];
  return project.related
    .map((s) => getProject(s))
    .filter((p): p is Project => Boolean(p));
}
