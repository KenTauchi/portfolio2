import { SectionHeader } from "@/components/section-header";
import { TechCard } from "@/components/tech-card";
import { ScaleReveal, SlideIn } from "@/components/scroll-reveal";
import { TiltCard } from "@/components/tilt-card";
import { skills } from "@/data";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-16 border-t border-line py-20 overflow-x-clip">
      <ScaleReveal from={0.6}>
        <SectionHeader
          label="stack"
          code="03"
          title="Token palette"
          description="The tools I reach for, grouped like the tokens of a design system — from core framework down to the AI-augmented workflow I now build with."
        />
      </ScaleReveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <SlideIn
            key={group.code}
            from={i % 2 === 0 ? "left" : "right"}
            distance={100 + i * 20}
            rotate={3}
          >
            <TiltCard maxTilt={8}>
              <TechCard skillGroup={group} />
            </TiltCard>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}
