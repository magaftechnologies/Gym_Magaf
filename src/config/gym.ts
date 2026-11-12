// Centralised, typed demo content for the fictional MEGA GYM gym.
// Replace this file (or feed it from an API later) to rebrand the site for a real client.
import hero from "@/assets/mega-hero.jpg";
import ownerImage from "@/assets/owner.jpg";
import t1 from "@/assets/trainer-1.jpg";
import t2 from "@/assets/trainer-2.jpg";
import floor from "@/assets/facility-floor.jpg";
import hiit from "@/assets/program-hiit.jpg";
import pt from "@/assets/program-pt.jpg";
import mobility from "@/assets/program-mobility.jpg";

export type ThemeId = "obsidian" | "platinum" | "volt" | "earth";

export interface Program {
  slug: string;
  name: string;
  tag: string;
  level: string;
  image: string;
  short: string;
  audience: string;
  objectives: string[];
  format: string;
  trainers: string[];
}
export interface Trainer {
  slug: string;
  name: string;
  role: string;
  image: string;
  years: number;
  specialties: string[];
  qualifications: string[];
  achievements: string[];
  intro: string;
  bio: string;
  philosophy: string;
}
export interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  tagline: string;
  features: string[];
  excluded: string[];
  conditions: string;
  featured?: boolean;
}
export interface GymClass {
  id: string;
  name: string;
  day: string;
  time: string;
  duration: number;
  trainer: string;
  type: string;
  capacity: number;
  booked: number;
  description: string;
}

export const images = { hero, owner: ownerImage, t1, t2, floor, hiit, pt, mobility };

export const gym = {
  name: "MEGA GYM",
  short: "MEGA\u00A0GYM",
  tagline: "TRAIN HARDER. MOVE BETTER. BECOME MORE.",
  description:
    "A fictional fitness concept by MAGAF Technologies. Training spaces, people and plans are illustrative.",
  defaultTheme: "obsidian" as ThemeId,
  // Hero carousel autoplay interval (ms) — single source of truth.
  heroAutoplayMs: 3000,
  announcement: "Welcome to the MEGA GYM Interactive Website Demo.",
  contact: {
    address: "Demo location — your gym address here",
    phone: "Demo phone — not connected",
    email: "Demo email — not connected",
    mapsUrl: "",
    // Clearly fictional, configurable demo numbers for the floating contact control.
    demoPhone: "+91 90000 00000",
    demoWhatsapp: "+91 90000 00000",
  },
  hours: [
    { days: "Mon – Fri", time: "5:00 – 23:00" },
    { days: "Saturday", time: "6:00 – 21:00" },
    { days: "Sunday", time: "7:00 – 13:00" },
  ],
  socials: [],
  stats: [
    { value: 6, suffix: "", label: "Training disciplines" },
    { value: 3, suffix: "", label: "Sample coaches" },
    { value: 6, suffix: "", label: "Illustrative zones" },
    { value: 3, suffix: "", label: "Demo memberships" },
  ],
};

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  accent: string;
  copy: string;
  cta: string;
  to: string;
  image: string;
  alt: string;
}
export const heroSlides: HeroSlide[] = [
  {
    id: "strength",
    kicker: "01 / Strength",
    title: "BUILD YOUR",
    accent: "STRENGTH.",
    copy: "Train with purpose. Build strength, discipline, and confidence.",
    cta: "Explore Training",
    to: "/programs",
    image: hero,
    alt: "Illustrative athlete lifting a barbell on a cinematic training floor",
  },
  {
    id: "movement",
    kicker: "02 / Movement",
    title: "MOVE BETTER.",
    accent: "PERFORM BETTER.",
    copy: "Functional training designed around movement, performance, and progress.",
    cta: "Discover Programs",
    to: "/programs",
    image: hiit,
    alt: "Illustrative conditioning session with athletes in motion",
  },
  {
    id: "growth",
    kicker: "03 / Community",
    title: "BECOME",
    accent: "MORE.",
    copy: "A training environment built around consistency, community, and growth.",
    cta: "Explore MEGA GYM",
    to: "/our-story",
    image: pt,
    alt: "Illustrative coach guiding an athlete in a premium gym space",
  },
];

export const owner = {
  name: "Alex Stone",
  role: "Sample Head Coach",
  image: ownerImage,
  story:
    "MEGA GYM is a fictional concept imagined by MAGAF Technologies: a training space built around disciplined strength, purposeful conditioning and human coaching. Alex Stone is an illustrative coach profile, not a real employee.",
  philosophy:
    "Progress is earned in boring, consistent sessions. We coach the basics brilliantly, measure everything, and treat every member like an athlete.",
  background: [
    "Sample credential: Certified Strength & Conditioning Specialist",
    "Sample: 12 years competitive powerlifting coaching",
  ],
  message:
    "Walk in for a trial. Lift with us once. If the room doesn't make you want to come back tomorrow, we haven't done our job.",
};

export const programs: Program[] = [
  {
    slug: "strength",
    name: "Strength Foundations",
    tag: "Strength",
    level: "All levels",
    image: hero,
    short: "Barbell-led programming built around the big lifts and progressive overload.",
    audience: "Beginners to advanced lifters wanting measurable strength.",
    objectives: [
      "Squat, bench, deadlift technique",
      "Progressive 12-week blocks",
      "Monthly strength testing",
    ],
    format: "60 min · 3–4× per week",
    trainers: ["vikram-rao", "arjun-mehta"],
  },
  {
    slug: "personal-training",
    name: "1:1 Personal Training",
    tag: "Coaching",
    level: "Tailored",
    image: pt,
    short: "A coach, a plan and accountability — entirely built around you.",
    audience: "Anyone who wants the fastest, safest route to their goal.",
    objectives: ["Movement assessment", "Custom programming", "Nutrition habits check-ins"],
    format: "45 or 60 min sessions",
    trainers: ["ananya-iyer", "vikram-rao"],
  },
  {
    slug: "hiit",
    name: "HIIT & Conditioning",
    tag: "Conditioning",
    level: "Intermediate",
    image: hiit,
    short: "High-output intervals that build an engine without burning you out.",
    audience: "Members who want fitness, fat loss and a team atmosphere.",
    objectives: ["VO₂ max development", "Kettlebell & sled work", "Heart-rate guided sessions"],
    format: "45 min · group of 12",
    trainers: ["arjun-mehta"],
  },
  {
    slug: "functional",
    name: "Functional Fitness",
    tag: "Functional",
    level: "All levels",
    image: floor,
    short: "Carry, push, pull, hinge, sprint — strength that transfers to life.",
    audience: "Busy professionals and general fitness seekers.",
    objectives: ["Full-body strength", "Turf & sled work", "Injury-resilient movement"],
    format: "50 min · group of 14",
    trainers: ["arjun-mehta", "ananya-iyer"],
  },
  {
    slug: "group",
    name: "Group Classes",
    tag: "Community",
    level: "Beginner friendly",
    image: hiit,
    short: "Coach-led classes with a room full of people pushing the same direction.",
    audience: "Anyone who trains better with others.",
    objectives: ["Varied weekly formats", "Scalable workouts", "Community challenges"],
    format: "45 min · up to 16",
    trainers: ["ananya-iyer"],
  },
  {
    slug: "mobility",
    name: "Mobility & Recovery",
    tag: "Recovery",
    level: "All levels",
    image: mobility,
    short: "Restore range, reduce aches and come back stronger next session.",
    audience: "Lifters, desk workers and anyone recovering from hard training.",
    objectives: ["Joint mobility flows", "Breathwork", "Foam-roll & recovery protocols"],
    format: "40 min · calm studio",
    trainers: ["ananya-iyer"],
  },
];

export const trainers: Trainer[] = [
  {
    slug: "vikram-rao",
    name: "Alex Stone",
    role: "Sample Head Coach",
    image: ownerImage,
    years: 15,
    specialties: ["Powerlifting", "Strength programming", "Coach development"],
    qualifications: ["Sample: CSCS (NSCA)", "Sample: Level 2 Powerlifting Coach"],
    achievements: [
      "Sample: Coached 20+ state-level lifters",
      "Sample: Designed a strength coaching concept",
    ],
    intro: "Builds strong people with simple, ruthless consistency.",
    bio: "Alex has coached everyone from first-time lifters to national competitors. He designs every MEGA GYM strength cycle and mentors our coaching team.",
    philosophy: "Master the basics. Measure progress. Show up again tomorrow.",
  },
  {
    slug: "ananya-iyer",
    name: "Maya Reed",
    role: "Sample Personal Trainer",
    image: t1,
    years: 8,
    specialties: ["Body recomposition", "Women's strength", "Mobility"],
    qualifications: ["Sample: ACE Certified Personal Trainer", "Sample: Precision Nutrition L1"],
    achievements: [
      "Sample: 300+ client transformations",
      "Sample: Lead mobility programme designer",
    ],
    intro: "Precise coaching, warm energy and plans that fit real life.",
    bio: "Maya blends strength training with mobility work to help clients feel as good as they look. She leads our 1:1 coaching and recovery programmes.",
    philosophy: "Strength is a skill. Practise it well and confidence follows.",
  },
  {
    slug: "arjun-mehta",
    name: "Jordan Blake",
    role: "Sample Conditioning Coach",
    image: t2,
    years: 6,
    specialties: ["HIIT", "Athletic conditioning", "Sport-specific prep"],
    qualifications: ["Sample: B.Sc. Sports Science", "Sample: Kettlebell Instructor Cert."],
    achievements: [
      "Sample: Conditioning coach, university football team",
      "Sample: Hyrox finisher",
    ],
    intro: "Builds engines. Loud music, louder results.",
    bio: "Jordan runs our conditioning floor, combining sports-science testing with high-energy coaching that keeps classes full every week.",
    philosophy: "Train hard, recover harder, and never skip the warm-up.",
  },
];

export const plans: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    price: 2499,
    period: "month",
    tagline: "Everything you need to train with intent.",
    features: [
      "Full gym floor access",
      "Locker & shower access",
      "Induction session",
      "App workout library (demo)",
    ],
    excluded: ["Group classes", "Personal training"],
    conditions: "Off-peak 10:00–17:00 on weekdays · 3-month minimum",
  },
  {
    id: "performance",
    name: "Performance",
    price: 4499,
    period: "month",
    tagline: "A sample plan for consistent progress.",
    featured: true,
    features: [
      "Unlimited access, all hours",
      "Unlimited group classes",
      "Quarterly body-composition scan",
      "Monthly coach check-in",
    ],
    excluded: ["1:1 personal training"],
    conditions: "No minimum term · 30 days' notice",
  },
  {
    id: "elite",
    name: "Elite",
    price: 11999,
    period: "month",
    tagline: "Fully coached. Fully accountable.",
    features: [
      "Everything in Performance",
      "8 × 1:1 PT sessions / month",
      "Custom programme & nutrition plan",
      "Recovery suite priority",
    ],
    excluded: [],
    conditions: "Sessions don't roll over · 30 days' notice",
  },
];

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const T = (name: string) => trainers.find((t) => t.slug === name)?.name ?? "MEGA GYM coach";
export const classes: GymClass[] = [
  ["Strength Club", "06:00", 60, "vikram-rao", "Strength", 14, 11],
  ["HIIT Burn", "07:15", 45, "arjun-mehta", "Conditioning", 12, 12],
  ["Mobility Flow", "09:00", 40, "ananya-iyer", "Recovery", 16, 6],
  ["Functional 50", "18:00", 50, "arjun-mehta", "Functional", 14, 9],
  ["Power Hour", "19:30", 60, "vikram-rao", "Strength", 12, 8],
].flatMap(([name, time, duration, trainer, type, capacity, booked], i) =>
  days
    .map((day, d) => ({
      id: `${i}-${day}`,
      name: name as string,
      day,
      time: time as string,
      duration: duration as number,
      trainer: T(trainer as string),
      type: type as string,
      capacity: capacity as number,
      booked: Math.max(2, Math.min(capacity as number, (booked as number) - ((d * 3 + i) % 5))),
      description: `${type} session coached by ${T(trainer as string)}. Scalable for all levels.`,
    }))
    .filter((_, d) => !(i === 4 && d === 5)),
);

export const facilities = [
  {
    name: "Main Training Floor",
    detail: "Illustrative open training floor with natural light and room to move.",
    image: floor,
  },
  {
    name: "Strength Zone",
    detail: "12 competition racks, calibrated plates and deadlift platforms.",
    image: hero,
  },
  { name: "Free Weights", detail: "Dumbbells 2–60 kg, kettlebells and specialty bars.", image: pt },
  {
    name: "Conditioning Turf",
    detail: "25 m sled lane, assault bikes, rowers and ski ergs.",
    image: hiit,
  },
  { name: "Studio", detail: "Acoustic group-class studio with mood lighting.", image: hiit },
  {
    name: "Recovery Suite",
    detail: "Mobility zone, foam rolling, and cold plunge (demo).",
    image: mobility,
  },
];

export const stories = [
  {
    name: "Priya S.",
    meta: "Member · 2 years",
    quote:
      "I came in unable to do a push-up. Last month I deadlifted 100 kg. The coaches made every step feel possible.",
    image: t1,
  },
  {
    name: "Rahul K.",
    meta: "Member · 14 months",
    quote:
      "Finally a gym that feels serious. The programming is structured and I actually see my numbers move.",
    image: t2,
  },
  {
    name: "Meera & Dev",
    meta: "Members · 1 year",
    quote:
      "We train together in the Performance plan. The community is the reason we never miss Saturday class.",
    image: pt,
  },
];

export const achievements = [
  {
    year: "2025",
    title: "Sample: 6 members qualified for state powerlifting",
    kind: "Competition",
  },
  { year: "2024", title: "Sample: 1,000th member milestone", kind: "Milestone" },
  { year: "2024", title: "Sample: Charity deadlift-a-thon raised ₹4.2L", kind: "Community" },
  { year: "2023", title: "Sample: Coaching team completed CSCS cohort", kind: "Qualifications" },
];

export const gallery = [
  { src: hero, cat: "Training" },
  { src: floor, cat: "Equipment" },
  { src: t1, cat: "Trainers" },
  { src: hiit, cat: "Community" },
  { src: pt, cat: "Training" },
  { src: mobility, cat: "Events" },
  { src: t2, cat: "Trainers" },
  { src: ownerImage, cat: "Trainers" },
];

export const faqs = [
  {
    q: "Can I try the gym before joining?",
    a: "Explore a sample trial enquiry. MEGA GYM is a fictional concept; no real session is booked.",
  },
  {
    q: "I'm a complete beginner. Is that okay?",
    a: "Absolutely. Every new member gets an induction, and all classes are scalable to your level.",
  },
  {
    q: "What membership options are there?",
    a: "Essential, Performance and Elite. See the Memberships page for a full comparison.",
  },
  {
    q: "How do group class bookings work?",
    a: "Explore the sample timetable and complete a local demo enquiry. No place is reserved.",
  },
  {
    q: "What are your opening hours?",
    a: "Illustrative hours only: weekdays 5:00–23:00, Saturday 6:00–21:00 and Sunday 7:00–13:00.",
  },
  {
    q: "Do you offer personal training?",
    a: "Yes, as add-on packs or included in the Elite plan.",
  },
  {
    q: "What should I bring?",
    a: "Comfortable training clothes, clean indoor shoes, a towel and a water bottle.",
  },
];

export const nav = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/trainers", label: "Trainers" },
  { to: "/schedule", label: "Schedule" },
  { to: "/memberships", label: "Memberships" },
  { to: "/facilities", label: "Facilities" },
  { to: "/contact", label: "Contact" },
] as const;

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
