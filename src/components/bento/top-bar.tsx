import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data";

const nav = ["work", "stack", "reviews", "contact"];

export function BentoTopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#identity" className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-[6px] bg-ink font-display text-[13px] font-bold text-paper">
            KT
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink">Ken Tauchi</span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex">
          {nav.map((n) => (
            <a
              key={n}
              href={`#${n}`}
              className="rounded-md px-2.5 py-1.5 font-mono text-[12px] uppercase tracking-label text-mute transition-colors hover:text-ink"
            >
              {n}
            </a>
          ))}
          <a
            href={profile.resume}
            download
            className="ml-3 inline-flex items-center gap-1.5 rounded-md border border-ink bg-ink px-3 py-1.5 font-mono text-[12px] uppercase tracking-label text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
        </nav>

        <button
          className="grid h-9 w-9 place-items-center rounded-md text-ink transition-colors hover:bg-paper-sunken md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <div className="mx-auto flex max-w-[1200px] flex-col px-4 py-3 sm:px-6">
              {nav.map((n) => (
                <a
                  key={n}
                  href={`#${n}`}
                  onClick={() => setOpen(false)}
                  className="py-2.5 font-mono text-[13px] uppercase tracking-label text-mute"
                >
                  {n}
                </a>
              ))}
              <a
                href={profile.resume}
                download
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md border border-ink bg-ink px-3 py-2 font-mono text-[12px] uppercase tracking-label text-paper"
              >
                <Download className="h-3.5 w-3.5" /> Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
