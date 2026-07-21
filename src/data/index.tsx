// ─────────────────────────────────────────────────────────────
// Content model for the portfolio, framed as a design system:
// sections are documented components, projects are catalog entries.
// ─────────────────────────────────────────────────────────────

export type ProjectState = "live" | "native" | "internal";
export type ProjectType = "Website" | "Application";

export type Project = {
  code: string; // catalog id, e.g. "WK-01"
  title: string;
  type: ProjectType;
  state: ProjectState;
  platform: string; // where it runs, e.g. "Web · iOS · Android"
  description: string;
  metrics: string | null;
  link: string[] | null;
  linkAdditionalText?: string;
  disclaimer: string | null;
  src: string | null; // demo video in /public
  techStack: string[];
  highlight?: { value: string; label: string }; // big-number treatment on a featured tile
};

export type SkillGroup = {
  code: string; // "TK-01"
  category: string;
  items: string[];
};

export type Testimonial = {
  id: number;
  code: string; // "REV-01"
  name: string;
  role: string;
  message: string;
  image: string;
};

export type Metric = {
  varName: string; // rendered as a CSS-custom-property style token id
  value: string;
  label: string;
};

export type SectionMeta = { id: string; code: string; label: string };

export const sections: SectionMeta[] = [
  { id: "identity", code: "01", label: "identity" },
  { id: "work", code: "02", label: "work" },
  { id: "stack", code: "03", label: "stack" },
  { id: "reviews", code: "04", label: "reviews" },
  { id: "contact", code: "05", label: "contact" },
];

export const profile = {
  name: "Ken Tauchi",
  role: "Fullstack Engineer",
  discipline: "Frontend",
  location: "Vancouver, BC",
  focus: "React · React Native · AI-augmented delivery",
  availability: "Open to opportunities",
  version: "v2.0",
  resume: "/Resume-KenTauchi.pdf",
};

export const metrics: Metric[] = [
  { varName: "--daily-orders", value: "500+", label: "orders a day on the white-label platform" },
  { varName: "--sales-lift", value: "201%", label: "sales lift on liv.rent" },
  { varName: "--client-sales", value: "$500M", label: "client sales in one week" },
  { varName: "--platforms", value: "10+", label: "production platforms shipped" },
];

export const socials = [
  { label: "GitHub", handle: "@KenTauchi", href: "https://github.com/KenTauchi", icon: "github" as const },
  {
    label: "LinkedIn",
    handle: "in/kentauchi",
    href: "https://www.linkedin.com/in/kentauchi/",
    icon: "linkedin" as const,
  },
  { label: "Email", handle: "kentauchijb@gmail.com", href: "mailto:kentauchijb@gmail.com", icon: "mail" as const },
];

const projects: Project[] = [
  {
    code: "WK-01",
    title: "White-Label Ordering Platform",
    type: "Application",
    state: "live",
    platform: "Web · iOS · Android",
    description:
      "Multi-tenant SaaS powering pickup, delivery, and loyalty for restaurant brands across Canada and the US — every branded app built from a single shared codebase. Club Kitchen is one live brand on the platform.",
    metrics: "500+ orders a day; one codebase, many branded apps across North America",
    link: ["https://order.clubkitchen.ca/"],
    disclaimer: null,
    src: "whitelabel.mp4",
    highlight: { value: "500+", label: "orders a day on the platform" },
    techStack: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "GraphQL",
      "Design System",
    ],
  },
  {
    code: "WK-02",
    title: "Liv.rent — Listing Platform",
    type: "Application",
    state: "live",
    platform: "Web",
    description:
      "Real estate rental platform that streamlines the rental process for renters and landlords — verified listings, applications, digital contracts, and online rent payments.",
    metrics: "201% increase in sales",
    link: ["https://liv.rent/"],
    disclaimer: null,
    src: "livrent.mp4",
    highlight: { value: "201%", label: "increase in sales" },
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "React Query",
      "Redux",
      "Jest",
      "React Testing Library",
      "GraphQL",
      "Design System",
      "Vanilla Extract CSS",
      "Docker",
    ],
  },
  {
    code: "WK-03",
    title: "Kiosk & POS Apps",
    type: "Application",
    state: "native",
    platform: "iOS · Android · Kiosk",
    description:
      "Self-service kiosk and staff-facing point-of-sale apps built on the same platform architecture — sharing components and business logic with the web and mobile clients.",
    metrics: "Shared architecture across customer and staff surfaces",
    link: null,
    disclaimer: "* Link undisclosed due to company policy",
    src: null,
    techStack: ["React Native", "Expo", "TypeScript", "Zustand", "TanStack Query", "Design System"],
  },
  {
    code: "WK-04",
    title: "Kitchen Display System",
    type: "Application",
    state: "internal",
    platform: "Web · Tablet",
    description:
      "Real-time order-management display for kitchen operations, keeping tickets in sync across devices as orders move through the line.",
    metrics: "Real-time order sync for kitchen operations",
    link: null,
    disclaimer: "* Link undisclosed due to company policy",
    src: null,
    techStack: ["React", "TypeScript", "WebSockets", "TanStack Query", "Design System"],
  },
  {
    code: "WK-05",
    title: "Design System Development",
    type: "Application",
    state: "internal",
    platform: "Internal",
    description:
      "Architected and maintained a comprehensive component library used across multiple enterprise applications, drastically reducing development time for new features.",
    metrics: "Faster feature development across the whole tech team",
    link: null,
    disclaimer: "* Link undisclosed due to company policy",
    src: null,
    techStack: [
      "React",
      "TypeScript",
      "Redux",
      "Jest",
      "React Testing Library",
      "Braid Design System",
      "Vanilla Extract CSS",
      "shadcn/ui",
    ],
  },
  {
    code: "WK-06",
    title: "Client Management System",
    type: "Application",
    state: "internal",
    platform: "Web",
    description:
      "Architected and implemented a robust client management system for a real estate development company, with automated pipeline tracking and workflow optimization.",
    metrics: "Helped a client acquire $500M in sales (200 condo units) in a single week",
    link: null,
    disclaimer: "* Link undisclosed due to company policy",
    src: null,
    techStack: [
      "React",
      "TypeScript",
      "React Admin",
      "React Query",
      "Jest",
      "React Testing Library",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    code: "WK-07",
    title: "Automated Email Builder",
    type: "Application",
    state: "internal",
    platform: "Web",
    description:
      "A custom email automation solution featuring drag-and-drop template creation and scheduled campaigns for precision-targeted customer outreach.",
    metrics: "Drastically improved the client's outreach productivity",
    link: null,
    disclaimer: "* Link undisclosed due to company policy",
    src: null,
    techStack: ["React", "Next.js", "TypeScript", "React Query", "Redux", "Jest", "Design System"],
  },
  {
    code: "WK-08",
    title: "Project Websites",
    type: "Website",
    state: "live",
    platform: "Web ×5",
    description:
      "Developed and maintained multiple real estate project websites with an integrated inquiry system wired into the client's CRM.",
    metrics: "Connected clients with prospects by piping inquiry forms into the CRM",
    link: [
      "https://www.concordbrentwood.com/oasis",
      "https://concordpiano.ca/",
      "https://concordsky.ca/",
      "https://w1.place/",
      "https://concordmetrotown.com/",
    ],
    linkAdditionalText: "and more…",
    disclaimer: null,
    src: "brentwood.mp4",
    techStack: [
      "React",
      "Next.js",
      "TypeScript",
      "React Query",
      "React Testing Library",
      "Jest",
      "Design System",
    ],
  },
  {
    code: "WK-09",
    title: "College Campaign Website",
    type: "Website",
    state: "live",
    platform: "Web",
    description:
      "Developed and maintained the Langara College campaign website leveraging a headless CMS, driving demand for new sites across multiple departments.",
    metrics: "Sparked demand for new websites across Langara College departments",
    link: ["https://langara-app.ca/"],
    disclaimer: null,
    src: "langara_app.mp4",
    techStack: ["React", "Next.js", "TypeScript", "Vercel", "Styled Components"],
  },
];

const skills: SkillGroup[] = [
  {
    code: "TK-01",
    category: "Core Framework & Languages",
    items: ["React", "TypeScript", "Next.js", "JavaScript (ES6+)", "React Native", "Expo", "HTML5", "CSS3"],
  },
  {
    code: "TK-02",
    category: "Styling & Design Systems",
    items: [
      "Tailwind CSS",
      "Styled-components",
      "Sass/SCSS",
      "Vanilla Extract",
      "shadcn/ui",
      "Braid",
      "Framer Motion",
    ],
  },
  {
    code: "TK-03",
    category: "State Management",
    items: ["React Context", "Redux", "TanStack Query", "Zustand"],
  },
  {
    code: "TK-04",
    category: "Testing",
    items: ["Vitest", "Jest", "React Testing Library", "Cypress", "Playwright"],
  },
  {
    code: "TK-05",
    category: "Backend & Data",
    items: ["GraphQL", "PostgreSQL", "Prisma", "MongoDB", "Node.js", "Express.js", "Firebase"],
  },
  {
    code: "TK-06",
    category: "AI-Augmented Development",
    items: ["Claude Code", "Cursor", "GitHub Copilot", "MCP Workflows"],
  },
  {
    code: "TK-07",
    category: "Deployment & Hosting",
    items: ["AWS", "Vercel", "Netlify", "Docker"],
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    code: "REV-01",
    name: "Tyler Yan",
    role: "Project Manager",
    message:
      "Ken really stood out on our team for his rapid advancement and eagerness to tackle new challenges. He pushed for better testing and strong design systems, significantly improving our codebase and the overall product. Incredibly reliable, Ken was our go-to person when things were on fire. His initiative not only enhanced our workflows but also brought great value to our projects. Any team would be incredibly lucky to have him on board.",
    image: "/tyler_linkedin.jpeg",
  },
  {
    id: 2,
    code: "REV-02",
    name: "Otavio Augusto",
    role: "Senior Software Developer",
    message:
      "I had the privilege of working closely with Ken as his technical lead, and I was consistently impressed by his exceptional growth mindset. His ability to rapidly absorb new information and immediately apply it in his work sets him apart from other developers. Ken has an incredible talent for turning every code review discussion, architecture meeting, or pair programming session into an opportunity to expand his knowledge. What particularly stood out was his commitment to test-driven development - he naturally embraced automated testing to guide his implementation, resulting in robust and maintainable code. His hunger for learning, combined with disciplined engineering practices and collaborative spirit, made him a force multiplier for our team. Any engineering organization would be fortunate to have Ken drive their technical excellence through his continuous learning approach and solid development practices.",
    image: "/otavio-linkedin.jpeg",
  },
  {
    id: 3,
    code: "REV-03",
    name: "Tomoko Okochi",
    role: "Project Manager",
    message:
      "I had a pleasure of supervising Ken in two web development projects. Ken has got lots of get up and go. He has lead the development team as a lead developer by setting an example for being quick to adapt to new technology and also for offering to help anytime. He is a resourceful fast learner with a passion for learning and willingness to explore new technology. Ken would be a great asset to any team.",
    image: "/tomoko-linkedin.jpeg",
  },
  {
    id: 4,
    code: "REV-04",
    name: "Hiteshri Nanda",
    role: "UI/UX & Visual Designer",
    message:
      "On all the 3 projects that I have worked with Ken, I’ve observed that he is very focused and diligent towards his work. He is someone we can rely on and specially as a designer I know he would code and deliver any tricky design exactly like the mock-up! He works very well in a team.",
    image: "/hiteshri-linkedin.jpeg",
  },
];

export { skills, projects, testimonials };
