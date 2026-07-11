"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal, RevealGroup } from "./Reveal";
import { SectionKicker } from "./SectionKicker";
import { ImageLightboxModal } from "./ImageLightboxModal";
import { urlFor } from "@/sanity/lib/image";
import type { Service } from "@/sanity/lib/types";

export function Services({ services }: { services: Service[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const withImages = useMemo(
    () =>
      services
        .map((service) => ({
          service,
          url: service.image ? urlFor(service.image).auto("format").url() : null,
        }))
        .filter((s): s is { service: Service; url: string } => Boolean(s.url)),
    [services]
  );

  const current = openIndex !== null ? withImages[openIndex] : null;

  return (
    <section
      id="services"
      className="washi-grain relative bg-ink-900 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionKicker en="What We Do" />
            <Reveal direction="up" delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight text-paper-50 sm:text-5xl md:text-6xl">
                Services &amp; Craft
              </h2>
            </Reveal>
          </div>
          <Reveal direction="up" delay={0.15} className="max-w-md">
            <p className="font-body text-base leading-relaxed text-paper-100/60 md:text-lg">
              From tender projects to export-ready OEM furniture, every
              service is carried out in-house at our Batu Pahat facility —
              designed with restraint, built to last.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-gold-700/20 bg-gold-700/20 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {services.map((service) => {
            const imageUrl = service.image
              ? urlFor(service.image).width(800).height(600).url()
              : null;
            const lightboxIndex = imageUrl
              ? withImages.findIndex((s) => s.service._id === service._id)
              : -1;

            return (
              <Reveal
                direction="up"
                key={service._id}
                className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden bg-ink-950 p-8"
              >
                <div className="absolute inset-0">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover opacity-30 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-45"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-950" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
                </div>

                {lightboxIndex >= 0 && (
                  <button
                    aria-label={`View larger photo of ${service.title}`}
                    onClick={() => setOpenIndex(lightboxIndex)}
                    className="absolute inset-0 z-20 cursor-zoom-in"
                  />
                )}

                <div className="relative z-10">
                  <h3 className="font-display text-2xl text-paper-50 md:text-3xl">
                    {service.title}
                  </h3>
                  {service.excerpt && (
                    <p className="mt-3 font-body text-base leading-relaxed text-paper-100/60">
                      {service.excerpt}
                    </p>
                  )}
                  <span className="mt-5 block h-px w-8 bg-gold-500 transition-all duration-500 group-hover:w-16" />
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>

      <ImageLightboxModal
        src={current?.url ?? null}
        alt={current?.service.title ?? ""}
        caption={current?.service.title}
        onClose={() => setOpenIndex(null)}
        onPrev={
          withImages.length > 1
            ? () => setOpenIndex((i) => (i === null ? null : (i - 1 + withImages.length) % withImages.length))
            : undefined
        }
        onNext={
          withImages.length > 1
            ? () => setOpenIndex((i) => (i === null ? null : (i + 1) % withImages.length))
            : undefined
        }
      />
    </section>
  );
}
