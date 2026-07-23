import { Quote } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/section-header";
import { ScaleReveal, SlideIn } from "@/components/scroll-reveal";
import { TiltCard } from "@/components/tilt-card";
import { testimonials } from "@/data";

export function BentoReviews() {
  return (
    <section id="reviews" className="scroll-mt-16 border-t border-line py-16 overflow-x-clip">
      <ScaleReveal from={0.6}>
        <SectionHeader
          label="reviews"
          code="04"
          title="Field reports"
          description="Verbatim references from the managers, leads, and designers I've shipped alongside."
        />
      </ScaleReveal>
      <div className="mt-8 columns-1 gap-4 md:columns-2 lg:columns-3">
        {testimonials.map((t, i) => (
          <SlideIn
            key={t.id}
            from={i % 2 === 0 ? "left" : "right"}
            distance={80 + i * 15}
            rotate={2}
          >
            <TiltCard maxTilt={6} className="mb-4">
              <figure className="break-inside-avoid rounded-xl border border-line bg-paper-raised p-6">
                <div className="flex justify-end">
                  <Quote className="h-5 w-5 text-brand/50" />
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-soft">{t.message}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-5">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line">
                    <Image src={t.image} alt={t.name} width={44} height={44} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold tracking-tight text-ink">{t.name}</div>
                    <div className="font-mono text-[11px] uppercase tracking-label text-mute">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </TiltCard>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}
