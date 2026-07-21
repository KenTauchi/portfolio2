import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string; // e.g. "identity"
  code: string; // e.g. "01"
  title?: string;
  description?: string;
  className?: string;
};

// The recurring "documented component" eyebrow: mono label — hairline — code.
export function SectionHeader({ label, code, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] uppercase tracking-label text-mute">{label}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[11px] tracking-label text-brand">{code}</span>
      </div>
      {title && (
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
      )}
      {description && <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
