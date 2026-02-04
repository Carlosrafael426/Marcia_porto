export default function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-medium text-brand-dark/90">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-brand-text">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-base text-brand-text/70 leading-relaxed">
          {desc}
        </p>
      ) : null}
    </div>
  );
}
