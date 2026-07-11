export function Marquee({
  items,
  duration = 28,
}: {
  items: string[];
  duration?: number;
}) {
  const content = items.join("   ·   ") + "   ·   ";

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-gold-700/25 bg-ink-950 py-5"
    >
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="whitespace-nowrap px-4 font-display text-lg font-extrabold uppercase tracking-[0.08em] text-gold-500/60 sm:text-xl"
          >
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}
