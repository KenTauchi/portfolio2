import Image from "next/image";
import { aboutFootnote, aboutParagraphs, contact, currentlyCard, portraitCaption } from "@/data/showcase";
import { useCardParallax, useRevealRef } from "./hooks";
import { Reveal, ScrambleLink } from "./primitives";

/**
 * The portrait is deliberately not a plain headshot: greyscale + duotone +
 * scanlines by default, and the real photo is the reward for hovering.
 */
function PortraitCard() {
  const ref = useCardParallax<HTMLElement>();
  useRevealRef(ref);

  return (
    <figure
      ref={ref}
      data-cursor
      className="sc-card3d sc-clip-up relative overflow-hidden rounded-2xl border border-white/10"
    >
      <Image
        src="/profile.jpg"
        alt={`Portrait of ${portraitCaption.name}`}
        width={680}
        height={850}
        sizes="(max-width: 1024px) 80vw, 340px"
        className="aspect-[4/5] w-full object-cover"
      />
      <span className="sc-duotone" />
      <span className="sc-scan" />
      <span className="sc-glare" />
      <span className="sc-layer pointer-events-none absolute inset-3 rounded-xl border border-lime/40" data-depth="60" />
      <figcaption
        className="sc-layer pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-void via-void/70 to-transparent px-4 pb-3 pt-12 font-jet text-[10px] uppercase tracking-[0.2em] text-neutral-300"
        data-depth="90"
      >
        <span>{portraitCaption.name}</span>
        <span className="text-lime">{portraitCaption.coords}</span>
      </figcaption>
    </figure>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] scroll-mt-24 px-6 py-28 sm:px-10">
      <div className="grid gap-16 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <Reveal as="span" className="block font-jet text-xs uppercase tracking-[0.3em] text-neutral-600">
            About
          </Reveal>

          <div className="relative mt-8 max-w-[340px]" style={{ perspective: "1000px" }}>
            <PortraitCard />

            {/* Overlaps the corner to break the rectangle. */}
            <Reveal className="absolute -bottom-10 -right-4 w-[185px] rounded-xl border border-white/10 bg-smoke/95 p-4 backdrop-blur sm:-right-10">
              <span className="font-jet text-[10px] uppercase tracking-[0.2em] text-neutral-600">Currently</span>
              <p className="mt-2 text-base leading-snug text-neutral-100">{currentlyCard.role}</p>
              <p className="font-jet text-xs text-lime">{currentlyCard.status}</p>
              <p className="mt-3 font-jet text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                {currentlyCard.location}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="space-y-6 text-xl leading-relaxed text-neutral-400">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p className="text-neutral-500">{aboutFootnote}</p>

          <div className="flex flex-wrap gap-6 pt-4 font-jet text-xs uppercase tracking-[0.2em]">
            <ScrambleLink
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="sc-underline text-neutral-200"
            >
              GitHub ↗
            </ScrambleLink>
            <ScrambleLink
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="sc-underline text-neutral-200"
            >
              LinkedIn ↗
            </ScrambleLink>
            <ScrambleLink href={contact.resume} download className="sc-underline text-neutral-200">
              Résumé ↗
            </ScrambleLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
