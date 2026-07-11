function seededParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const left = (i * 37) % 100;
    const top = 20 + ((i * 53) % 80);
    const size = 2 + (i % 3);
    const duration = 6 + (i % 5) * 1.6;
    const delay = (i * 0.7) % 6;
    const opacity = 0.35 + ((i * 13) % 40) / 100;
    return { left, top, size, duration, delay, opacity };
  });
}

export function Particles({
  count = 24,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const particles = seededParticles(count);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="ember animate-float-ember"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--ember-opacity" as string]: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
