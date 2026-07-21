import { cn } from "@/lib/utils";
import { ProjectState } from "@/data";

const styles: Record<ProjectState, { dot: string; text: string; ring: string; label: string }> = {
  live: { dot: "bg-verify", text: "text-verify", ring: "border-verify/40", label: "live" },
  native: { dot: "bg-brand", text: "text-brand", ring: "border-brand/40", label: "native" },
  internal: { dot: "bg-mute", text: "text-mute", ring: "border-line", label: "internal" },
};

export function StateBadge({ state, className }: { state: ProjectState; className?: string }) {
  const s = styles[state];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-label",
        s.ring,
        s.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}
