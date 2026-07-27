import { cn } from "@/lib/utils";
import { galleryProjects } from "@/data/showcase";
import type { Project } from "@/data";
import { useIsDesktop } from "./hooks";
import { useHorizontalPin } from "./use-horizontal-pin";

function Panel({ project, index }: { project: Project; index: number }) {
  const href = project.link?.[0];
  const label = String(index + 1).padStart(2, "0");

  // Fixed media height + a footer that fills the remainder, so every panel in
  // the track ends on the same line no matter how its copy wraps.
  const frame = (
    <div className="sc-panel-frame flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-smoke/60">
      <div className="relative h-[38vh] min-h-[240px] shrink-0 overflow-hidden bg-gradient-to-br from-coal to-void">
        {project.src && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={`/${project.src}`} type="video/mp4" />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/45 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 items-end justify-between gap-6 border-t border-white/10 p-6">
        <div className="min-w-0">
          <span className="font-jet text-xs text-lime">
            {label} / {project.platform}
          </span>
          <h3 className="mt-2 text-2xl font-medium text-neutral-100 sm:text-3xl">
            {project.title}
            {href && <span className="ml-2 text-lime">↗</span>}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm text-neutral-500">
            {project.metrics ?? project.description}
          </p>
        </div>
        <span className="hidden shrink-0 font-jet text-[10px] uppercase tracking-[0.2em] text-neutral-600 sm:block">
          {project.techStack.slice(0, 3).join(" · ")}
        </span>
      </div>
    </div>
  );

  return (
    <article className="sc-panel snap-center" data-cursor data-drag>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {frame}
        </a>
      ) : (
        frame
      )}
    </article>
  );
}

/**
 * Pinned horizontal gallery.
 *
 * Desktop: a 400vh section with a sticky screen; scroll progress maps to
 * translate3d on the track and drives the counter.
 * Touch / small screens: the same track as a native snap-scroll swipe area —
 * the sticky + scroll-map approach fights mobile browsers.
 */
export function WorkGallery() {
  const isDesktop = useIsDesktop();
  const count = galleryProjects.length;
  const { sectionRef, trackRef, index } = useHorizontalPin(count, isDesktop);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative scroll-mt-0"
      style={isDesktop ? { height: `${count * 100}vh` } : undefined}
    >
      <div
        className={cn(
          "flex flex-col justify-center",
          isDesktop && "sticky top-0 h-screen overflow-hidden"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-end justify-between px-6 pb-8 pt-20 sm:px-10 lg:pt-0">
          <h2 className="text-[9vw] font-medium leading-none tracking-[-0.04em] text-neutral-100 sm:text-[4.5vw]">
            Selected work
          </h2>
          <span className="hidden font-jet text-xs uppercase tracking-[0.25em] text-neutral-600 sm:block">
            {isDesktop ? "Scroll →" : "Swipe →"} <span className="text-lime">{String(index).padStart(2, "0")}</span> /{" "}
            {String(count).padStart(2, "0")}
          </span>
        </div>

        <div
          ref={trackRef}
          className={cn(
            "flex gap-8 px-6 sm:px-10",
            isDesktop
              ? "will-change-transform"
              : "snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          {galleryProjects.map((project, i) => (
            <Panel key={project.code} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
