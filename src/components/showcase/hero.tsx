import Image from "next/image";
import { heroBlurb, heroLines, heroMeta, profile } from "@/data/showcase";
import { useShaderBackground } from "./use-shader-background";
import { MagneticLink, Reveal, SplitLine } from "./primitives";

export function Hero({ started }: { started: boolean }) {
  const canvasRef = useShaderBackground();

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-32 sm:px-10">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-10 h-full w-full" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/45 to-void/80" />

      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-jet text-[11px] uppercase tracking-[0.3em] text-neutral-500">
          {heroMeta.map((item, i) => (
            <span key={item} className="contents">
              {i > 0 && <span className="text-lime">/</span>}
              <span>{item}</span>
            </span>
          ))}
        </Reveal>

        <h1 className="mt-8 text-[8.6vw] font-medium leading-[0.9] tracking-[-0.045em] text-neutral-100">
          {heroLines.map((segments, i) => (
            <SplitLine key={i} segments={segments} active={started} />
          ))}
        </h1>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-[1.1fr_.9fr]">
          <Reveal className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15">
                <Image
                  src="/profile.jpg"
                  alt=""
                  fill
                  sizes="44px"
                  priority
                  className="object-cover object-top grayscale"
                />
              </span>
              <span className="font-jet text-[11px] uppercase leading-relaxed tracking-[0.2em] text-neutral-500">
                {profile.name}
                <br />
                {profile.role}
              </span>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-neutral-400">{heroBlurb}</p>
          </Reveal>

          <Reveal className="flex flex-wrap items-start gap-3 md:justify-end">
            <MagneticLink
              href="#work"
              className="rounded-full bg-lime px-7 py-4 font-jet text-xs uppercase tracking-[0.2em] text-void hover:bg-white"
            >
              Selected work ↓
            </MagneticLink>
            <MagneticLink
              href="#contact"
              className="rounded-full border border-white/20 px-7 py-4 font-jet text-xs uppercase tracking-[0.2em] text-neutral-200 hover:border-lime hover:text-lime"
            >
              Hire me
            </MagneticLink>
          </Reveal>
        </div>
      </div>

      {/* Hidden on small screens, where the hero content is taller than the
          viewport and these would sit on top of the CTAs. */}
      <div className="pointer-events-none absolute bottom-8 left-6 hidden font-jet text-[10px] uppercase tracking-[0.3em] text-neutral-600 sm:left-10 lg:block">
        Scroll
      </div>
      <div className="pointer-events-none absolute bottom-8 right-6 hidden font-jet text-[10px] uppercase tracking-[0.3em] text-neutral-600 sm:right-10 lg:block">
        {profile.location} — Remote friendly
      </div>
    </section>
  );
}
