import Logo from "../assets/logo.png";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#como-pedir", label: "Como pedir" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar({ waLink }) {
  return (
    <header className="sticky top-0 z-50 bg-lime-600 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-3 relativel">
          <img
            src={Logo}
            alt="Márcia Porto Cakes"
            className="h-9 w-9 rounded-xl object-cover ring-1 ring-black/10"
          />
          <div className="leading-tight">
            <p className="font-semibold text-brand-text">Márcia Porto Cakes</p>
            <p className="text-xs text-brand-text/60 -mt-0.5">Bolos e Doces</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-brand-text/70 relative
                     text-black
                     after:content-['']
                     after:absolute
                     after:left-0
                     after:-bottom-0.5
                     after:h-[2px]
                     after:w-0
                     after:bg-black
                     after:transition-all
                     after:duration-500
                     hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold border-green-500 text-green-500 shadow-sm hover:opacity-65 transition"
        >
          Pedir no WhatsApp
        </a>
      </div>
    </header>
  );
}
