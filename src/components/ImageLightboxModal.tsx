"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function ImageLightboxModal({
  src,
  alt,
  caption,
  onClose,
  onPrev,
  onNext,
}: {
  src: string | null;
  alt: string;
  caption?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [src, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
          >
            <div className="flex max-h-[80vh] w-full items-center justify-center overflow-hidden rounded-sm border border-gold-500/30 bg-ink-950">
              <Image
                src={src}
                alt={alt}
                width={2400}
                height={1600}
                unoptimized
                className="h-auto max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
            {caption && (
              <p className="mt-4 text-center font-body text-sm text-paper-100/70">
                {caption}
              </p>
            )}

            {onPrev && (
              <button
                aria-label="Previous image"
                onClick={onPrev}
                className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-paper-100/30 bg-ink-950/60 text-paper-100 transition-colors hover:border-gold-400 hover:text-gold-400 sm:-translate-x-14"
              >
                ‹
              </button>
            )}
            {onNext && (
              <button
                aria-label="Next image"
                onClick={onNext}
                className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-paper-100/30 bg-ink-950/60 text-paper-100 transition-colors hover:border-gold-400 hover:text-gold-400 sm:translate-x-14"
              >
                ›
              </button>
            )}

            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute -top-4 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-paper-100/30 bg-ink-950/60 text-paper-100 transition-colors hover:border-gold-400 hover:text-gold-400 sm:-right-14 sm:top-0"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
