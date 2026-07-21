import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Entrance fade-up driven by a CSS keyframe (see tailwind `animation.fade-up`).
// CSS animations run on the compositor, so content never depends on a JS
// animation loop that could stall — and the global reduced-motion rule in
// globals.css snaps it to fully visible for users who prefer reduced motion.
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <div className={cn("animate-fade-up", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
