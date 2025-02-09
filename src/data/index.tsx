const projects = [
  {
    title: "Liv.rent - Listing Platform",
    description:
      "Real estate rental platform that aims to streamline the rental process for both renters and landlords. It provides tools to help renters find verified listings, apply for apartments, sign digital contracts, and pay rent online.",
    techs: ["React", "Next.js", "TypeScript", "React Query", "Redux", "Jest", "Design System"],
    metrics: "201% increase in sales",
    link: ["https://liv.rent/"],
    disclaimer: null,
    src: "livrent.mp4",
  },
  {
    title: "Design System Development",
    description:
      "Architected and maintained a comprehensive component library used across multiple enterprise applications. Drastically reduced development time for new features.",
    metrics: "Faster feature development within tech team",
    link: null,
    disclaimer: "* Link is undisclosed due to company policy",
    src: null,
  },
  {
    title: "Comprehensive Client Management System",
    description:
      "Architected and implemented a robust client management system for a real estate development company. Implemented automated pipeline tracking and workflow optimization.",
    metrics: "Helped client aquire $500M insales (200 condo units) within a week",
    link: null,
    disclaimer: "* Link is undisclosed due to company policy",
    src: null,
  },
  {
    title: "Automated Email Builder",
    description:
      "Developed a custom email automation solution, featuring drag-and-drop template creation and scheduled campaign functionality for precision-targeted customer outreach.",
    metrics: "Drastically improved client's productivity",
    link: null,
    disclaimer: "* Link is undisclosed due to company policy",
    src: null,
  },
  {
    title: "Project Websites",
    description:
      "Developed and maintained multiple project websites with integrated inquiry system.",
    metrics: "Helped client connect with potential clients",
    link: [
      "https://www.concordbrentwood.com/oasis",
      "https://concordpiano.ca/",
      "https://concordsky.ca/",
      "https://w1.place/",
      "https://concordmetrotown.com/",
    ],
    linkAdditionalText: "and more.",
    disclaimer: "* Link is undisclosed due to company policy",
    src: "brentwood.mp4",
  },
];

const achievements = [
  {
    title: "Frontend Architecture & Performance",
    description:
      "Led Software Developerelopment for high-traffic web applications serving 100K+ daily active users. Implemented performance optimizations reducing load time by 40%.",
    techs: ["React", "Redux", "TypeScript", "Webpack"],
    metrics: "40% faster load times, 99.9% uptime",
  },
  {
    title: "Design System Development",
    description:
      "Architected and maintained a comprehensive component library used across multiple enterprise applications. Reduced development time for new features by 60%.",
    techs: ["React", "TypeScript", "Vanilla Extract CSS", "Storybook", "Jest"],
    metrics: "60% faster feature development",
  },
  {
    title: "Data Visualization & Real-time Updates",
    description:
      "Built complex dashboard interfaces handling real-time data streams with 1M+ daily events. Implemented efficient rendering patterns for large datasets.",
    techs: ["D3.js", "WebSocket", "Redux-Saga", "React Query"],
    metrics: "Handling 1M+ daily events",
  },
];

const skills = [
  {
    category: "Core Framework & Languages",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    category: "Styling Solutions",
    items: [
      "Tailwind CSS",
      "Styled-components",
      "Sass/SCSS",
      "Material-UI (MUI)",
      "Vanilla Extract CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    category: "State Management",
    items: ["React Context", "Redux Toolkit", "React Query / TanStack Query"],
  },
  {
    category: "Testing",
    items: ["Jest", "React Testing Library", "Cypress", "Vitest"],
  },
  {
    category: "Deployment & Hosting",
    items: ["Vercel", "Netlify", "AWS", "Docker"],
  },
  {
    category: "UI/UX Tools",
    items: ["Storybook", "Figma", "Webflow"],
  },
];

export { skills, achievements, projects };
