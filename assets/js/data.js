/* ==========================================================================
   SITE CONTENT — edit this file to make the portfolio yours.

   Images: any project / post / media block accepts `image: "assets/img/file.jpg"`
   (and media blocks accept `video: "assets/video/file.mp4"`). Without one, an
   original generated artwork is drawn from `palette` + `motif`.
   Motifs: "sun" | "arches" | "stripes" | "grid" | "wave" | "orbit"
   Colour keys (Explore colour search): red, orange, yellow, lime, green, mint,
   cyan, sky, blue, violet, magenta, pink
   ========================================================================== */

window.SITE = {
  name: "Shintaine",
  fullName: "Shintaine Ruiz Tajanlangit",
  // Your live domain — used for search-engine links (canonical URLs, sitemap, social previews). Change it, then run: node tools/build-seo.mjs
  siteUrl: "https://itsshintayyyn.vercel.app",
  role: "Product Designer & Creative Developer",
  firstName: "Shintaine",
  location: "CEBU, PH",
  city: "Cebu",
  lat: 10.3157, lon: 123.8854,       // used for the live temperature (Open-Meteo, no API key)
  timezone: "Asia/Manila",
  clockLabel: "Cebu",
  email: "shintainet@gmail.com",
  // FormSubmit (https://formsubmit.co) AJAX endpoint — the first submission sends a confirmation email to activate it.
  formEndpoint: "https://formsubmit.co/ajax/shintainet@gmail.com",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "GitHub", url: "https://github.com/shintayyyn" },
    { label: "Instagram", url: "https://www.instagram.com/shintayyyn/" }
  ],

  /* hero */
  eyebrow: "Hello, I'm Shintaine. A –",
  vertical: "DESIGN / DETAILS / CODE",
  heroLine: "Designer who",
  heroWords: ["Builds", "Codes", "Ships", "Solves"],
  recorderTitle: "My design journey, in a song",
  // Spotify playlist for the radio (paste any open.spotify.com playlist / album / track link).
  // Plays through Spotify's official embed: full tracks for logged-in listeners, 30-second previews otherwise.
  spotify: "https://open.spotify.com/playlist/1NVX2o4pcn17H9xHVH0KRy",   // Shintaine's playlist
  audio: "assets/audio/journey.mp3",   // fallback if Spotify can't load   // drop an mp3 here; without it the player runs a 2:00 demo
  demoLength: 120,

  /* intro */
  intro: "I'm a product designer who codes. For nine years I've helped founders in health, climate and hospitality turn fuzzy ideas into calm, useful products.",
  manifesto: "I sweat the details so your users never have to.",

  /* work */
  workHeading: "Work featured on",
  clients: ["Northwind", "Lumen", "FIELDNOTE", "orbit labs", "Kettle & Co"],

  /* testimonials */
  testimonialsEyebrow: "Testimonials",
  testimonialsHeading: "In their words",

  /* footer + contact drawer */
  footerSub: "Good products grow from small, careful decisions. Let's plant the first few together.",
  footerHead: "Let's grow your next idea",
  drawerTitle: "Grow together?",
  drawerIntro: "Tell me what you're growing — a product, a brand, a wild idea. I'll write back within 48 hours.",

  /* inner pages (Little Plains style) */
  tagline: ["Ideas, Design", "Code."],          // ocean footer signature: "Ideas, Design & Code."
  projectsSummary: "Product, brand and creative development work — each one built with care, from first sketch to shipped code.",
  writingSummary: "Notes on design, typography, motion and the craft of building products.",
  suggested: ["Product Design", "Brand System", "Motion", "Software", "Typography", "Hospitality"]
};

/* About page (about.html) + the "Ask" assistant's knowledge */
window.ABOUT = {
  lead: "I blend design-led thinking with front-end craft to build calm, useful products for founders and growing teams.",
  intro: [
    { title: "Who you are", body: "A founder or product lead who needs thoughtful storytelling and modern technology, combined — and someone who sweats the details." },
    { title: "How I work", body: "Weekly check-ins, daily async updates and working prototypes early. You always know where things stand and why decisions were made." }
  ],
  principlesTitle: "My work is informed by three principles:",
  principles: [
    { title: "Design", body: "Brands and products — from identity and guidelines to UI, UX, motion and prototyping." },
    { title: "Technology", body: "I build what I design: production front-end, interactive prototypes and design systems in code." },
    { title: "Care", body: "Research upstream to anticipate your users' needs downstream — before they have to ask." }
  ],
  experience: [
    { role: "Independent Product Designer", org: "Self-employed", years: "2023 — Now" },
    { role: "Senior Product Designer", org: "Parcel", years: "2020 — 2023" },
    { role: "Product Designer", org: "Northwind", years: "2017 — 2020" }
  ],
  engagementTitle: "From a single sprint to an embedded partner, I work the way fast-moving teams do.",
  engagements: [
    { title: "Project-based", body: "Start-to-finish projects scoped in weekly sprints, with a steady, iterative pace and clear milestones." },
    { title: "Monthly retainer", body: "The same sprint-based approach, run continuously as an extension of your team." }
  ],
  services: ["Product design (UX/UI)", "Brand systems & identity", "Design systems", "Interactive prototypes", "Front-end development", "Motion design"],
  contactTitle: "I'd love to talk today."
};
/* About page (about.html) — layout follows the reference "about" view: intro + polaroids,
   experience accordion, fun-fact cards. Replace the placeholder copy and photos with your own.
   Photos: set `image: "assets/img/about/you.jpg"` on any polaroid / hike photo. */
window.ABOUT.heading = "I design calm, useful products — and I write the code that ships them.";
window.ABOUT.bio = [
  "With 9+ years across product design and front-end development, I bring something most designers don't: <strong>the ability to build what I design</strong>. I've spent the last few years crafting zero-to-one products, scaling design systems and prototyping in real code.",
  "From founder-led startups in Cebu to teams around the world in health, climate and hospitality, I bring care, range and an eye for detail to every build."
];
window.ABOUT.polaroids = [
  { alt: "A weekend food spread", palette: ["#b2451f", "#f3b27a", "#fbf0e4"], motif: "sun" },
  { alt: "Island-hopping off the coast of Cebu", palette: ["#0f4d42", "#7fdcc3", "#eafaf5"], motif: "wave" },
  { alt: "Looking up at a concrete facade", palette: ["#1f3a8a", "#9cc3ff", "#f0f5ff"], motif: "arches" },
  { alt: "Portrait of Shintaine", palette: ["#5a4500", "#ffd75e", "#fff8df"], motif: "orbit", image: "" }
];
window.ABOUT.jobs = [
  { name: "Independent", role: "Product Designer & Creative Developer", date: "Jan 2023 – Present",
    summary: "Product and brand work for founders in health, climate and hospitality — from first workshop to shipped code.",
    bullets: ["Led design and front-end for Fieldnote, an offline-first research journal; weekly active usage tripled after launch.",
              "Rebranded Lumen Health end-to-end, lifting sign-up conversion by 18%.",
              "Built interactive prototypes and production UI in HTML, CSS and JavaScript alongside client engineering teams."] },
  { name: "Parcel", role: "Senior Product Designer", date: "Mar 2020 – Dec 2022",
    bullets: ["Redesigned the seller dashboard around exceptions, cutting support tickets by 27%.",
              "Owned the design system, tokens and documentation used by four product squads."] },
  { name: "Northwind", role: "Product Designer", date: "Jun 2017 – Feb 2020",
    bullets: ["Designed core flows for a mobile banking app used by 2M+ people, from onboarding to payments."] },
  { name: "Freelance", role: "Graphic & Web Designer", date: "2015 – 2017",
    bullets: ["Identities, websites and print for small businesses and events around Cebu."] }
];
window.ABOUT.fun = {
  hikes: { label: "Hikes", year: "2026" },
  todo: { day: "Saturday", title: "Weekend To do", items: ["Try the new café in IT Park", "Sunrise hike at Osmeña Peak", "Portfolio", "Island hopping with friends", "Movie night"] },
  song: { line: "A playlist that never gets", em: "old...", by: "@shintayyyn", length: 213 },
  quote: { a: "Less, ", b: "but ", c: "better.", cite: "– dieter rams" },
  coded: { kicker: "Recently coded", title: "This portfolio", cta: "VIEW", url: "https://github.com/shintayyyn/itsshintayyyn", plus: "+12" }
};

window.ASK_SUGGESTIONS = ["Tell me about a recent project", "What services do you offer?", "How can I hire you?", "Where are you based?"];

window.PROJECTS = [
  {
    slug: "fieldnote", title: "Fieldnote",
    // DUMMY preview — replace with your own full-page screenshot (tall PNG/JPG) or a screen recording (.mp4)
    preview: { device: "phone", scroll: "assets/img/dummy/fieldnote-site.svg" },
    description: "A calm, offline‑first journaling app for field researchers.",
    pitch: ["Offline-first research journal,", "built for places with no signal."],
    year: "2026", industry: "Research tools", role: "Lead Product Designer",
    links: [{ label: "fieldnote.app", url: "https://example.com" }],
    tags: ["Product Design", "Software", "Brand System"],
    color: "green", palette: ["#2f5d3a", "#b9d58c", "#f4efe2"], motif: "wave",
    blocks: [
      { type: "text", paras: ["Field researchers were juggling paper notebooks, voice memos and three different apps. Fieldnote needed to replace all of them without ever asking for a signal bar.", "We built every flow around a local‑first model: capture is instant, sync is invisible, and conflicts resolve with a gentle side‑by‑side view instead of an error."], cta: { label: "Visit Fieldnote →", url: "https://example.com" } },
      { type: "wide" },
      { type: "text", paras: ["The visual language borrows from waterproof field notebooks — warm paper tones, a sturdy grid, and a single green that reads well in bright sun."] },
      { type: "tall", srcs: ["https://picsum.photos/id/1015/1200/1800", "https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif"] },   // DUMMY photo + gif
      { type: "wide", preview: { device: "phone", scroll: "assets/img/dummy/fieldnote-site.svg" } },   // DUMMY auto-scroll
      { type: "wide", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4" },   // DUMMY video
      { type: "text", paras: ["Weekly active usage tripled in the first quarter after launch, and the app was featured in the App Store's ‘Apps We Love’."] },
      { type: "trio" },
      { type: "footer" }
    ]
  },
  {
    slug: "lumen-health", title: "Lumen Health",
    // DUMMY preview — sample CC0 video link; swap for your own screen recording
    preview: { device: "laptop", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
    description: "Rebranding a telehealth platform to feel less clinical, more human.",
    pitch: ["A warmer kind of care,", "brand and web for telehealth."],
    year: "2025", industry: "Health-tech", role: "Design Lead",
    links: [{ label: "lumen.health", url: "https://example.com" }],
    tags: ["Brand System", "Typography"],
    color: "blue", palette: ["#1f3a8a", "#9cc3ff", "#f0f5ff"], motif: "orbit",
    blocks: [
      { type: "text", paras: ["The old brand was blue, sterile and indistinguishable from competitors. We introduced an editorial serif for voice and a precise sans for the moments that need clarity — dosage, pricing, instructions."], cta: { label: "Visit Lumen →", url: "https://example.com" } },
      { type: "wide" },
      { type: "tall" },
      { type: "text", paras: ["Rather than a fixed lockup, a flexible ‘halo’ mark adapts across packaging, app icons and out‑of‑home.", "Brand recall rose 41% in post‑launch studies and sign‑up conversion improved by 18%."] },
      { type: "wide", video: true },
      { type: "tall" },
      { type: "footer" }
    ]
  },
  {
    slug: "kettle-co", title: "Kettle & Co",
    preview: { device: "laptop", scroll: "assets/img/dummy/kettle-co-site.svg" },   // DUMMY
    description: "Identity and ordering experience for a neighbourhood tea house.",
    pitch: ["Steeped in place,", "identity and ordering for tea houses."],
    year: "2025", industry: "Hospitality", role: "Brand & Web Designer",
    links: [{ label: "kettle.co", url: "https://example.com" }],
    tags: ["Hospitality", "Brand System"],
    color: "orange", palette: ["#b2451f", "#f3b27a", "#fbf0e4"], motif: "sun",
    blocks: [
      { type: "text", paras: ["Each location gets its own hand‑drawn illustration drawn from the street it lives on, unified by a shared typographic system."] },
      { type: "wide", preview: { device: "laptop", scroll: "assets/img/dummy/kettle-co-site.svg" } },   // DUMMY auto-scroll
      { type: "text", paras: ["A three‑tap reorder flow made the web app the fastest way to get your usual — beating the queue on a busy morning. Online orders grew to 35% of revenue within six months."], cta: { label: "Visit Kettle & Co →", url: "https://example.com" } },
      { type: "tall" },
      { type: "footer" }
    ]
  },
  {
    slug: "orbit-labs", title: "Orbit Labs",
    preview: { device: "phone", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4" },   // DUMMY
    description: "A data visualisation toolkit and dashboard for climate scientists.",
    pitch: ["Climate data, made legible,", "a toolkit for researchers."],
    year: "2024", industry: "Climate science", role: "Product Designer & Front‑end",
    links: [{ label: "orbitlabs.org", url: "https://example.com" }],
    tags: ["Software", "Motion", "Product Design"],
    color: "violet", palette: ["#2b1d52", "#a58cf5", "#efeaff"], motif: "grid",
    blocks: [
      { type: "text", paras: ["Scientists were exporting CSVs into spreadsheets to make a single chart. We designed a component library that turns raw datasets into publication‑ready graphics."] },
      { type: "wide", video: true },
      { type: "text", paras: ["Transitions between time ranges animate the data itself, so researchers can see change rather than infer it. Adopted by 40+ research teams."] },
      { type: "trio" },
      { type: "footer" }
    ]
  },
  {
    slug: "parcel", title: "Parcel",
    description: "Shipping dashboard redesign for small online sellers.",
    pitch: ["Exceptions, not everything,", "a calmer shipping dashboard."],
    year: "2024", industry: "Logistics", role: "Senior Product Designer",
    links: [{ label: "parcel.io", url: "https://example.com" }],
    tags: ["Product Design", "Software"],
    color: "yellow", palette: ["#5a4500", "#ffd75e", "#fff8df"], motif: "stripes",
    blocks: [
      { type: "text", paras: ["Twenty interviews with sellers revealed the real job: knowing which orders are stuck, not watching every parcel move.", "The new home screen leads with problems that need attention and collapses everything that's going fine."] },
      { type: "wide" },
      { type: "tall" },
      { type: "footer" }
    ]
  },
  {
    slug: "monograph", title: "Monograph",
    description: "Type‑led identity and website for an independent architecture press.",
    pitch: ["Built like a book,", "identity for an architecture press."],
    year: "2023", industry: "Publishing", role: "Designer",
    links: [{ label: "monograph.press", url: "https://example.com" }],
    tags: ["Typography", "Brand System"],
    color: "red", palette: ["#7a1f22", "#f2a39b", "#fbefec"], motif: "arches",
    blocks: [
      { type: "text", paras: ["The website follows the grid of the printed books — generous margins, a strict baseline and footnotes that slide in from the side."] },
      { type: "wide" },
      { type: "tall" },
      { type: "footer" }
    ]
  },
  {
    slug: "tandem", title: "Tandem",
    description: "A shared-budget app for couples and housemates.",
    pitch: ["Money, but friendlier,", "budgeting for two."],
    year: "2023", industry: "Fintech", role: "Product Designer",
    links: [{ label: "tandem.money", url: "https://example.com" }],
    tags: ["Product Design", "Motion"],
    color: "mint", palette: ["#0f4d42", "#7fdcc3", "#eafaf5"], motif: "wave",
    blocks: [
      { type: "text", paras: ["Talking about money is awkward. Tandem makes the shared parts visible and keeps the private parts private."] },
      { type: "wide" },
      { type: "footer" }
    ]
  }
];

window.POSTS = [
  { slug: "designing-for-no-signal", title: "Designing for no signal", description: "What an offline‑first app taught me about trust and honesty in UI.",
    date: "2026-09-18", industry: "Essay", tags: ["Software", "Product Design"], color: "lime", palette: ["#3f5a12", "#c8e68a", "#f6fbe9"], motif: "wave",
    blocks: [{ type: "text", paras: ["The best sync indicator is the one you never have to look at.", "We mapped every flow assuming the network was gone. Anything that needed a server became optional enhancement rather than a dependency."] }, { type: "wide" }, { type: "text", paras: ["Instead of spinners, we used quiet badges that only appear when something truly needs attention."] }, { type: "footer" }] },
  { slug: "type-pairing-notes", title: "Notes on type pairing", description: "A practical approach to pairing a serif and a sans.",
    date: "2026-07-02", industry: "Essay", tags: ["Typography"], color: "magenta", palette: ["#5e1650", "#f0a3dc", "#fdeef8"], motif: "arches",
    blocks: [{ type: "text", paras: ["Give each typeface a job, and the pairing mostly takes care of itself.", "Let the serif carry personality — headlines, pull quotes, big numbers. Let the sans handle anything a user needs to act on."] }, { type: "tall" }, { type: "footer" }] },
  { slug: "motion-with-meaning", title: "Motion with meaning", description: "Animation should explain change, not decorate it.",
    date: "2026-05-11", industry: "Essay", tags: ["Motion"], color: "cyan", palette: ["#0b4a5c", "#8be2f2", "#ebfbfe"], motif: "orbit",
    blocks: [{ type: "text", paras: ["Every animation should answer one question: what just changed?", "When a chart changes range, move the points. Fading the whole card out and in hides the very thing people want to see."] }, { type: "wide", video: true }, { type: "footer" }] },
  { slug: "brand-systems-not-logos", title: "Brand systems, not logos", description: "Why I pitch flexible systems instead of one perfect mark.",
    date: "2026-03-20", industry: "Essay", tags: ["Brand System"], color: "sky", palette: ["#14466e", "#9fd2fb", "#eef7ff"], motif: "grid",
    blocks: [{ type: "text", paras: ["A logo is a signature. A system is a whole handwriting.", "Good systems give teams rules they can use to make new things that still feel on‑brand."] }, { type: "trio" }, { type: "footer" }] },
  { slug: "drawing-every-day", title: "One drawing a day", description: "What a daily illustration habit did for my client work.",
    date: "2025-12-29", industry: "Journal", tags: ["Typography", "Motion"], color: "pink", palette: ["#7a1d4f", "#ff9fcf", "#fff0f7"], motif: "sun",
    blocks: [{ type: "text", paras: ["Small, daily and unpolished beats big, occasional and perfect."] }, { type: "tall" }, { type: "footer" }] },
  { slug: "hospitality-ux", title: "What cafés taught me about UX", description: "Lessons from designing where every second at the counter counts.",
    date: "2025-10-08", industry: "Essay", tags: ["Hospitality", "Product Design"], color: "red", palette: ["#8a1f22", "#ff9a8f", "#fff0ee"], motif: "stripes",
    blocks: [{ type: "text", paras: ["Good service is invisible — so is good interface design.", "The single most loved feature was ‘order my usual’. Recognition is a form of hospitality."] }, { type: "wide" }, { type: "footer" }] }
];

window.TESTIMONIALS = [
  { quote: "Shintaine turned a vague idea into a product our users genuinely love. A rare mix of taste and rigor — every decision came with a reason, and every detail was considered. Working together felt less like hiring a designer and more like gaining a co-founder for the product side.", name: "Amara Osei", role: "CEO, Fieldnote", color: "#2f5d3a" },
  { quote: "The brand system is still paying off two years later. Every team uses it without asking, and our product finally looks like the company we want to be. Shintaine's documentation alone saved us months.", name: "Daniel Reyes", role: "CMO, Lumen Health", color: "#1f3a8a" },
  { quote: "Fast, thoughtful and a joy to collaborate with. The prototypes alone sold the project internally — leadership could feel how the product would work before we wrote a line of production code.", name: "Priya Nair", role: "Head of Product, Orbit Labs", color: "#5b3fbf" },
  { quote: "Shintaine has a gift for making complicated things feel obvious. Our onboarding went from our biggest drop-off point to the part customers compliment most.", name: "Tomás Herrera", role: "Founder, Parcel", color: "#b2451f" },
  { quote: "Every handoff was immaculate — annotated, responsive, accessible. Our engineers asked if we could keep Shintaine forever.", name: "Mei Lin", role: "Engineering Lead, Monograph", color: "#0f4d42" }
];
