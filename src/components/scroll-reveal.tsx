import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Simple one-shot reveal (stagger-compatible) ─── */

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

const item: Variants = {
  hidden: (y: number) => ({ opacity: 0, y }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

export function ScrollReveal({ children, className, delay = 0, y = 32 }: ScrollRevealProps) {
  return (
    <motion.div
      variants={item}
      custom={y}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container ─── */

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

const container: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

export function StaggerContainer({ children, className, stagger = 0.08 }: StaggerContainerProps) {
  return (
    <motion.div
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* ─── Apple-style scroll parallax ─── */

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px. */
  offset?: number;
  /** Start scale (grows to 1 at center). */
  scaleFrom?: number;
  /** Fade in/out with scroll. */
  fade?: boolean;
};

export function ScrollParallax({
  children,
  className,
  offset = 60,
  scaleFrom = 0.96,
  fade = true,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [offset, 0, -offset]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [scaleFrom, 1, 1, scaleFrom]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, ...(fade ? { opacity } : {}) }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* ─── Dramatic slide-in from left or right ─── */

type SlideInProps = {
  children: ReactNode;
  className?: string;
  /** "left" or "right" — the direction it slides from. */
  from?: "left" | "right";
  /** How far off-screen it starts, in px. */
  distance?: number;
  /** Rotation in degrees at start. */
  rotate?: number;
};

export function SlideIn({
  children,
  className,
  from = "left",
  distance = 120,
  rotate = 6,
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const dir = from === "left" ? -1 : 1;
  const x = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [dir * distance, 0, 0, dir * -distance * 0.3]);
  const r = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [dir * rotate, 0, 0, dir * -rotate * 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ x, rotate: r, opacity }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/* ─── Dramatic scale reveal (like Apple product hero) ─── */

type ScaleRevealProps = {
  children: ReactNode;
  className?: string;
  /** Start scale (e.g. 0.6 for dramatic zoom-in). */
  from?: number;
  /** End scale when leaving viewport. */
  to?: number;
};

export function ScaleReveal({
  children,
  className,
  from = 0.7,
  to = 1.05,
}: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [from, 1, 1, to]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
