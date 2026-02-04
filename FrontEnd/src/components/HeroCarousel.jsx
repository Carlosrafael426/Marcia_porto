import { useEffect, useMemo, useRef, useState } from "react";

export default function HeroCarousel({
  images = [],
  intervalMs = 4500,
  className = "",
  onClick,
}) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const hasSlides = slides.length > 0;

  function go(next) {
    if (!hasSlides) return;
    setIndex((prev) => {
      const n = (prev + next) % slides.length;
      return n < 0 ? n + slides.length : n;
    });
  }

  function start() {
    if (!hasSlides) return;
    stop();
    timerRef.current = setInterval(() => go(1), intervalMs);
  }

  function stop() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, intervalMs]);

  // se trocar lista de imagens, garante índice válido
  useEffect(() => {
    if (!hasSlides) return;
    if (index > slides.length - 1) setIndex(0);
  }, [hasSlides, slides.length, index]);

  if (!hasSlides) {
    return (
      <div
        className={`aspect-4/3 rounded-3xl bg-white shadow-sm ring-1 ring-black/5 ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 cursor-zoom-in ${className}`}
      onClick={onClick}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Overlay para texto ficar legível */}
        <div className="absolute inset-0 bg-gradient-to from-black/35 via-black/10 to-transparent" />
      </div>

      {/* Setas */}
      <button
        type="button"
        onClick={() => go(-1)}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/85 hover:bg-white text-brand-text shadow-sm ring-1 ring-black/10"
        aria-label="Slide anterior"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/85 hover:bg-white text-brand-text shadow-sm ring-1 ring-black/10"
        aria-label="Próximo slide"
      >
        ›
      </button>

      {/* Bolinhas */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={[
              "h-2.5 w-2.5 rounded-full ring-1 ring-white/60 transition",
              i === index ? "bg-white" : "bg-white/40 hover:bg-white/70",
            ].join(" ")}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
