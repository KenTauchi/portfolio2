import { Metric } from "@/data";

// A performance metric rendered as a design token: the label is styled
// like a CSS custom property, the value like a token's resolved value.
export function StatToken({ metric }: { metric: Metric }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-line bg-paper-raised p-5 transition-colors duration-300 hover:border-brand/50">
      <span className="absolute left-0 top-0 h-full w-1 bg-brand" />
      <span className="font-mono text-[11px] text-mute">{metric.varName}</span>
      <div className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        {metric.value}
      </div>
      <div className="mt-1.5 text-sm leading-snug text-ink-soft">{metric.label}</div>
    </div>
  );
}
