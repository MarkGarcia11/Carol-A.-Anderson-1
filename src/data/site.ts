/**
 * Central content + facts for Carol A. Anderson, MS, LMFT.
 * Only facts supplied by Carol are used here. Nothing is invented.
 * NOTE: religion is intentionally not mentioned anywhere. (Optional: add only if Carol requests it.)
 */

// ---------------------------------------------------------------------------
// Core facts
// ---------------------------------------------------------------------------
export const SITE = {
  name: "Carol A. Anderson",
  credentials: "MS, LMFT",
  fullName: "Carol A. Anderson, MS, LMFT",
  title: "Marriage & Family Therapist",
  license: "MFT29432",
  phone: "(559) 484-2078",
  phoneHref: "tel:+15594842078",
  // Email is a placeholder until Carol confirms a public address.
  // Set VITE_CONTACT_EMAIL in .env / Vercel to display a real one.
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || "",
  address: {
    line1: "6777 North Willow Avenue, Suite 139",
    city: "Fresno, CA 93710",
    neighborhood: "Hoover neighborhood",
  },
  mapEmbed:
    "https://www.google.com/maps?q=6777+North+Willow+Avenue+Suite+139+Fresno+CA+93710&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=6777+North+Willow+Avenue+Suite+139+Fresno+CA+93710",
  psychologyToday:
    "https://www.psychologytoday.com/us/therapists/carol-a-anderson-fresno-ca/1713137",
  headway: "https://headway.co",
  // Optional hidden-by-default reviews area. Flip to true ONLY after Carol approves
  // reviews under professional ethics guidelines (CA BBS / AAMFT).
  showReviews: false,
} as const;

// ---------------------------------------------------------------------------
// Photography
// Local files (put in /public/images) are used first. If a file is missing the
// <Photo> component automatically falls back to a royalty-free stock image.
// ---------------------------------------------------------------------------
const BASE = import.meta.env.BASE_URL;
const local = (file: string) => `${BASE}images/${file}`;
const stock = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export interface PhotoAsset {
  src: string;
  fallback: string;
  alt: string;
  /** Marks a stand-in the client must replace. */
  placeholder?: boolean;
}

export const photos = {
  // ---- Carol's real office photos (drop files into /public/images) ----
  officeWindows: {
    src: local("consulting-room-1.jpg"),
    fallback: stock(4451216),
    alt: "Carol's Fresno therapy office: warm leather armchairs and a soft grey loveseat in front of tall, softly lit windows with a leafy tree.",
  },
  officeLoveseat: {
    src: local("consulting-room-2.jpg"),
    fallback: stock(12969046),
    alt: "A calm corner of the therapy office with a loveseat, cushions, plants and two leather armchairs on a warm rug.",
  },
  officeCredentials: {
    src: local("consulting-room-3.jpg"),
    fallback: stock(15172652),
    alt: "Carol's office with a wooden cabinet, framed professional certificates on the wall and a leather swivel armchair.",
  },
  officeBookshelf: {
    src: local("consulting-room-4.jpg"),
    fallback: stock(36777534),
    alt: "The therapy office in warm afternoon light: sofa and armchairs by the window, a bookshelf with plants and books.",
  },
  // ---- Lifestyle photography (royalty-free stand-ins) ----
  heroPoster: {
    src: stock(27641221, 1800),
    fallback: stock(27641221, 1200),
    alt: "A happy couple laughing together over coffee on a cozy sofa.",
  },
  couple: {
    src: stock(8943650),
    fallback: stock(8943650, 900),
    alt: "A couple smiling and holding hands while walking together in a park.",
  },
  coupleWalking: {
    src: stock(6271542),
    fallback: stock(6271542, 900),
    alt: "A couple strolling hand in hand along a park path.",
  },
  elderHands: {
    src: stock(6975092),
    fallback: stock(6975092, 900),
    alt: "An older couple holding hands over a wooden table, a quiet moment of companionship.",
  },
  elderSmile: {
    src: stock(6787772),
    fallback: stock(6787772, 900),
    alt: "A senior couple sharing smiles in a bright greenhouse.",
  },
  journal: {
    src: stock(12911633),
    fallback: stock(12911633, 900),
    alt: "A woman writing in her journal by a sunny window surrounded by plants.",
  },
  sprout: {
    src: stock(4173853),
    fallback: stock(4173853, 900),
    alt: "A bright green sprout pushing up through rich soil, a symbol of new growth.",
  },
  sprouts: {
    src: stock(6863661),
    fallback: stock(6863661, 900),
    alt: "Fresh green sprouts in sunlight, symbolizing renewal.",
  },
  laughing: {
    src: stock(27641223),
    fallback: stock(27641223, 900),
    alt: "A joyful couple sharing a tender moment in a cozy living room.",
  },
  // ---- Portrait placeholder: REPLACE WITH CAROL'S REAL PHOTO ----
  portrait: {
    src: local("carol-portrait.jpg"),
    fallback: stock(5990259, 1100),
    alt: "Portrait placeholder for Carol A. Anderson, MS, LMFT.",
    placeholder: true,
  },
} satisfies Record<string, PhotoAsset>;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const ROUTES = {
  home: "/",
  about: "/about",
  couples: "/couples-therapy",
  singles: "/singles-dating",
  individual: "/individual-therapy-emdr",
  workshops: "/workshops",
  fees: "/fees-insurance",
  faq: "/faq",
  contact: "/contact",
  reflections: "/reflections",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const HELP_LINKS = [
  { label: "Couples Therapy (Imago)", to: ROUTES.couples, hint: "Reconnect and rebuild" },
  { label: "Singles & Dating", to: ROUTES.singles, hint: "Find a lasting relationship" },
  { label: "Individual Therapy & EMDR", to: ROUTES.individual, hint: "Heal, grow, feel steady" },
  { label: "Workshops", to: ROUTES.workshops, hint: "Learn together" },
];

export const NAV_LINKS = [
  { label: "About Carol", to: ROUTES.about },
  { label: "Fees & Insurance", to: ROUTES.fees },
  { label: "FAQ", to: ROUTES.faq },
  { label: "Reflections", to: ROUTES.reflections },
  { label: "Contact", to: ROUTES.contact },
];

// ---------------------------------------------------------------------------
// Services (home cards)
// ---------------------------------------------------------------------------
export const SERVICES = [
  {
    id: "couples",
    title: "Couples Therapy & Workshops",
    to: ROUTES.couples,
    photo: photos.couple,
    blurb:
      "Feeling distant, stuck in the same argument, or simply ready to grow closer? Imago gives you a way to truly hear each other again.",
    expect:
      "What to expect: a warm, structured conversation where each of you is heard, and practical tools you can use at home.",
  },
  {
    id: "singles",
    title: "Singles’ Therapy & Workshops",
    to: ROUTES.singles,
    photo: photos.journal,
    blurb:
      "Longing for a lasting relationship? Learn what you’re really looking for, and how to keep the love you find.",
    expect:
      "What to expect: gentle reflection on your patterns, your hopes, and how to bring your best self to dating.",
  },
  {
    id: "individual",
    title: "Individual Therapy & EMDR",
    to: ROUTES.individual,
    photo: photos.officeLoveseat,
    blurb:
      "For anxiety, grief, trauma, self-esteem and the heavy seasons of life, a steady, compassionate place to be heard.",
    expect:
      "What to expect: an unhurried pace, your story at your own speed, and EMDR when it feels like the right fit.",
  },
] as const;

export const SPECIALTIES = [
  "Anxiety",
  "Codependency",
  "Family Conflict",
  "Grief",
  "Marital and Premarital",
  "Relationship Issues",
  "Self-Esteem",
  "Spirituality",
  "Stress",
  "Trauma and PTSD",
  "Women’s Issues",
];

// ---------------------------------------------------------------------------
// Approach (placeholder wording: Carol will confirm her actual process)
// ---------------------------------------------------------------------------
export const APPROACH_STEPS = [
  {
    title: "A free consultation",
    text: "We begin with a relaxed 15-minute call or email conversation. You tell me what brings you here, I tell you how I work, and together we notice whether we’re a fit for each other. There’s no pressure at all.",
    photo: photos.officeWindows,
  },
  {
    title: "Discover your roadblocks",
    text: "Gently, and without blame, we name what keeps getting in the way: the patterns, the old hurts, the misunderstandings that keep repeating.",
    photo: photos.journal,
  },
  {
    title: "Learn practical tools",
    text: "You’ll leave with simple, usable tools for listening, speaking and calming yourself, things you can try between sessions, in real life.",
    photo: photos.officeBookshelf,
  },
  {
    title: "Create lasting connection",
    text: "Little by little, your roadblocks become a catalyst for growth, and a deeper connection with your partner, or with yourself.",
    photo: photos.coupleWalking,
  },
];

// ---------------------------------------------------------------------------
// FAQ. `verify: true` marks answers Carol must confirm (shown only in dev).
// ---------------------------------------------------------------------------
export interface FaqItem {
  q: string;
  a: string;
  verify?: boolean;
}
export const FAQS: FaqItem[] = [
  {
    q: "What is Imago therapy?",
    a: "Imago Relationship Therapy is a way of helping couples (and singles) understand why certain things keep tripping them up, and how to turn those moments into connection. It is based on the books “Getting the Love You Want” for couples and “Keeping the Love You Find” for singles. In sessions, you learn a structured way of talking and listening so that each person feels truly heard. I became a certified Imago therapist in 1994 and I’m an Advanced Clinician.",
  },
  {
    q: "What is EMDR?",
    a: "EMDR (Eye Movement Desensitization and Reprocessing) is a gentle, structured approach that helps people process painful or stuck memories so they feel less overwhelming. I completed EMDR Institute Level 2 training in 1992. If EMDR feels like a good fit for you, we’ll talk about it together first, and go at your pace.",
    verify: true, // Carol to confirm preferred plain-language description.
  },
  {
    q: "How does the free consultation work?",
    a: "It’s a free 15-minute conversation by phone or email. You share a little about what’s going on, you can ask me anything, and we both get a feel for whether we’re a fit for each other. There’s no obligation. You can call (559) 484-2078 or use the form on this site.",
  },
  {
    q: "Do you take insurance?",
    a: "Yes, through Headway (headway.co). You join Headway, then request me as your therapist. If you’d rather pay privately, I accept cash, check, credit card, Apple Pay/Apple Cash, Venmo and PayPal. A sliding scale is also available. Please call or use the sliding scale request.",
    verify: true, // Carol to confirm exact Headway steps and which plans apply.
  },
  {
    q: "Do you offer virtual sessions?",
    a: "My sessions are mostly in person at my Fresno office, and I offer virtual sessions when you need them.",
  },
  {
    q: "How long are sessions?",
    a: "For couples, I suggest 90-minute sessions, which are optional, and they give us room to really settle in. For individuals, 90-minute sessions are also optional. We’ll decide together what feels best for you.",
    verify: true, // Carol to confirm standard session length and scheduling frequency.
  },
  {
    q: "Who do you work with?",
    a: "I work with adults and elders (65+), as individuals, couples and groups. I’m glad to meet you wherever you are in life.",
  },
];

// ---------------------------------------------------------------------------
// Reflections (future blog). Titles only, no invented articles or dates.
// ---------------------------------------------------------------------------
export const REFLECTION_TOPICS = [
  "Turning roadblocks into a catalyst for growth",
  "What “a fit for each other” really means",
  "Small tools for hard conversations",
  "Keeping the love you find",
];
