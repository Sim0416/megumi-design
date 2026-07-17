"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, RevealGroup } from "./Reveal";
import { SectionKicker } from "./SectionKicker";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/lib/types";

export function Portfolio({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = useMemo(() => {
    if (!selected) return [];
    return [selected.coverImage, ...(selected.gallery ?? [])].filter(
      (img): img is NonNullable<typeof img> => Boolean(img)
    );
  }, [selected]);

  function openProject(project: Project) {
    setSelected(project);
    setGalleryIndex(0);
  }

  return (
    <section id="portfolio" className="relative bg-ink-950 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div>
          <SectionKicker en="Portfolio" />
          <Reveal direction="up" delay={0.1}>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-extrabold leading-tight text-paper-50 sm:text-5xl md:text-6xl">
              Selected Works
            </h2>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project) => {
              const imageUrl = project.coverImage
                ? urlFor(project.coverImage).width(900).height(1100).url()
                : null;

              return (
                <motion.button
                  layout
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => openProject(project)}
                  className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-gold-700/20 text-left"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="washi-grain flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
                      <span className="text-outline-gold font-display text-8xl font-black opacity-20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="font-display text-xl text-paper-50 md:text-2xl">
                      {project.title}
                    </h3>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </RevealGroup>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 backdrop-blur-md p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[92vh] w-full max-w-6xl grid-cols-1 overflow-y-auto rounded-sm border border-gold-700/30 bg-ink-900 md:grid-cols-5"
            >
              <div className="group relative min-h-[360px] w-full md:col-span-3 md:min-h-[640px]">
                {galleryImages.length > 0 ? (
                  <Image
                    key={galleryIndex}
                    src={urlFor(galleryImages[galleryIndex]).width(1800).height(2200).url()}
                    alt={`${selected.title} ${galleryIndex + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="washi-grain flex h-full min-h-[360px] w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-950">
                    <span className="text-outline-gold font-display text-9xl font-black opacity-20">
                      {selected.title.charAt(0)}
                    </span>
                  </div>
                )}

                {galleryImages.length > 1 && (
                  <>
                    <button
                      aria-label="Previous photo"
                      onClick={() =>
                        setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)
                      }
                      className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper-100/30 bg-ink-950/60 text-lg text-paper-100 opacity-80 transition-opacity duration-300 hover:border-gold-400 hover:text-gold-400 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    >
                      ‹
                    </button>
                    <button
                      aria-label="Next photo"
                      onClick={() => setGalleryIndex((i) => (i + 1) % galleryImages.length)}
                      className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper-100/30 bg-ink-950/60 text-lg text-paper-100 opacity-80 transition-opacity duration-300 hover:border-gold-400 hover:text-gold-400 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {galleryImages.map((_, i) => (
                        <button
                          key={i}
                          aria-label={`View photo ${i + 1}`}
                          onClick={() => setGalleryIndex(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === galleryIndex ? "w-5 bg-gold-400" : "w-1.5 bg-paper-100/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col justify-center p-8 md:col-span-2 md:p-10">
                <h3 className="font-display text-3xl text-paper-50 md:text-4xl">
                  {selected.title}
                </h3>
                {selected.excerpt && (
                  <p className="mt-5 font-body text-base leading-relaxed text-paper-100/70 md:text-lg">
                    {selected.excerpt}
                  </p>
                )}
                <a
                  href="#contact"
                  onClick={() => setSelected(null)}
                  className="mt-8 inline-block rounded-full bg-gold-500 px-6 py-3 font-body text-sm uppercase tracking-[0.2em] text-ink-950 transition-colors hover:bg-gold-400"
                >
                  Enquire About This
                </a>
              </div>
              <button
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-paper-100/30 text-paper-100 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
