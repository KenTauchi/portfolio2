import Head from "next/head";
import { useCallback, useState } from "react";
import { Cursor, Loader, ScrollProgress } from "@/components/showcase/primitives";
import { Nav } from "@/components/showcase/nav";
import { Hero } from "@/components/showcase/hero";
import { Marquee } from "@/components/showcase/marquee";
import { Stats } from "@/components/showcase/stats";
import { WorkGallery } from "@/components/showcase/work-gallery";
import { MoreWork } from "@/components/showcase/more-work";
import { Stack } from "@/components/showcase/stack";
import { About } from "@/components/showcase/about";
import { Reviews } from "@/components/showcase/reviews";
import { Contact } from "@/components/showcase/contact";

const title = "Ken Tauchi — Fullstack Engineer";
const description =
  "Ken Tauchi is a fullstack engineer with a frontend focus, building fast React and React Native applications with AI-augmented delivery. Portfolio, shipped work, and references.";

export default function Home() {
  const [started, setStarted] = useState(false);
  const onLoaderComplete = useCallback(() => setStarted(true), []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#050506" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.kentauchi.com/og/profile.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.kentauchi.com/og/profile.jpg" />
      </Head>

      <div className="showcase-root sc-grain relative min-h-screen font-display text-neutral-400">
        <Cursor />
        <ScrollProgress />
        <Loader onComplete={onLoaderComplete} />
        <Nav />

        <main id="top" className="relative z-10">
          <Hero started={started} />
          <Marquee />
          <Stats />
          <WorkGallery />
          <MoreWork />
          <Stack />
          <About />
          <Reviews />
          <Contact />
        </main>

        <footer className="relative z-10 border-t border-white/10 px-6 py-8 sm:px-10">
          <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-3 font-jet text-[11px] uppercase tracking-[0.2em] text-neutral-600 sm:flex-row">
            <span>© 2026 Ken Tauchi</span>
            <span>Built with Next.js · WebGL · Tailwind</span>
          </div>
        </footer>
      </div>
    </>
  );
}
