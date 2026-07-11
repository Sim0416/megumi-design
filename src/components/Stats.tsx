"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Stat } from "@/sanity/lib/types";

function CountUp({ value, suffix }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const [display, setDisplay] = useState("0");

  const numeric = parseFloat(value.replace(/,/g, ""));
  const isNumeric = !Number.isNaN(numeric);

  useEffect(() => {
    if (!inView) {
      if (!isNumeric) setDisplay("");
      return;
    }
    if (!isNumeric) {
      setDisplay(value);
      return;
    }

    let frame: number;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numeric * eased);
      setDisplay(current.toLocaleString());
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, isNumeric, numeric, value]);

  const spacer = suffix && /^[a-z]/i.test(suffix) ? " " : "";

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {spacer}
      {suffix ?? ""}
    </span>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-8 gap-y-10">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="border-l border-gold-700/40 pl-4 md:pl-6"
        >
          <div className="font-display whitespace-nowrap text-3xl text-gold-400 sm:text-4xl md:text-5xl">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="mt-3 font-body text-sm uppercase tracking-[0.15em] text-paper-100/60 md:text-base">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
