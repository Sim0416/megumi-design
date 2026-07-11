"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal, RevealGroup } from "./Reveal";
import { SectionKicker } from "./SectionKicker";
import { ImageLightboxModal } from "./ImageLightboxModal";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";

const FALLBACK_BADGE = "/efe/efe-logo.webp";

const FALLBACK_IMAGES = [
  "/efe/booth-1.webp",
  "/efe/booth-2.webp",
  "/efe/booth-3.webp",
  "/efe/booth-4.webp",
  "/efe/booth-5.webp",
  "/efe/booth-6.webp",
  "/efe/booth-7.webp",
  "/efe/booth-8.webp",
  "/efe/booth-9.webp",
];

export function Exhibition({ settings }: { settings: SiteSettings }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const badgeUrl = settings.exhibitionBadge
    ? urlFor(settings.exhibitionBadge).width(1200).height(340).url()
    : FALLBACK_BADGE;

  const images =
    settings.exhibitionImages && settings.exhibitionImages.length > 0
      ? settings.exhibitionImages.map((img) => urlFor(img).width(700).height(394).url())
      : FALLBACK_IMAGES;

  const fullImages =
    settings.exhibitionImages && settings.exhibitionImages.length > 0
      ? settings.exhibitionImages.map((img) => urlFor(img).auto("format").url())
      : FALLBACK_IMAGES;

  const current = useMemo(
    () => (openIndex !== null ? fullImages[openIndex] : null),
    [openIndex, fullImages]
  );

  return (
    <section className="washi-grain relative bg-ink-950 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <SectionKicker en="Exhibition" />
          <Reveal direction="up" delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight text-paper-50 sm:text-5xl md:text-6xl">
              {settings.exhibitionTitle ?? "As Seen at EFE Export Furniture Exhibition"}
            </h2>
          </Reveal>
          {settings.exhibitionDescription && (
            <Reveal direction="up" delay={0.15}>
              <p className="mt-5 font-body text-base leading-relaxed text-paper-100/60 md:text-lg">
                {settings.exhibitionDescription}
              </p>
            </Reveal>
          )}
        </div>

        <Reveal direction="scale" delay={0.2} className="mx-auto mt-14 max-w-3xl">
          <div className="relative aspect-[7/2] w-full overflow-hidden rounded-sm border border-gold-500/30 shadow-[0_0_60px_-15px_rgba(184,134,62,0.35)]">
            <Image
              src={badgeUrl}
              alt="EFE — Export Furniture Exhibition Malaysia"
              fill
              className="object-cover"
            />
          </div>
          {settings.exhibitionMeta && (
            <p className="mt-4 text-center font-body text-sm uppercase tracking-[0.25em] text-gold-400">
              {settings.exhibitionMeta}
            </p>
          )}
        </Reveal>

        <RevealGroup
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5"
          stagger={0.08}
        >
          {images.map((src, i) => (
            <Reveal
              key={src}
              direction="up"
              delay={(i % 3) * 0.05}
              className="group relative aspect-video w-full overflow-hidden rounded-sm border border-gold-700/25"
            >
              <button
                aria-label={`View larger exhibition photo ${i + 1}`}
                onClick={() => setOpenIndex(i)}
                className="absolute inset-0 z-10 cursor-zoom-in"
              />
              <Image
                src={src}
                alt={`Megumi Design at EFE Exhibition ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold-500/10 transition-colors duration-500 group-hover:ring-gold-500/30" />
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <ImageLightboxModal
        src={current}
        alt="Megumi Design at EFE Exhibition"
        onClose={() => setOpenIndex(null)}
        onPrev={
          fullImages.length > 1
            ? () => setOpenIndex((i) => (i === null ? null : (i - 1 + fullImages.length) % fullImages.length))
            : undefined
        }
        onNext={
          fullImages.length > 1
            ? () => setOpenIndex((i) => (i === null ? null : (i + 1) % fullImages.length))
            : undefined
        }
      />
    </section>
  );
}
