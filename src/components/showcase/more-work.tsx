import Image from "next/image";
import { otherProjects } from "@/data/showcase";
import type { Project } from "@/data";
import { useTilt } from "./hooks";
import { Reveal } from "./primitives";

/** These have no public URL and no footage, so the mark stands in for a
 *  screenshot rather than leaving the card top empty. */
function LogoHero() {
  return (
    <div className="relative grid h-[168px] shrink-0 place-items-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-coal to-void">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(215,251,58,.10),transparent_62%)]" />
      <Image
        src="/ken_logo.svg"
        alt=""
        width={120}
        height={100}
        unoptimized
        className="relative h-[68px] w-auto opacity-25 transition-opacity duration-500 group-hover:opacity-45"
      />
    </div>
  );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  const ref = useTilt<HTMLElement>(6);

  return (
    <Reveal className="h-full">
      <article
        ref={ref}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-smoke/60 transition-colors hover:border-lime/40"
        style={{ transformStyle: "preserve-3d" }}
      >
        <LogoHero />

        <div className="flex flex-1 flex-col p-6">
          <span className="font-jet text-xs text-lime">
            {String(index + 1).padStart(2, "0")} / {project.platform}
          </span>
          <h3 className="mt-2 text-xl font-medium leading-snug text-neutral-100">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {project.metrics ?? project.description}
          </p>

          <div className="mt-auto pt-5">
            <p className="font-jet text-[10px] uppercase tracking-[0.2em] text-neutral-600">
              {project.techStack.slice(0, 4).join(" · ")}
            </p>
            {project.disclaimer && (
              <p className="mt-2 font-jet text-[10px] text-neutral-700">{project.disclaimer}</p>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** The platform work with no public URL — same card language as the gallery,
 *  in a grid, so nothing from the catalog gets demoted to a footnote. */
export function MoreWork() {
  return (
    <section className="border-t border-white/10 bg-coal/40 py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[7vw] font-medium leading-none tracking-[-0.04em] text-neutral-100 sm:text-[3vw]">
            Also shipped<span className="text-lime">.</span>
          </h2>
          <span className="font-jet text-[11px] uppercase tracking-[0.25em] text-neutral-600">
            Internal platform work
          </span>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, i) => (
            <WorkCard key={project.code} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
