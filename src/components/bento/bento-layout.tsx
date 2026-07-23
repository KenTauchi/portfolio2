import { BentoTopBar } from "@/components/bento/top-bar";
import { BentoIdentity } from "@/components/bento/identity";
import { BentoWork } from "@/components/bento/work";
import { BentoReviews } from "@/components/bento/reviews";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";
import { MouseSpotlight } from "@/components/mouse-spotlight";

// Bento architecture: mosaic hero + reused catalog sections + masonry reviews.
export function BentoLayout() {
  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <MouseSpotlight />
      <BentoTopBar />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <BentoIdentity />
        <BentoWork />
        <Stack />
        <BentoReviews />
        <Contact />
      </div>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-label text-mute">© 2026 Ken Tauchi</p>
        </div>
      </footer>
    </div>
  );
}
