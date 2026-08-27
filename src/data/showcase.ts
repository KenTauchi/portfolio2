// ─────────────────────────────────────────────────────────────
// Showcase (/v3) content layer.
//
// Everything factual is derived from src/data — this module only
// reshapes it for a design that wants short labels, four hero
// panels and display-typography lines. No content is invented here.
// ─────────────────────────────────────────────────────────────

import { projects, skills, testimonials, metrics, profile, socials, type Project } from "@/data";

/* ── hero ─────────────────────────────────────────────────────── */

export type HeroSegment = { text: string; variant?: "outline" | "accent" };

/** Each entry is one masked line. Lines never wrap (see .sc-line-mask). */
export const heroLines: HeroSegment[][] = [
  [{ text: "INTERFACES" }],
  [{ text: "WITH", variant: "outline" }, { text: " TASTE," }],
  [{ text: "SYSTEMS " }, { text: "BEHIND", variant: "accent" }],
  [{ text: "THEM.", variant: "outline" }],
];

export const heroMeta = ["Frontend-dominant", "Full stack", profile.location];

export const heroBlurb =
  "I live in React, React Native and the last 16ms of a frame — and I'm equally at home in the state and data layer, the test suite and the design system that keeps fifty screens speaking the same language.";

/* ── marquee ──────────────────────────────────────────────────── */

export const marqueeItems = [
  "React",
  "TypeScript",
  "Next.js",
  "React Native",
  "Expo",
  "TanStack Query",
  "Tailwind",
  "Node",
  "PostgreSQL",
  "Design Systems",
];

/* ── stats ────────────────────────────────────────────────────── */

export type Stat = { prefix: string; value: number; suffix: string; label: string };

/** "$500M" → { prefix: "$", value: 500, suffix: "M" } so it can count up. */
function parseMetric(raw: string): { prefix: string; value: number; suffix: string } {
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", value: 0, suffix: raw };
  return { prefix: match[1], value: Number(match[2]), suffix: match[3] };
}

// The bento labels are full sentences; this design needs them tight.
const shortLabels: Record<string, string> = {
  "--daily-orders": "Orders a day, white-label platform",
  "--sales-lift": "Sales lift on liv.rent",
  "--client-sales": "Client sales in one week",
  "--platforms": "Production platforms shipped",
};

export const stats: Stat[] = metrics.map((m) => ({
  ...parseMetric(m.value),
  label: shortLabels[m.varName] ?? m.label,
}));

/* ── work ─────────────────────────────────────────────────────── */

/** The pinned gallery shows the four projects that have live footage. */
export const galleryProjects: Project[] = projects.filter((p) => p.src);

/** Everything else — internal platform work, no public link. */
export const otherProjects: Project[] = projects.filter((p) => !p.src);

/* ── stack ────────────────────────────────────────────────────── */

export const stackGroups = skills;

/* ── about ────────────────────────────────────────────────────── */

export const aboutParagraphs = [
  "I build product front ends — React on the web, React Native on phones, kiosks and tablets — and the design systems that hold them together once more than one team is shipping into them.",
  "Most of my work has been multi-tenant: one codebase, many branded surfaces. A white-label ordering platform doing 500+ orders a day, a rental marketplace, a kitchen display system, point-of-sale apps. The interesting problem is never a single screen — it's the contract that lets fifty screens stay coherent.",
];

export const aboutFootnote =
  "I lean hard on testing and treat AI as part of the loop rather than autocomplete — planning, reviewing and shipping with it every day.";

export const portraitCaption = { name: profile.name, coords: "49.28°N 123.12°W" };

export const currentlyCard = {
  role: profile.role,
  status: profile.availability,
  location: profile.location,
};

/* ── reviews ──────────────────────────────────────────────────── */

export const reviews = testimonials;

/* ── contact ──────────────────────────────────────────────────── */

const social = (label: string) => socials.find((s) => s.label === label);

export const contact = {
  email: social("Email")?.href.replace("mailto:", "") ?? "",
  github: social("GitHub")?.href ?? "",
  linkedin: social("LinkedIn")?.href ?? "",
  resume: profile.resume,
  status: profile.availability,
};

export { profile };
