import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Space Grotesk carries both display and body.
        sans: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        // JetBrains Mono for every label, meta line and nav item.
        mono: ["var(--font-jet)", "ui-monospace", "SFMono-Regular", "monospace"],
        jet: ["var(--font-jet)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        void: "#050506", // page background
        coal: "#0b0b0d", // marquee / section bands
        smoke: "#141417", // cards, preview chrome
        lime: "#d7fb3a", // primary accent, cursor, progress bar
        flame: "#ff5c35", // secondary accent, used sparingly
      },
    },
  },
  plugins: [],
} satisfies Config;
