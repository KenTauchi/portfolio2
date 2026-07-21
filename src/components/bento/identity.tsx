import Image from "next/image";
import { Github, Linkedin, Mail, Download, LucideIcon } from "lucide-react";
import { StatToken } from "@/components/stat-token";
import HighlightText from "@/components/highlight-text";
import { metrics, profile, socials } from "@/data";

const iconMap: Record<string, LucideIcon> = { github: Github, linkedin: Linkedin, mail: Mail };
const focus = ["React", "React Native", "AI-augmented"];

// The bento hero: identity, metrics, status, connect and focus as a mosaic.
export function BentoIdentity() {
  return (
    <section id="identity" className="scroll-mt-16 pb-16 pt-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[168px] lg:grid-cols-4 lg:[grid-auto-flow:dense]">
        {/* name / thesis */}
        <div className="flex flex-col rounded-xl border border-line bg-paper-raised p-6 sm:col-span-2 lg:row-span-2">
          <p className="font-mono text-[11px] uppercase tracking-label text-mute">Fullstack Engineer</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Ken Tauchi</h1>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
            Building fast <HighlightText text="React & React Native" /> products end to end, with AI as a
            first-class part of how I plan, build, test, and ship.
          </p>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-md border border-ink bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-label text-paper transition-colors hover:bg-transparent hover:text-ink"
            >
              <Download className="h-3.5 w-3.5" /> Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md border border-line px-4 py-2 font-mono text-[12px] uppercase tracking-label text-ink transition-colors hover:border-amber/60"
            >
              Contact
            </a>
          </div>
        </div>

        {/* photo */}
        <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-line bg-paper-raised lg:row-span-2">
          <Image
            src="/profile.jpg"
            alt="Ken Tauchi"
            fill
            sizes="(max-width: 1024px) 50vw, 300px"
            className="object-cover"
            priority
          />
        </div>

        {/* metrics */}
        {metrics.map((m) => (
          <StatToken key={m.varName} metric={m} />
        ))}

        {/* status */}
        <div className="flex flex-col justify-center rounded-xl border border-line bg-paper-raised p-5">
          <div className="font-mono text-[10px] uppercase tracking-label text-mute">status</div>
          <div className="mt-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verify opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-verify" />
            </span>
            <span className="text-sm text-ink">Open to opportunities</span>
          </div>
          <div className="mt-1 font-mono text-[11px] text-mute">{profile.location}</div>
        </div>

        {/* connect */}
        <div className="flex flex-col justify-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
          <div className="font-mono text-[10px] uppercase tracking-label text-mute">connect</div>
          <div className="flex gap-2">
            {socials.map((s) => {
              const Icon = iconMap[s.icon];
              const ext = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink transition-colors hover:border-amber/60 hover:text-amber"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* focus (dark tile for contrast) */}
        <div className="flex flex-col justify-center rounded-xl border border-line-dark bg-slate p-5 text-paper">
          <div className="font-mono text-[10px] uppercase tracking-label text-paper/50">focus</div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {focus.map((c) => (
              <span
                key={c}
                className="rounded border border-line-dark bg-slate-raised px-2 py-0.5 font-mono text-[11px] text-paper/80"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
