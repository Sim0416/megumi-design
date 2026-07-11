import { Reveal } from "./Reveal";
import { SectionKicker } from "./SectionKicker";
import { Stats } from "./Stats";
import { PortableTextRenderer } from "./PortableTextRenderer";
import type { SiteSettings } from "@/sanity/lib/types";

export function About({
  settings,
  fallbackParagraphs,
}: {
  settings: SiteSettings;
  fallbackParagraphs: string[];
}) {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-950 py-28 md:py-36">
      <span
        aria-hidden
        className="text-outline-gold pointer-events-none absolute left-1/2 top-16 -z-0 hidden -translate-x-1/2 select-none whitespace-nowrap font-display text-[10rem] font-black leading-none opacity-[0.08] md:block lg:text-[14rem]"
      >
        MEGUMI
      </span>

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <SectionKicker en="About Us" align="center" />

        <Reveal direction="up" delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight text-paper-50 sm:text-5xl md:text-6xl">
            {settings.aboutTitle}
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.2} className="mt-8 text-left sm:text-center">
          {settings.aboutBody && settings.aboutBody.length > 0 ? (
            <PortableTextRenderer value={settings.aboutBody} />
          ) : (
            fallbackParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mb-5 font-body text-lg leading-relaxed text-paper-100/75 md:text-xl"
              >
                {paragraph}
              </p>
            ))
          )}
        </Reveal>

        {settings.quoteText && (
          <Reveal direction="up" delay={0.3}>
            <div className="mt-14 flex flex-col items-center">
              <span aria-hidden className="h-px w-16 bg-gold-500/60" />
              <p className="mt-8 font-display text-2xl italic leading-relaxed text-gold-300 md:text-3xl">
                “{settings.quoteText}”
              </p>
              {settings.quoteAuthor && (
                <cite className="mt-4 block font-body text-sm uppercase tracking-[0.2em] text-paper-100/50 not-italic">
                  — {settings.quoteAuthor}
                </cite>
              )}
              <span aria-hidden className="mt-8 h-px w-16 bg-gold-500/60" />
            </div>
          </Reveal>
        )}
      </div>

      {settings.stats && settings.stats.length > 0 && (
        <div className="relative mx-auto mt-24 max-w-7xl px-6 md:mt-32 lg:px-10">
          <Stats stats={settings.stats} />
        </div>
      )}
    </section>
  );
}
