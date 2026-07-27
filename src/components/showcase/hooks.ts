import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/* ── environment guards ───────────────────────────────────────── */

const canMatch = () => typeof window !== "undefined" && typeof window.matchMedia === "function";

export const prefersReducedMotion = () =>
  canMatch() && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isCoarsePointer = () => canMatch() && window.matchMedia("(pointer: coarse)").matches;

/** Subscribes to a media query. Returns `false` on the server and on first paint,
 *  so anything gated on it must render an acceptable non-matching state. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!canMatch()) return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** The pinned gallery only behaves on a real desktop viewport with a fine pointer. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px) and (pointer: fine)");

/* ── reveal on scroll ─────────────────────────────────────────── */

/** Adds `.in` to an element you already hold a ref to, once it enters view.
 *  Use when the same node also needs another hook's ref. */
export function useRevealRef<T extends HTMLElement>(
  ref: RefObject<T | null>,
  rootMargin = "0px 0px -80px 0px"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.classList.add("in");
          io.disconnect();
        });
      },
      { threshold: 0, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
}

/** Adds `.in` once the element enters the viewport, then stops observing. */
export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -80px 0px") {
  const ref = useRef<T>(null);
  useRevealRef(ref, rootMargin);
  return ref;
}

/* ── scramble text ────────────────────────────────────────────── */

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

/** Decodes the label through random glyphs on hover. */
export function useScramble<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const original = el.textContent ?? "";
    let frame = 0;
    let raf = 0;

    const enter = () => {
      cancelAnimationFrame(raf);
      frame = 0;
      const queue = [...original].map((ch, i) => ({
        ch,
        start: Math.floor(i * 1.5),
        end: Math.floor(i * 1.5) + 8 + Math.random() * 8,
      }));

      const run = () => {
        let out = "";
        let done = 0;
        queue.forEach((q) => {
          if (frame >= q.end) {
            out += q.ch;
            done++;
          } else if (frame >= q.start) {
            out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          } else {
            out += q.ch;
          }
        });
        el.textContent = out;
        if (done < queue.length) {
          frame++;
          raf = requestAnimationFrame(run);
        } else {
          el.textContent = original;
        }
      };
      run();
    };

    el.addEventListener("mouseenter", enter);
    return () => {
      el.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
      el.textContent = original;
    };
  }, []);

  return ref;
}

/* ── magnetic buttons ─────────────────────────────────────────── */

/** Pulls the element toward the pointer while hovered. */
export function useMagnetic<T extends HTMLElement>(strengthX = 0.28, strengthY = 0.4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * strengthX;
      const dy = (e.clientY - r.top - r.height / 2) * strengthY;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const leave = () => {
      el.style.transform = "translate(0,0)";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      el.style.transform = "";
    };
  }, [strengthX, strengthY]);

  return ref;
}

/* ── tilt ─────────────────────────────────────────────────────── */

/** Rotates the card on a 900px perspective as the pointer crosses it. */
export function useTilt<T extends HTMLElement>(max = 11) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateY(-6px)`;
    };
    const leave = () => {
      el.style.transform = "perspective(900px)";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      el.style.transform = "";
    };
  }, [max]);

  return ref;
}

/* ── 3D portrait card ─────────────────────────────────────────── */

/** Pointer-driven rotation; `.sc-layer` children parallax on their own
 *  translateZ plane, and a radial glare follows the cursor. */
export function useCardParallax<T extends HTMLElement>(max = 16) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card || prefersReducedMotion() || isCoarsePointer()) return;

    const layers = Array.from(card.querySelectorAll<HTMLElement>(".sc-layer"));

    const move = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(1.02)`;
      card.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
      card.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth) || 40;
        layer.style.transform = `translate3d(${-px * depth * 0.35}px, ${-py * depth * 0.35}px, ${depth}px)`;
      });
    };
    const leave = () => {
      card.style.transform = "";
      layers.forEach((layer) => {
        layer.style.transform = "";
      });
    };

    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    return () => {
      card.removeEventListener("mousemove", move);
      card.removeEventListener("mouseleave", leave);
      leave();
    };
  }, [max]);

  return ref;
}

/* ── count up ─────────────────────────────────────────────────── */

/** Counts 0 → target with a cubic ease-out once the element is 60% visible. */
export function useCountUp<T extends HTMLElement>(target: number, duration = 1400) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setValue(target);
      setDone(true);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) raf = requestAnimationFrame(step);
            else setDone(true);
          };
          raf = requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, value, done };
}

/* ── scroll progress ──────────────────────────────────────────── */

/** 0 → 1 across the whole document. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/* ── body scroll lock ─────────────────────────────────────────── */

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/* ── keyboard ─────────────────────────────────────────────────── */

export function useEscape(onEscape: () => void, active: boolean) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    },
    [onEscape]
  );

  useEffect(() => {
    if (!active) return;
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler, active]);
}
