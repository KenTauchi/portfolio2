import { stats, type Stat } from "@/data/showcase";
import { useCountUp } from "./hooks";
import { Reveal } from "./primitives";

function StatItem({ stat }: { stat: Stat }) {
  const { ref, value, done } = useCountUp<HTMLParagraphElement>(stat.value);

  return (
    <Reveal className="border-t border-white/10 pt-5">
      <p ref={ref} className="font-jet text-5xl font-medium text-neutral-100">
        {stat.prefix}
        {value}
        {done ? stat.suffix : ""}
      </p>
      <p className="mt-2 font-jet text-[11px] uppercase tracking-[0.2em] text-neutral-500">{stat.label}</p>
    </Reveal>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
