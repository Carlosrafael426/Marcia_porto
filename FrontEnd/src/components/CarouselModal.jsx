import HeroCarousel from "./HeroCarousel";

export default function CarouselModal({ images, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      {/* fundo clicável */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* conteúdo */}
      <div className="relative max-w-5xl w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-3xl hover:opacity-80"
          aria-label="Fechar"
          type="button"
        >
          ✕
        </button>

        <HeroCarousel
          images={images}
          intervalMs={5000}
          className="aspect-[16/9] rounded-2xl"
        />
      </div>
    </div>
  );
}
