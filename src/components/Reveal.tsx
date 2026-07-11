"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

const OFFSET = 56;

function getVariants(direction: Direction): Variants {
  const hidden: Record<string, number> = { opacity: 0 };
  if (direction === "up") hidden.y = OFFSET;
  if (direction === "down") hidden.y = -OFFSET;
  if (direction === "left") hidden.x = OFFSET;
  if (direction === "right") hidden.x = -OFFSET;
  if (direction === "scale") hidden.scale = 0.92;

  return {
    hidden,
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = false,
  amount = 0.2,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      variants={getVariants(direction)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  once = false,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}
