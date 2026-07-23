import { useRef, useState, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees — defaults to 8. */
  maxTilt?: number;
  /** Show a glare highlight that follows the cursor. */
  glare?: boolean;
};

// 3D perspective tilt that tracks the mouse.
// The perspective is applied on an outer wrapper so the inner card's
// border-radius + overflow-hidden rendering is not broken by the
// 3D transform context sitting on the same element.
export function TiltCard({ children, className, maxTilt = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  function handleMouse(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((py - 0.5) * -maxTilt * 2);
    rotateY.set((px - 0.5) * maxTilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    setHovering(false);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={{ perspective: 800 }}
      className={cn("relative h-full", className)}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY }}
        className="h-full"
      >
        {children}
        {glare && hovering && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-xl"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}
