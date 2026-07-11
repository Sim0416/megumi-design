"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal, RevealGroup } from "./Reveal";
import { SectionKicker } from "./SectionKicker";
import { ImageLightboxModal } from "./ImageLightboxModal";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";

export function FactoryGallery({ settings }: { settings: SiteSettings }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const images = settings.factoryImages ?? [];

  const urls = useMemo(
    () => images.map((image) => urlFor(image).auto("format").url()),
    [images]
  );

  if (images.length === 0) return null;

  return (
    <section className="washi-grain relative bg-ink-900 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-right">
          <SectionKicker en="Our Factory" align="right" />
          <Reveal direction="up" delay={0.1}>
            <h2 className="ml-auto mt-6 max-w-2xl font-display text-4xl font-extrabold leading-tight text-paper-50 sm:text-5xl md:text-6xl">
              {settings.factoryTitle ?? "Inside Our Factory"}
            </h2>
          </Reveal>
          {settings.factoryDescription && (
            <Reveal direction="up" delay={0.15}>
              <p className="ml-auto mt-5 max-w-xl font-body text-base leading-relaxed text-paper-100/60 md:text-lg">
                {settings.factoryDescription}
              </p>
            </Reveal>
          )}
        </div>

        <RevealGroup
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
          stagger={0.1}
        >
          {images.map((image, i) => (
            <Reveal
              key={i}
              direction="up"
              className="group relative aspect-video w-full overflow-hidden rounded-sm border border-gold-700/25"
            >
              <button
                aria-label={`View larger factory photo ${i + 1}`}
                onClick={() => setOpenIndex(i)}
                className="absolute inset-0 z-10 cursor-zoom-in"
              />
              <Image
                src={urlFor(image).width(960).height(540).url()}
                alt={`${settings.factoryTitle ?? "Megumi Design factory"} ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold-500/10 transition-colors duration-500 group-hover:ring-gold-500/30" />
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <ImageLightboxModal
        src={openIndex !== null ? urls[openIndex] : null}
        alt={settings.factoryTitle ?? "Megumi Design factory"}
        onClose={() => setOpenIndex(null)}
        onPrev={
          urls.length > 1
            ? () => setOpenIndex((i) => (i === null ? null : (i - 1 + urls.length) % urls.length))
            : undefined
        }
        onNext={
          urls.length > 1
            ? () => setOpenIndex((i) => (i === null ? null : (i + 1) % urls.length))
            : undefined
        }
      />
    </section>
  );
}
