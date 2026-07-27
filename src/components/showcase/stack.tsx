import { stackGroups } from "@/data/showcase";
import type { SkillGroup } from "@/data";
import { useTilt } from "./hooks";
import { Reveal } from "./primitives";

// First two groups carry the accents; the rest stay neutral so the grid
// doesn't turn into a colour chart.
const accentFor = (i: number) => (i === 0 ? "text-lime" : i === 1 ? "text-flame" : "text-neutral-300");

function StackCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useTilt<HTMLElement>();

  return (
    <Reveal className="h-full">
      <article
        ref={ref}
        className="h-full rounded-2xl border border-white/10 bg-smoke/70 p-8"
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className={`font-jet text-xs ${accentFor(index)}`}>
          {String(index + 1).padStart(2, "0")} / {group.category}
        </span>
        <ul className="mt-5 space-y-2 font-jet text-sm text-neutral-400">
          {group.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 border-t border-white/10 py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <h2 className="text-[9vw] font-medium leading-none tracking-[-0.04em] text-neutral-100 sm:text-[5.5vw]">
            The stack<span className="text-lime">.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((group, i) => (
            <StackCard key={group.code} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
