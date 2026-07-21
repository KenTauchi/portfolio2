import { Boxes, Palette, Layers, FlaskConical, Database, Sparkles, Cloud, LucideIcon } from "lucide-react";
import { SkillGroup } from "@/data";

const icons: Record<string, LucideIcon> = {
  "TK-01": Boxes,
  "TK-02": Palette,
  "TK-03": Layers,
  "TK-04": FlaskConical,
  "TK-05": Database,
  "TK-06": Sparkles,
  "TK-07": Cloud,
};

// A skill group rendered as a design-token palette: a category header
// with an id, and the items as monospaced token chips.
export const TechCard = ({ skillGroup }: { skillGroup: SkillGroup }) => {
  const Icon = icons[skillGroup.code] ?? Boxes;
  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-paper-raised p-5 transition-colors duration-300 hover:border-brand/40">
      <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 text-brand" />
          <h3 className="font-display text-[15px] font-semibold tracking-tight text-ink">
            {skillGroup.category}
          </h3>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {skillGroup.items.map((skill) => (
          <span
            key={skill}
            className="rounded border border-line bg-paper px-2.5 py-1 font-mono text-[12px] text-ink-soft transition-colors hover:border-brand/50 hover:text-ink"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
