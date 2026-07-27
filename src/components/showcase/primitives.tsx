import { AnchorHTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { HeroSegment } from "@/data/showcase";
import {
  isCoarsePointer,
  prefersReducedMotion,
  useMagnetic,
  useReveal,
  useScramble,
  useScrollProgress,
} from "./hooks";

/* ── reveal wrapper ───────────────────────────────────────────── */

export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "span";
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={cn("sc-reveal", className)}>
      {children}
    </Tag>
  );
}

/* ── links ────────────────────────────────────────────────────── */

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children: string };

/** Decodes through random glyphs on hover. Children must be a plain string. */
export function ScrambleLink({ className, children, ...props }: AnchorProps) {
  const ref = useScramble<HTMLAnchorElement>();
  return (
    <a ref={ref} data-cursor className={className} {...props}>
      {children}
    </a>
  );
}

/** Translates toward the pointer while hovered. */
export function MagneticLink({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      data-cursor
      className={cn(
        "transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/* ── split text ───────────────────────────────────────────────── */

/** One masked hero line; every character staggers translateY(105%) → 0. */
export function SplitLine({ segments, active }: { segments: HeroSegment[]; active: boolean }) {
  let charIndex = 0;

  return (
    <span className={cn("sc-line-mask", active && "in")}>
      {segments.map((segment, si) => (
        <span
          key={si}
          className={
            segment.variant === "outline" ? "sc-outline" : segment.variant === "accent" ? "text-lime" : undefined
          }
        >
          {[...segment.text].map((char, ci) => {
            const delay = charIndex++ * 22 + 120;
            return (
              <span key={ci} className="sc-char" style={{ transitionDelay: `${delay}ms` }}>
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/* ── custom cursor ────────────────────────────────────────────── */

/**
 * Dot + lerped ring in `mix-blend-mode: difference`. The ring expands over any
 * `[data-cursor]` element and shows a DRAG label over `[data-drag]`.
 *
 * Adds `sc-cursor-on` to the showcase root only once it is actually running, so
 * `cursor: none` never applies without a replacement cursor on screen.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || isCoarsePointer()) return;

    const root = document.querySelector(".showcase-root");
    root?.classList.add("sc-cursor-on");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    // Delegated so it covers everything rendered, now or later.
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      if (!hit) return;
      ring.classList.add("is-active");
      if (hit.hasAttribute("data-drag")) ring.classList.add("is-drag");
    };
    const onOut = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      if (!hit) return;
      const next = e.relatedTarget as HTMLElement | null;
      if (next?.closest?.("[data-cursor]") === hit) return;
      ring.classList.remove("is-active", "is-drag");
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
      ring.style.transform = `translate(${rx - 19}px, ${ry - 19}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      root?.classList.remove("sc-cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="sc-cursor" aria-hidden />
      <div ref={ringRef} className="sc-cursor-ring" aria-hidden />
    </>
  );
}

/* ── scroll progress ──────────────────────────────────────────── */

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed left-0 top-0 z-[75] h-[2px] bg-lime"
      style={{ width: `${progress * 100}%` }}
      aria-hidden
    />
  );
}

/* ── loader ───────────────────────────────────────────────────── */

/** Counts 00 → 100, slides up, then hands off to the hero character animation. */
export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onComplete();
    };

    if (prefersReducedMotion()) {
      setCount(100);
      setHidden(true);
      finish();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let value = 0;

    const interval = setInterval(() => {
      value = Math.min(100, value + Math.ceil(Math.random() * 12));
      setCount(value);
      if (value < 100) return;

      clearInterval(interval);
      timers.push(
        setTimeout(() => {
          setGone(true);
          finish();
          timers.push(setTimeout(() => setHidden(true), 950));
        }, 200)
      );
    }, 85);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={cn(
        "sc-loader fixed inset-0 z-[95] flex items-end justify-between bg-void px-6 pb-8 sm:px-10",
        gone && "done"
      )}
    >
      <span className="font-jet text-xs uppercase tracking-[0.3em] text-neutral-600">Ken Tauchi — Portfolio</span>
      <span className="font-jet text-6xl font-medium text-neutral-200 sm:text-8xl">
        {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}
