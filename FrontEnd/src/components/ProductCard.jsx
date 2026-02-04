export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-brand-text">{product.name}</h3>
          <span className="shrink-0 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand-dark">
            {product.priceFrom}
          </span>
        </div>
        <p className="mt-2 text-sm text-brand-text/70 leading-relaxed">
          {product.desc}
        </p>
        <p className="mt-3 text-xs font-medium text-brand-dark/80">
          {product.category}
        </p>
      </div>
    </article>
  );
}
