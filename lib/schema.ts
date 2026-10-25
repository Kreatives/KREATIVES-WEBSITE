// Gedeelde JSON-LD-blokken. De review-markup hoort op pagina's waar de reviews
// ook echt als tekst staan: de homepage en /reviews. Google accepteert
// aggregateRating alleen met zichtbare reviews op diezelfde pagina.

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
  areaServed: [
    { "@type": "City", name: "Arnhem" },
    { "@type": "City", name: "Nijmegen" },
    { "@type": "City", name: "Apeldoorn" },
    { "@type": "City", name: "Utrecht" },
    { "@type": "City", name: "Rotterdam" },
    { "@type": "City", name: "Amsterdam" },
    { "@type": "Country", name: "Nederland" },
  ],
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
      author: { "@type": "Person", name: "Maya Zen" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ik heb meerdere keren gebruikgemaakt van RKCreatives. Ze hebben mijn website, logo en drukwerk ontworpen. Ik ben erg tevreden met hun uitstekende en snelle service. Echt proactief en professioneel. Een aanrader!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Dylan Wijnbergen" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Ricky is een topgozer met veel verstand van landingspagina's en conversie-testing. Hij bouwt al jaren mijn pagina's, schakelt snel en niks is te gek. Dik tevreden over zijn werk, blij mee!",
    },
  ],
};
