import { contact } from "@/data/showcase";
import { Reveal, ScrambleLink } from "./primitives";

function MarqueeRow({ hidden }: { hidden?: boolean }) {
  return (
    <span className="flex gap-8 pr-8" aria-hidden={hidden || undefined}>
      <span className="text-neutral-100">Let&rsquo;s work together</span>
      <span className="sc-outline">Let&rsquo;s work together</span>
    </span>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 overflow-hidden border-t border-white/10 py-28">
      <a href={`mailto:${contact.email}`} data-cursor className="block">
        <div className="sc-marquee gap-8 text-[13vw] font-medium leading-none tracking-[-0.04em]">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </a>

      <div className="mx-auto mt-20 grid max-w-[1400px] gap-10 px-6 sm:px-10 md:grid-cols-3">
        <Reveal>
          <p className="font-jet text-[11px] uppercase tracking-[0.2em] text-neutral-600">Email</p>
          <ScrambleLink
            href={`mailto:${contact.email}`}
            className="sc-underline mt-2 inline-block text-lg text-neutral-100"
          >
            {contact.email}
          </ScrambleLink>
        </Reveal>

        <Reveal>
          <p className="font-jet text-[11px] uppercase tracking-[0.2em] text-neutral-600">Status</p>
          <p className="mt-2 text-lg text-neutral-100">
            <span className="mr-2 inline-block h-2 w-2 -translate-y-0.5 rounded-full bg-lime" />
            {contact.status}
          </p>
        </Reveal>

        <Reveal>
          <p className="font-jet text-[11px] uppercase tracking-[0.2em] text-neutral-600">Elsewhere</p>
          <p className="mt-2 space-x-4 text-lg text-neutral-100">
            <ScrambleLink href={contact.github} target="_blank" rel="noopener noreferrer" className="sc-underline">
              GitHub
            </ScrambleLink>
            <ScrambleLink href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="sc-underline">
              LinkedIn
            </ScrambleLink>
            <ScrambleLink href={contact.resume} download className="sc-underline">
              Résumé
            </ScrambleLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
