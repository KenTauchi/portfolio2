import { useEffect, useRef, useState } from "react";

/**
 * Maps vertical scroll through a tall section onto a horizontal track.
 *
 * The section is `height: 400vh` with a `sticky` inner screen; scroll progress
 * drives `translate3d` on the track and the `01 / 04` counter follows.
 *
 * Pass `enabled: false` on touch / small screens — there the track is rendered
 * as a native `overflow-x: auto` swipe area instead, because the sticky +
 * scroll-map approach fights mobile browsers.
 */
export function useHorizontalPin(count: number, enabled: boolean) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (!enabled) {
      track.style.transform = "";
      setIndex(1);
      return;
    }

    let distance = 0;
    let raf = 0;
    let current = 1;

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth + 40);
    };

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      track.style.transform = `translate3d(${-p * distance}px,0,0)`;

      const next = Math.min(count, Math.floor(p * (count - 0.001)) + 1);
      if (next !== current) {
        current = next;
        setIndex(next);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();

    // Track width depends on fonts and video metadata landing.
    const ro = new ResizeObserver(onResize);
    ro.observe(track);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      track.style.transform = "";
    };
  }, [count, enabled]);

  return { sectionRef, trackRef, index };
}
