import { Github, Linkedin, Mail, ArrowUpRight, Download, LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { socials, profile } from "@/data";

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 border-t border-line py-20">
      <SectionHeader
        label="contact"
        code="05"
        title="Get in touch"
        description="Open to fullstack roles with a frontend focus. The fastest ways to reach me:"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-line">
            {socials.map((s) => {
              const Icon = iconMap[s.icon];
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 border-b border-line bg-paper-raised px-5 py-4 outline-none transition-colors last:border-b-0 hover:bg-paper-sunken focus-visible:bg-paper-sunken"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-mute transition-colors group-hover:text-amber" />
                    <span className="w-16 shrink-0 font-mono text-[11px] uppercase tracking-label text-mute">
                      {s.label}
                    </span>
                    <span className="truncate text-sm text-ink">{s.handle}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex h-full flex-col justify-between rounded-lg border border-line-dark bg-slate p-6 text-paper">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-label text-paper/50">status</div>
              <div className="mt-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verify opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-verify" />
                </span>
                <span className="text-sm text-paper">{profile.availability}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
                Based in {profile.location}. Comfortable across time zones and remote teams.
              </p>
            </div>
            <a
              href={profile.resume}
              download
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-amber px-4 py-2.5 font-mono text-[12px] uppercase tracking-label text-slate outline-none transition-colors hover:bg-paper focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-slate"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
