export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-lime-600">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-brand-text/60">
        <p>© {new Date().getFullYear()} Márcia Porto Cakes — Bolos e Doces.</p>
        <p className="mt-2">
          Delivery • Encomendas via WhatsApp • Feito com carinho 💚
        </p>
      </div>
    </footer>
  );
}
