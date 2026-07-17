"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Particles } from "./Particles";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";

export function Hero({ settings }: { settings: SiteSettings }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroImageUrl = settings.heroImage
    ? urlFor(settings.heroImage).width(1920).height(1280).url()
    : null;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-ink-950"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt=""
            fill
            priority
            className="object-cover opacity-45"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,134,62,0.22),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(184,134,62,0.14),transparent_50%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/60 to-ink-950" />
      </motion.div>

      <Particles count={32} />

      <span
        aria-hidden
        className="kanji-watermark pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[40vw] leading-none md:text-[29vw]"
      >
        惠
      </span>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-jp text-2xl tracking-[0.4em] text-gold-400 md:text-3xl"
        >
          {settings.heroKicker ?? "匠の技"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl font-display text-5xl leading-[1.05] font-extrabold text-paper-50 sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {settings.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl font-body text-lg leading-relaxed text-paper-100/75 md:text-xl"
        >
          {settings.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="#portfolio"
            className="rounded-full bg-gold-500 px-9 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-ink-950 transition-transform hover:scale-[1.03] hover:bg-gold-400"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="rounded-full border border-paper-100/30 px-9 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-paper-100 transition-colors hover:border-gold-400 hover:text-gold-400"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 text-paper-100/60"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.35em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-gold-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
