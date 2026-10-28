// Engelse content voor de /en-variant van de site (home, projects, about,
// reviews). Vorm spiegelt de Nederlandse exports in lib/site.ts, zodat dezelfde
// componenten dit via props kunnen renderen. Alleen deze vier pagina's zijn
// Engels; blog, kennisbank, stadpagina's, scan en prijzen blijven NL-only.

import { CALENDLY, hero, marquee, tiktok, reviewsPage } from "@/lib/site";
import type { Review, NavItem } from "@/lib/site";

const BOOK = { label: "Book a strategy call", href: CALENDLY };

export const heroEn = {
  titleLead: "Your business has grown.",
  titleAccent: "Your website hasn't.",
  titleUnderline: "Your website",
  titleAccentTail: " hasn't.",
  body:
    "Clients compare you to your competitor in seconds. We make sure they stay with you and get in touch. Live within six weeks.",
  primary: BOOK,
  contactCta: BOOK,
  ctaMicro: "Free and non-binding, thirty minutes and you know where you stand.",
  secondary: BOOK,
  socialProof: {
    avatars: hero.socialProof.avatars,
    rating: "5/5",
    label: "from Google reviews",
    trust: "Trusted by 100+ businesses",
  },
  background: hero.background,
  backgroundPosition: hero.backgroundPosition,
};

export const marqueeEn = {
  label: "Worked for, among others",
  logos: marquee.logos,
};

export const probleemEn = {
  eyebrow: "Who we are",
  statement:
    "KREATIVES builds custom websites for businesses that want to show online what they already prove offline. From strategy and design to build and launch, you work directly with the people who make your site.",
};

export const uspsEn = {
  eyebrow: "Why us",
  titleLead: "Why business owners",
  titleAccent: "choose us.",
  intro:
    "You work directly with the people who build your site. No middleman, no template that gets adjusted. An approach that is clear up front, and an end result that fits your brand.",
  items: [
    {
      stat: "1-on-1",
      title: "Direct contact",
      body:
        "You work directly with the people who build your site. No account manager, no middleman.",
    },
    {
      stat: "2",
      title: "Revision rounds included",
      body:
        "Fixed price, even when we refine along the way. We keep going until it is right, without the price changing.",
    },
    {
      stat: "6",
      title: "Weeks to launch",
      body:
        "From strategy call to live site, with a plan you get on paper up front.",
    },
  ],
};

export const werkwijzeEn = {
  eyebrow: "Approach",
  titleLead: "How we work, from first call to",
  titleAccent: "live site.",
  steps: [
    {
      no: "01",
      title: "Strategy call",
      body:
        "In 30 minutes we discuss your brand, your audience and what the site needs to deliver. You tell us where you get stuck now, we come with a first direction. After that you know exactly what to expect.",
      image: "/brand/stap-strategie.webp",
    },
    {
      no: "02",
      title: "Design",
      body:
        "Within a week you see a custom design. You give focused feedback across two revision rounds, we sharpen it until it is right. You design nothing yourself, you only deliver what we agree on up front.",
      image: "/brand/stap-design.webp",
    },
    {
      no: "03",
      title: "Development",
      body:
        "We build the site fast, scalable and technically sound, with good findability as the base. In this phase you do little. We keep you posted and deliver a test version to review.",
      image: "/brand/stap-development.webp",
    },
    {
      no: "04",
      title: "Launch",
      body:
        "Within six weeks of the start the site goes live. You get a walkthrough so you can edit text and projects yourself, and we stay available for maintenance and further development.",
      image: "/brand/work-5.webp",
    },
  ],
};

export const casesEn = {
  eyebrow: "Selected work",
  titleLead: "Work we delivered for brands like",
  titleAccent: "yours",
  allLabel: "View all cases",
  allHref: "/en/projects",
};

// Engelse one-liners per project (brand/beeld blijft gelijk).
export const projectLinesEn: Record<string, string> = {
  "smokey-joes": "Custom site for a growing hospitality concept.",
  mazadesign: "A redesign built on conversion for a design studio.",
  "health-champs": "From a business card to a steady stream of intakes.",
  "burgers-frites": "500% more franchise requests after the rebuild.",
  "sabreen-mia": "A webshop with a distinct brand of its own.",
  "swims-official": "Brand and store for a swimwear label.",
  "van-niets-naar-iets": "Brand and site for a growing podcast.",
  "the-goody-foody": "Branding and packaging with appetite.",
  "mazar-skin-clinic": "A clinic site built to turn visitors into bookings.",
};

export const reviewsMetaEn = {
  eyebrow: "What clients say",
  titleLead: "Business owners who",
  titleAccent: "recommend us",
  rating: "5/5",
  ratingLabel: "average on Google Reviews",
};

export const tiktokEn = {
  titleLead: "You might already know us",
  titleAccent: "from your feed.",
  intro:
    "On TikTok and Instagram we share how we build websites, from first sketch to launch. Chances are you have seen us pass by already.",
  handle: tiktok.handle,
  profile: tiktok.profile,
  videos: tiktok.videos,
};

export const pricingEn = {
  eyebrow: "Pricing",
  titleLead: "Fixed prices,",
  titleAccent: "no surprises.",
  body:
    "Three tracks with a fixed price, from a single landing page to a complete rebuild with branding. Per track you see what is and isn't included.",
  plans: [
    {
      name: "Landing",
      body: "One page that prepares the conversation, for when you already advertise.",
      price: "€2,499",
      priceUnit: "",
      featured: false,
      features: [
        "Copy and design by us",
        "Two design rounds",
        "Form and tracking on your own GA4",
        "Live in two weeks",
      ],
      cta: { label: "Book a strategy call", href: CALENDLY },
    },
    {
      name: "Rebuild",
      body: "The site that fits where your business stands today.",
      price: "€4,995",
      priceUnit: "",
      featured: true,
      features: [
        "Strategy, copy and design",
        "Up to ten pages",
        "Three design rounds",
        "SEO base and GA4 in your name",
        "Three months of management included",
      ],
      cta: { label: "Book a strategy call", href: CALENDLY },
    },
    {
      name: "Signature",
      body: "Everything in Rebuild, plus a brand that matches your level.",
      price: "€9,945",
      priceUnit: "",
      featured: false,
      features: [
        "Everything in Rebuild",
        "Logo, colour and typography",
        "Brand guidelines",
        "On-location photo day",
        "Up to twelve pages",
      ],
      cta: { label: "Book a strategy call", href: CALENDLY },
    },
  ],
};

export const closingCtaEn = {
  pulse: "4 spots available in",
  titleLead: "Ready to show online",
  titleAccent: "who you really are?",
  body:
    "Book a non-binding strategy call. We look together at where your site leaves requests on the table and what it takes to change that.",
  cta: BOOK,
  ctaMicro: "Thirty minutes, non-binding, you get concrete improvements right away.",
};

/* ---------- About (over-ons) ---------- */

export const aboutEn = {
  hero: {
    eyebrow: "About us",
    titleLead: "Small studio,",
    titleAccent: "serious work.",
    body:
      "KREATIVES was founded because most business owners deserve a better website than they have. We keep it small, work with a fixed team and take on a limited number of projects, so every site gets the attention it deserves.",
    background: "/brand/brand-1.webp",
  },
  marqueeLabel: "Trusted by 100+ businesses",
  verhaal: {
    badge: "Our story",
    titleLead: "Born from",
    titleAccent: "a good frustration.",
    subheading: "Sites that look well cared for, without the price tag of a large agency.",
    paragraphs: [
      "I saw too many business owners stuck with a site that no longer matched what they had become. Not because they didn't want to invest, but because the options didn't fit: too expensive, too generic, or a three-month waiting list.",
      "KREATIVES is built directly against that. Custom websites that load fast and are technically sound, for a price that fits what a serious business owner can reasonably invest.",
    ],
    primaryCta: BOOK,
    cta: { label: "View our work", href: "/en/projects" },
    media: {
      main: "/brand/over-verhaal.webp",
      left: "/brand/work-1.webp",
      right: "/brand/work-4.webp",
    },
  },
  kernwaarden: {
    eyebrow: "Core values",
    intro: "Four things you always see in how we work.",
    items: [
      {
        title: "Custom",
        body:
          "Every site we build from scratch around the brand. We don't use themes or templates, so your site is nowhere else to be seen.",
      },
      {
        title: "Transparent",
        body:
          "Up front you know what happens, when, and what it costs. Revision rounds included, without the price changing along the way.",
      },
      {
        title: "Concrete",
        body:
          "We talk in revision rounds, delivery dates and prices, instead of visions and synergies. What you read is what you get.",
      },
      {
        title: "Personal",
        body:
          "You work directly with the people who build the site. No account layer in between, no six-week queue for a text change.",
      },
    ],
  },
  team: {
    eyebrow: "Who we are",
    titleLead: "Who works on",
    titleAccent: "your site.",
    body:
      "KREATIVES is a small team. We take on a limited number of projects at a time, so you always know who is working on your site and why we do things the way we do. No queue, no middleman.",
    portrait: "/brand/work-2.webp",
  },
  voorWie: {
    eyebrow: "Who we work for",
    titleLead: "Who it",
    titleAccent: "fits.",
    voor: {
      title: "For you if",
      items: [
        "Your site is a few years old and you quietly hesitate to send it around",
        "Your brand already looks more professional offline than online",
        "You want a custom site, without the price of a large agency",
        "You want direct contact with the people who build your site",
        "You're willing to think along about strategy and message",
      ],
    },
    niet: {
      title: "Less suitable if",
      items: [
        "You're looking for a 200-euro template to put something online quickly",
        "You expect everything finished within a week",
        "You want full control and no advice on UX or copy",
        "You don't want to invest in good photos and concrete content",
      ],
    },
  },
  resultaten: {
    eyebrow: "Results",
    titleLead: "In",
    titleAccent: "numbers.",
    items: [
      {
        number: "100+",
        label: "Projects delivered",
        body:
          "Since the start we've built custom websites and shops for brands across the Netherlands.",
      },
      {
        number: "5/5",
        label: "Average Google rating",
        body:
          "Every client who left a review rated the collaboration with the highest possible score.",
      },
      {
        number: "6 wk",
        label: "Average time to launch",
        body:
          "From strategy call to launch we take six weeks on average, whether it's a site or a shop.",
      },
      {
        number: "100%",
        label: "Custom",
        body:
          "Every site we build from scratch around the brand. No templates, no recycled designs.",
      },
    ],
  },
  closing: {
    pill: "Your new site",
    titleLead: "Sounds like",
    titleAccent: "what you're after?",
    body:
      "Book a call. We look together at whether it fits and what it takes. No quote, no obligations.",
    cta: BOOK,
  },
};

/* ---------- Reviews page (vertaald uit het NL) ---------- */

// Vertalingen per auteur; vorm (naam, rol, kleur, foto) blijft gelijk zodat de
// kaarten identiek renderen. Ontbreekt een vertaling, dan valt 'ie terug op NL.
const REVIEW_EN: Record<string, { title: string; quote: string }> = {
  "Isslam Younes": {
    title: "CTR from 1% to 6%",
    quote:
      "Since launching our new website our online visibility has improved a lot. Where our CTR used to sit around 1%, it has now risen to a full 6%. That is entirely down to the fantastic new website: visually strong and technically solid. The usability, speed and structure keep visitors around longer and clicking through faster. I'm extremely happy and recommend this team to everyone!",
  },
  "Studio BIC": {
    title: "Faster delivery, fewer revisions",
    quote:
      "We've been working with Ricky for almost a year now and are very happy with the collaboration! He responds quickly, his designs let us deliver faster, and the number of revisions per client has dropped. We're glad to continue this partnership!",
  },
  "S. R.": {
    title: "Ricky, a 100% recommendation",
    quote:
      "Ricky built a website for our Mazar Skin Clinic and we're incredibly happy with it. It started with a conversation in which Ricky listened carefully to our wishes and gave valuable advice, with a beautiful website as the result. In short: Ricky isn't just a skilled website builder, but also a pleasant party to work with. The result was delivered quickly too. I recommend Ricky 100%!",
  },
  "Zeinab H.": {
    title: "Only done when everything was perfect",
    quote:
      "I've trusted Ricky with several different projects. He thinks along really well with my wishes, and the project was only finished when everything was perfect. Great service, very professional and precise; I definitely recommend him! Thanks again for everything.",
  },
  "Stap Voor Stap Onderwijs": {
    title: "High-end and distinctive",
    quote:
      "High-end, conversion-focused and distinctive. So happy with the website RKCreatives built for me! Besides the site, the service was top too. Your input is valued and supplemented well where needed!",
  },
  "Sarmen Jallal": {
    title: "Everything listened to my wishes",
    quote:
      "The communication was professional and clear, which made the whole process run smoothly. My wishes and ideas were listened to well, so the end result turned out exactly as I had in mind.",
  },
  Pogosian: {
    title: "Fantastic site, new concept",
    quote:
      "So happy with Ricky! He made a fantastic website for me. A real topper. It was quite a challenge with a completely new concept, but despite that he still delivered a great website! Keep it up!",
  },
  "R. Meijboom": {
    title: "Good, fast service",
    quote:
      "Ricky built the website for our company. We're satisfied and recommend RK Creatives to everyone. Good and fast service for a fair price, and Ricky is very friendly.",
  },
  "Maya Zen": {
    title: "Website, logo and print",
    quote:
      "I've used RKCreatives several times. They designed my website, logo and print work. I'm very happy with their excellent and fast service. Really proactive and professional. Highly recommended!",
  },
  "Sharda Marwa": {
    title: "The best logo I could have wished for",
    quote:
      "I had a fantastic experience with Ricky. He is incredibly skilled at his work. He designed the most beautiful logo for my company that I could have wished for!",
  },
  "Labran Hamidu": {
    title: "Done fast, with extras",
    quote:
      "RKCreatives delivered fantastic service! The website was ready very fast and exactly how I wanted it. They also added some extras that made the website even sharper. A real recommendation!",
  },
  "Lemmies Skin": {
    title: "Exactly how I wanted it",
    quote:
      "I'm so happy with the website! It turned out exactly how I wanted, and that's thanks to Rick. He put so much time and energy into it. Thank you for that.",
  },
  "S.": {
    title: "Clear and easy to find",
    quote:
      "I'm so happy with my website!! It looks gorgeous and everything is clear and easy to find for our clients. Thank you!!!",
  },
  Wobaboba: {
    title: "Happy with my professional site",
    quote:
      "Excellent service, and so happy with my new professional website. Thank you RK Creatives!",
  },
  "Ekkie Pets": {
    title: "Keeps to agreements excellently",
    quote:
      "Strong communication, keeps to agreements excellently, solution-focused, knowledgeable and with an eye for quality. Thanks for this collaboration!",
  },
  "Safa Doestzada": {
    title: "Fast work, high quality",
    quote:
      "A very pleasant collaboration with Ricky; he works fast and above all the quality is really good. A recommendation for anyone who takes their website seriously and wants to stand out from other websites!",
  },
  Dilan: {
    title: "Always responds, top communication",
    quote:
      "I'm super happy with RKCreatives. He built a gorgeous website for me and we have good communication. Always responds! 22thelabel to the moon.",
  },
  "Savo Hamad": {
    title: "Sleek and professional",
    quote:
      "I'm super happy with the end result. The communication was very pleasant and my wishes were listened to well. It looks sleek and professional, exactly what I had in mind.",
  },
};

function translateReviews(items: Review[]): Review[] {
  return items.map((r) => {
    const t = REVIEW_EN[r.author];
    return t ? { ...r, title: t.title, quote: t.quote, role: "Client" } : r;
  });
}

export const reviewsPageEn = {
  eyebrow: "Reviews",
  titleLead: "What clients say",
  titleAccent: "about us.",
  body:
    "A selection of what business owners and brands we worked with had to say. Unfiltered and in their own words, translated from Dutch.",
  items: translateReviews(reviewsPage.items),
};

/* ---------- Nav + Footer ---------- */

export const navEn: NavItem[] = [
  { label: "Home", href: "/en" },
  { label: "Projects", href: "/en/projects" },
  { label: "About", href: "/en/about" },
  { label: "Reviews", href: "/en/reviews" },
];

export const footerEn = {
  tagline:
    "Custom websites for business owners who want their online presence to match their company.",
  columns: [
    {
      title: "Menu",
      cols: 1,
      links: [
        { label: "Home", href: "/en" },
        { label: "Projects", href: "/en/projects" },
        { label: "About", href: "/en/about" },
        { label: "Reviews", href: "/en/reviews" },
      ],
    },
  ],
  contact: {
    title: "Direct contact",
    response: "Reply within one business day",
    location: "Netherlands, remote",
  },
  rights: "All rights reserved.",
};
