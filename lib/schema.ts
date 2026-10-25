// Gedeelde JSON-LD-blokken. De review-markup hoort op pagina's waar de reviews
// ook echt als tekst staan: de homepage (reviews-marquee toont alle reviews) en
// /reviews. Google accepteert aggregateRating alleen met zichtbare reviews op
// diezelfde pagina. De 10 reviews hieronder staan alle tien zichtbaar op /reviews
// en in de homepage-marquee. reviewCount blijft 22 (het echte Google-totaal;
// de pagina zegt "een greep uit").

export const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.kreatives.nl/#organization",
  name: "KREATIVES",
  url: "https://www.kreatives.nl",
  image: "https://www.kreatives.nl/opengraph-image.png",
  priceRange: "€2500 - €4500",
  telephone: "+31613066250",
  email: "info@kreatives.nl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arnhem",
    addressRegion: "Gelderland",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.9851,
    longitude: 5.8987,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "22",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      name: "Pas af als alles perfect was",
      author: { "@type": "Person", name: "Zeinab H." },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ik heb Ricky meerdere keren verschillende projecten toevertrouwd. Hij denkt ontzettend goed mee met mijn wensen, en het project was pas af als alles perfect was. Top service, zeer professioneel en nauwkeurig; ik raad hem zeker aan! Nogmaals bedankt voor alles.",
    },
    {
      "@type": "Review",
      name: "Hoogwaardig en onderscheidend",
      author: { "@type": "Person", name: "Karim" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Hoogwaardig, conversiegericht en onderscheidend. Superblij met de website die RKCreatives voor me heeft gebouwd! Naast de site was ook de service top. Je input wordt gewaardeerd en waar nodig goed aangevuld!",
    },
    {
      "@type": "Review",
      name: "Fantastische site, nieuw concept",
      author: { "@type": "Person", name: "Swimssofficial" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Super blij met Ricky! Hij heeft een fantastische website voor me gemaakt. Echt een topper. Het was best een uitdaging met een compleet nieuw concept, maar ondanks dat heeft hij toch een geweldige website neergezet! Ga zo door!",
    },
    {
      "@type": "Review",
      name: "Goede, snelle service",
      author: { "@type": "Person", name: "R. Meijboom" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ricky heeft de website voor ons bedrijf gebouwd. We zijn tevreden en raden RK Creatives aan iedereen aan. Goede en snelle service voor een redelijke prijs, en Ricky is erg vriendelijk.",
    },
    {
      "@type": "Review",
      name: "Website, logo én drukwerk",
      author: { "@type": "Person", name: "Maya Zen" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ik heb meerdere keren gebruikgemaakt van RKCreatives. Ze hebben mijn website, logo en drukwerk ontworpen. Ik ben erg tevreden met hun uitstekende en snelle service. Echt proactief en professioneel. Een aanrader!",
    },
    {
      "@type": "Review",
      name: "Precies zoals ik wilde",
      author: { "@type": "Person", name: "Eigenaar Beautysalon" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ik ben zo blij met de website! Hij is precies geworden zoals ik wilde, en dat is te danken aan Rick. Hij heeft er zoveel tijd en energie in gestoken. Dank je wel daarvoor.",
    },
    {
      "@type": "Review",
      name: "Snel werken, hoge kwaliteit",
      author: { "@type": "Person", name: "Safa Doestzada" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Zeer prettige samenwerking met Ricky; hij werkt snel en bovenal is de kwaliteit erg goed. Een aanrader voor iedereen die zijn website serieus neemt en zich zakelijk wil onderscheiden van andere websites!",
    },
    {
      "@type": "Review",
      name: "Reageert altijd, top communicatie",
      author: { "@type": "Person", name: "Dilan" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ik ben supertevreden met RKCreatives. Hij heeft een prachtige website voor me gebouwd en we hebben goede communicatie. Reageert altijd! 22thelabel to the moon.",
    },
    {
      "@type": "Review",
      name: "Strak en professioneel",
      author: { "@type": "Person", name: "Savo Hamad" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ik ben supertevreden met het eindresultaat. De communicatie was erg prettig en er werd goed geluisterd naar mijn wensen. Het ziet er strak en professioneel uit, precies wat ik voor ogen had.",
    },
    {
      "@type": "Review",
      name: "Sinds de rebranding zit de groei er goed in",
      author: { "@type": "Person", name: "Youssef el Abbassi" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ricky heeft ons geholpen met het nieuwe logo én de website voor onze podcast Van Niets naar Iets. Sinds de rebranding zit de groei er goed in en wordt de site steeds beter bezocht. We hadden geen duidelijke branding; dat is nu compleet anders. Een absolute aanrader voor iedereen die aan de slag wil met (web)design.",
    },
  ],
};
