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
    metrics:
      "Helped client connect with potential clients by connecting the form to the CRM system",
    link: [
      "https://www.concordbrentwood.com/oasis",
      "https://concordpiano.ca/",
      "https://concordsky.ca/",
      "https://w1.place/",
      "https://concordmetrotown.com/",
    ],
    linkAdditionalText: "and more...",
    disclaimer: "* Link is undisclosed due to company policy",
    src: "brentwood.mp4",
  },
  {
    title: "College Campaign Website",
    description: "Developed and maintained the Langara College website leveraging Headless CMS.",
    metrics:
      "Drove increased demand for website creation across multiple departments at Langara College.",
    link: ["https://langara-app.ca/"],

    disclaimer: null,
    src: "langara_app.mp4",
  },
];

const skills = [
  {
    category: "Core Framework & Languages",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "React Native",
      "HTML5",
      "CSS3",
    ],
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
    items: ["React Context", "Redux", "React Query / TanStack Query"],
  },
  {
    category: "Testing",
    items: ["Vitest", "React Testing Library", "Jest", "Cypress"],
  },
  {
    category: "Deployment & Hosting",
    items: ["AWS", "Vercel", "Netlify", "Docker"],
  },
  {
    category: "And more...",
    items: ["Graphql", "Postgresql", "MySQL", "Mongo DB", "Node.js", "Express.js"],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Otavio Augusto",
    role: "Senior Software Developer",
    message:
      "I had the privilege of working closely with Ken as his technical lead, and I was consistently impressed by his exceptional growth mindset. His ability to rapidly absorb new information and immediately apply it in his work sets him apart from other developers. Ken has an incredible talent for turning every code review discussion, architecture meeting, or pair programming session into an opportunity to expand his knowledge. What particularly stood out was his commitment to test-driven development - he naturally embraced automated testing to guide his implementation, resulting in robust and maintainable code. His hunger for learning, combined with disciplined engineering practices and collaborative spirit, made him a force multiplier for our team. Any engineering organization would be fortunate to have Ken drive their technical excellence through his continuous learning approach and solid development practices.",
    image: "/otavio-linkedin.jpeg",
  },
  {
    id: 2,
    name: "Tomoko Okochi",
    role: "Project Manager",
    message:
      "I had a pleasure of supervising Ken in two web development projects. Ken has got lots of get up and go. He has lead the development team as a lead developer by setting an example for being quick to adapt to new technology and also for offering to help anytime. He is a resourceful fast learner with a passion for learning and willingness to explore new technology. Ken would be a great asset to any team.",
    image: "/tomoko-linkedin.jpeg",
  },
  {
    id: 3,
    name: "Hiteshri Nanda",
    role: "UI/UX & Visual Designer",
    message:
      "On all the 3 projects that I have worked with Ken, I’ve observed that he is very focused and diligent towards his work. He is someone we can rely on and specially as a designer I know he would code and deliver any tricky design exactly like the mock-up! He works very well in a team.",
    image: "/hiteshri-linkedin.jpeg",
  },
];

export { skills, projects, testimonials };
