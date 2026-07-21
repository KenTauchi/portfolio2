import { ReactNode } from "react";
import { ArrowUpRight, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StateBadge } from "@/components/state-badge";
import { Project } from "@/data";

type ProjectCardProps = Project & { className?: string; demoSlot?: ReactNode };

// A project rendered as a documented component entry: id + state in the
// header, description, "props" (tech stack), and a resolved metric.
export const ProjectCard = (props: ProjectCardProps) => {
  const { code, title, type, state, platform, description, metrics, link, disclaimer, linkAdditionalText, techStack, demoSlot, className } = props;

  const hasLink = !!link && link.length > 0;

  return (
    <div
      className={cn(
        "group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-lg border border-line bg-paper-raised transition-all duration-300 hover:border-brand/60 hover:shadow-[0_6px_24px_-12px_rgba(23,24,27,0.25)]",
        className
      )}
    >
      {/* meta header */}
      <div className="flex items-center justify-between gap-2 border-b border-line px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] tracking-label text-mute">{code}</span>
          <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-ink-soft">
            {type}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="hidden font-mono text-[10px] uppercase tracking-label text-mute sm:inline">
            {platform}
          </span>
          {demoSlot}
          <StateBadge state={state} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {hasLink ? (
          <a
            href={link![0]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-1.5 rounded-sm font-display text-lg font-semibold tracking-tight text-ink outline-none transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper-raised"
          >
            {title}
            <ArrowUpRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h3>
        )}

        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{description}</p>

        {/* props */}
        <div className="mt-4">
          <span className="font-mono text-[10px] uppercase tracking-label text-mute">props</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-line bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-soft transition-colors group-hover:border-line"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* metric + notes */}
        <div className="mt-auto pt-5">
          {metrics && (
            <div className="flex items-start gap-2 border-t border-line pt-4">
              <BarChart3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              <p className="text-[13px] leading-snug text-ink-soft">{metrics}</p>
            </div>
          )}
          {!hasLink && disclaimer && (
            <p className="mt-2.5 font-mono text-[10px] text-mute">{disclaimer}</p>
          )}
          {hasLink && link!.length > 1 && (
            <p className="mt-2.5 font-mono text-[10px] uppercase tracking-label text-mute">
              {link!.length} sites {linkAdditionalText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
