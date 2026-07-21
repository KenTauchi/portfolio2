import { ArrowUpRight, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/section-header";
import { ProjectCard } from "@/components/project-card";
import { StateBadge } from "@/components/state-badge";
import { Reveal } from "@/components/reveal";
import { projects, Project } from "@/data";

const href = (p: Project) => (p.link && p.link.length > 0 ? p.link[0] : undefined);

// The story half of a case-study row: headline result, description, stack, CTA.
function DetailsCard({ p }: { p: Project }) {
  const link = href(p);
  return (
    <div className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-xl border border-line bg-paper-raised p-6">
      <span className="absolute left-0 top-0 h-full w-1 bg-brand" />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] tracking-label text-mute">{p.code}</span>
          <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-ink-soft">
            {p.type}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="hidden font-mono text-[10px] uppercase tracking-label text-mute sm:inline">
            {p.platform}
          </span>
          <StateBadge state={p.state} />
        </div>
      </div>

      <div className="mt-auto pt-8">
        {p.highlight && (
          <>
            <div className="font-display text-5xl font-bold tracking-tight text-ink">
              {p.highlight.value}
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-label text-mute">
              {p.highlight.label}
            </div>
          </>
        )}
        <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.techStack.slice(0, 7).map((t) => (
            <span
              key={t}
              className="rounded border border-line bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex w-fit items-center gap-1.5 rounded-md border border-ink bg-ink px-3.5 py-2 font-mono text-[11px] uppercase tracking-label text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            Visit live site
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </div>
  );
}

// The visual half of a case-study row: the recording, clean, with a live tag.
function MovieTile({ p }: { p: Project }) {
  const link = href(p);
  const Wrapper = link ? "a" : "div";
  return (
    <Wrapper
      {...(link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative block h-full min-h-[300px] overflow-hidden rounded-xl border border-line"
    >
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src={p.src ?? undefined} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      {link && (
        <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white/90 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-label text-white backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-verify" />
        live {p.type === "Website" ? "site" : "app"}
      </span>
    </Wrapper>
  );
}

// One project as a paired row: results card + its recording, alternating sides.
function CaseStudyRow({ p, flip }: { p: Project; flip?: boolean }) {
  if (!p.src) return <DetailsCard p={p} />;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className={cn("h-full", flip && "lg:order-2")}>
        <DetailsCard p={p} />
      </div>
      <div className={cn("h-full", flip && "lg:order-1")}>
        <MovieTile p={p} />
      </div>
    </div>
  );
}

// Compact text-over-movie tile for recorded projects in the "more work" grid.
function VideoTile({ p }: { p: Project }) {
  const link = href(p);
  const Wrapper = link ? "a" : "div";
  return (
    <Wrapper
      {...(link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-xl border border-line"
    >
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src={p.src ?? undefined} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
      {link && (
        <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white/90 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
      <div className="relative p-6 text-white">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StateBadge state={p.state} />
          <span className="rounded border border-white/25 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-white/80">
            {p.type}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-label text-white/70">{p.platform}</span>
        </div>
        <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
        {(p.highlight || p.metrics) && (
          <div className="mt-2 flex items-center gap-2 text-[12px] text-white/90">
            <BarChart3 className="h-3.5 w-3.5 shrink-0" />
            {p.highlight ? `${p.highlight.value} ${p.highlight.label}` : p.metrics}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export function BentoWork() {
  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section id="work" className="scroll-mt-16 border-t border-line py-16">
      <SectionHeader
        label="work"
        code="02"
        title="Things I've built"
        description="Platforms and tools I've built, from multi-tenant SaaS to design systems — the live ones play right here."
      />

      <div className="mt-8 space-y-4">
        {featured.map((p, i) => (
          <Reveal key={p.code}>
            <CaseStudyRow p={p} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-label text-mute">more work</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.code} delay={(i % 3) * 0.05} className="h-full">
            {p.src ? <VideoTile p={p} /> : <ProjectCard {...p} />}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
