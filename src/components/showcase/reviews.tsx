import Image from "next/image";
import { reviews } from "@/data/showcase";
import { Reveal } from "./primitives";

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 border-t border-white/10 bg-coal/40 py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[9vw] font-medium leading-none tracking-[-0.04em] text-neutral-100 sm:text-[5.5vw]">
            What they say<span className="text-lime">.</span>
          </h2>
          <span className="font-jet text-[11px] uppercase tracking-[0.25em] text-neutral-600">
            From LinkedIn recommendations
          </span>
        </Reveal>

        {/* Masonry keeps the long recommendations from stretching their neighbours. */}
        <div className="mt-14 gap-5 md:columns-2 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {reviews.map((review) => (
            <Reveal key={review.code}>
              <figure className="rounded-2xl border border-white/10 bg-smoke/70 p-8">
                <span className="font-jet text-4xl leading-none text-lime" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-neutral-400">{review.message}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/15">
                    <Image src={review.image} alt="" fill sizes="36px" className="object-cover grayscale" />
                  </span>
                  <span className="font-jet text-[10px] uppercase leading-relaxed tracking-[0.2em] text-neutral-500">
                    <span className="text-neutral-200">{review.name}</span>
                    <br />
                    {review.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
