"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const LINKS = [
  { href: "#about", jp: "匠の心", en: "About" },
  { href: "#services", jp: "仕事", en: "Services" },
  { href: "#portfolio", jp: "作品", en: "Portfolio" },
  { href: "#contact", jp: "連絡", en: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink-950/90 backdrop-blur-md border-b border-gold-700/30 py-2"
            : "bg-gradient-to-b from-ink-950/70 to-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="#top" className="flex items-center gap-3">
            <Image
              src="/logo.webp"
              alt="Megumi Design"
              width={240}
              height={84}
              priority
              className="h-14 w-auto lg:h-20"
            />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center font-body text-sm font-medium tracking-[0.2em] uppercase text-paper-100/80 transition-colors hover:text-gold-400"
              >
                <span className="font-jp text-xs text-gold-500/70 group-hover:text-gold-400">
                  {link.jp}
                </span>
                <span>{link.en}</span>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-gold-500/60 px-7 py-2.5 font-body text-sm font-medium uppercase tracking-[0.2em] text-gold-400 transition-all hover:bg-gold-500 hover:text-ink-950 md:inline-block"
          >
            Enquire
          </a>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-gold-400"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="h-px w-6 bg-gold-400"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-gold-400"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink-950/98 backdrop-blur-lg md:hidden"
          >
            <div className="washi-grain flex h-full flex-col items-center justify-center gap-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="font-jp text-lg text-gold-500">
                    {link.jp}
                  </span>
                  <span className="font-display text-3xl uppercase tracking-tight text-paper-100">
                    {link.en}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
