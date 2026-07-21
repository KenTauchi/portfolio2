import { SectionHeader } from "@/components/section-header";
import { TechCard } from "@/components/tech-card";
import { Reveal } from "@/components/reveal";
import { skills } from "@/data";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-16 border-t border-line py-20">
      <SectionHeader
        label="stack"
        code="03"
        title="Token palette"
        description="The tools I reach for, grouped like the tokens of a design system — from core framework down to the AI-augmented workflow I now build with."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.code} delay={(i % 3) * 0.05} className="h-full">
            <TechCard skillGroup={group} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
