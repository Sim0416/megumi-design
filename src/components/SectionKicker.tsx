import { Reveal } from "./Reveal";

const JUSTIFY = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export function SectionKicker({
  en,
  align = "left",
  light = false,
}: {
  en: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}) {
  return (
    <Reveal
      direction="up"
      className={`flex items-center gap-4 ${JUSTIFY[align]} ${
        align === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <span
        className={`h-px w-10 ${light ? "bg-ink-800" : "bg-gold-500"}`}
        aria-hidden
      />
      <span
        className={`font-display text-base tracking-[0.3em] uppercase ${
          light ? "text-ink-800" : "text-gold-400"
        }`}
      >
        {en}
      </span>
    </Reveal>
  );
}
