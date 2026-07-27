import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { contact, profile } from "@/data/showcase";
import { useEscape, useScrollLock } from "./hooks";
import { ScrambleLink } from "./primitives";

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useScrollLock(open);
  useEscape(close, open);

  return (
    <>
      {/* Full-screen menu — clip-path wipe, per-link transition delay */}
      <div
        id="sc-menu"
        className={cn(
          "sc-menu fixed inset-0 z-[80] flex flex-col justify-center bg-coal px-6 sm:px-10",
          open ? "open" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <nav className="mx-auto w-full max-w-[1400px]">
          <ul className="space-y-2">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <ScrambleLink
                  href={link.href}
                  onClick={close}
                  tabIndex={open ? 0 : -1}
                  className="text-[11vw] font-medium leading-[1.02] tracking-[-0.04em] text-neutral-100 hover:text-lime sm:text-[7vw]"
                  style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
                >
                  {link.label.toUpperCase()}
                </ScrambleLink>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-wrap gap-x-12 gap-y-3 border-t border-white/10 pt-6 font-jet text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            <span>{contact.email}</span>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" data-cursor tabIndex={open ? 0 : -1}>
              GitHub ↗
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" data-cursor tabIndex={open ? 0 : -1}>
              LinkedIn ↗
            </a>
            <span className="text-lime">{profile.availability}</span>
          </div>
        </nav>
      </div>

      {/* Nav — mix-blend-difference so it reads over the shader and the light panels */}
      <header className="fixed inset-x-0 top-0 z-[85] mix-blend-difference">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10">
          <a href="#top" data-cursor className="font-jet text-sm font-medium tracking-tight text-white">
            KEN<span className="text-lime">.</span>TAUCHI
          </a>

          <ul className="hidden gap-8 font-jet text-xs uppercase tracking-[0.2em] text-white md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <ScrambleLink href={link.href} className="sc-underline">
                  {link.label}
                </ScrambleLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            data-cursor
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sc-menu"
            className="flex items-center gap-2 font-jet text-xs uppercase tracking-[0.2em] text-white"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="flex h-4 w-5 flex-col justify-center gap-[3px]">
              <span
                className="block h-[1.5px] w-full bg-white transition-transform duration-300"
                style={{ transform: open ? "translateY(2.5px) rotate(45deg)" : undefined }}
              />
              <span
                className="block h-[1.5px] w-full bg-white transition-transform duration-300"
                style={{ transform: open ? "translateY(-2px) rotate(-45deg)" : undefined }}
              />
            </span>
          </button>
        </nav>
      </header>
    </>
  );
}
