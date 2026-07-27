import { marqueeItems } from "@/data/showcase";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <span className="flex gap-10 pr-10" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <span key={item} className="contents">
          <span>{item}</span>
          <span className="text-lime">✦</span>
        </span>
      ))}
    </span>
  );
}

export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-coal/60 py-5">
      <div className="sc-marquee gap-10 font-jet text-sm uppercase tracking-[0.25em] text-neutral-500">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
