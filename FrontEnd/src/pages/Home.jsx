import { useMemo, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";
import HeroCarousel from "../components/HeroCarousel";
import CarouselModal from "../components/CarouselModal";

import Marcia from "../assets/img/MP.jpeg";
import h1 from "../assets/Bolos/bolo_tema_whatsapp_image_2026_01_26_at_15_04_30.jpeg";
import h2 from "../assets/Bolos/bolo_tema_whatsapp_image_2026_01_26_at_15_38_39_3.jpeg";
import h3 from "../assets/Bolos/bolo_tema_whatsapp_image_2026_01_26_at_15_43_17_2.jpeg";
import h4 from "../assets/Bolos/bolo_tema_whatsapp_image_2026_01_26_at_15_47_09.jpeg";
import h5 from "../assets/Bolos/bolo_tema_whatsapp_image_2026_01_26_at_15_38_35_1.jpeg";

export default function Home({ waLink }) {
  const [active, setActive] = useState("Bolos");
  const [openCarousel, setOpenCarousel] = useState(false);

  const images = [h1, h2, h3, h4, h5];

  const filtered = useMemo(() => {
    return products.filter((p) => p.category === active);
  }, [active]);

  return (
    <main className="bg-green-500">
      {/* HERO */}
      <section id="inicio" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-2 text-sm font-semibold text-brand-dark">
              Delivery • Encomendas personalizadas
            </p>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold text-brand-text leading-tight">
              Bolos e doces artesanais
              <span className="block text-brand-dark">
                com carinho em cada detalhe.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-brand-text/70 leading-relaxed max-w-xl">
              Faça sua encomenda pelo WhatsApp. Atendimento rápido, opções para
              festas e kits personalizados.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white px-6 py-3 text-center border-green-500 font-semibold text-green-500 shadow-sm hover:opacity-65 transition"
              >
                Pedir no WhatsApp
              </a>
              <a
                href="#cardapio"
                className="rounded-2xl bg-white px-6 py-3 text-center font-semibold text-brand-text shadow-sm ring-1 ring-black/5 border-green-500 text-green-500 hover:opacity-65 transition"
              >
                Ver cardápio
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md border-green-500 text-green-500">
              {[
                { t: "Feito na hora", d: "Sob encomenda" },
                { t: "Delivery", d: "Rápido e seguro" },
                { t: "Personalizado", d: "Para sua festa" },
              ].map((b) => (
                <div
                  key={b.t}
                  className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
                >
                  <p className="text-sm font-semibold text-brand-text">{b.t}</p>
                  <p className="text-xs text-brand-text/60 mt-1">{b.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/3 rounded-3xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
              <HeroCarousel
                images={images}
                className="aspect-4/3"
                onClick={() => setOpenCarousel(true)}
              />
            </div>
            <a href={waLink} target="_blank" rel="noreferrer">
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white border-green-500 text-green-500 px-4 py-3 shadow-sm ring-1 ring-black/5 hover:bg-green-500 hover:text-white transition flex items-center gap-3">
                <p className="text-sm font-semibold text-brand-text">
                  Encomendas via WhatsApp
                </p>
                <p className="text-xs text-brand-text/60">
                  Atendimento rápido 💚
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CARDÁPIO */}
      <section id="cardapio" className="mx-auto max-w-6xl px-4 py-14">
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                active === c
                  ? "bg-brand text-black"
                  : "bg-white border-green-500 text-green-500 ring-1 ring-black/5 hover:opacity-65 transition cursor-pointer",
              ].join(" ")}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 border-green-500 text-green-500">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-10">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-2xl bg-white border-green-500 text-green-500 px-6 py-3 font-semibold text-black-500 shadow-sm hover:opacity-65 transition"
          >
            Quero encomendar
          </a>
        </div>
      </section>

      {/* COMO PEDIR */}
      <section id="como-pedir" className="bg-green-500">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            eyebrow="Pedido fácil"
            title="Como pedir pelo WhatsApp"
            desc="Envie as informações abaixo e você já recebe o orçamento e prazos."
          />

          <div className="mt-10 grid md:grid-cols-3 gap-5 ">
            {[
              {
                n: "01",
                t: "Escolha o produto",
                d: "Bolos, doces ou personalizados. Diga o tamanho e sabor.",
              },
              {
                n: "02",
                t: "Informe a data",
                d: "Conte o dia e horário para entrega (delivery).",
              },
              {
                n: "03",
                t: "Feche a encomenda",
                d: "Confirmamos o valor, prazo e forma de pagamento.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className=" border-green-500 text-green-500 bg-white rounded-3xl bg-brand-bg p-6 ring-1 ring-black/5"
              >
                <p className="text-sm font-bold text-brand-dark">{s.n}</p>
                <p className="mt-2 text-lg font-semibold text-brand-text">
                  {s.t}
                </p>
                <p className="mt-2 text-sm text-brand-text/70 leading-relaxed">
                  {s.d}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href={`${waLink}?text=Ol%C3%A1!%20Quero%20fazer%20uma%20encomenda.%20🙂`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-2xl bg-white px-6 py-3 font-semibold border-green-500 text-green-500 shadow-sm hover:opacity-65 transition"
            >
              Chamar no WhatsApp com mensagem pronta
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-4/3 rounded-3xl bg-green-500 shadow-sm ring-1 ring-black/5 overflow-hidden">
            <img
              src={Marcia}
              alt="Confeitaria"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <SectionTitle
              eyebrow="Sobre"
              title="Márcia Porto Cakes"
              desc="A Márcia Porto Cakes nasceu do talento e da sensibilidade de Márcia Porto Figueiredo, uma confeiteira que transforma afeto em sabores. Cada bolo, doce e criação carrega um pedacinho da sua história — feita de amor, dedicação e o desejo de tornar momentos simples em lembranças inesquecíveis. Para Márcia, confeitar vai muito além da técnica: é uma forma de expressar cuidado, leveza e alegria. Inspirada pelo seu dia a dia e pelas pessoas que ama, ela encontrou na confeitaria um jeito doce de espalhar felicidade. Na Márcia Porto Cakes, cada detalhe é pensado com carinho — do sabor à decoração — para que cada cliente sinta o mesmo amor que é colocado em cada receita. Porque aqui, o principal ingrediente sempre será o coração. 💗 "
            />
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="bg-green-500">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            eyebrow="Contato"
            title="Vamos fazer sua encomenda?"
            desc="Clique no WhatsApp e diga o que você precisa. Respondemos o mais rápido possível."
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-white border-green-500 text-green-500 px-6 py-3 text-center font-semibold text-black-500 shadow-sm hover:opacity-65 transition"
            >
              WhatsApp (41) 99919-3582
            </a>
            <a
              href="https://www.instagram.com/mportobolos/"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-white border-green-500 text-green-500 px-6 py-3 text-center font-semibold text-brand-text shadow-sm ring-1 ring-black/5 hover:opacity-65 transition"
            >
              Instagram @mportobolos
            </a>
          </div>

          <p className="mt-6 text-xs text-brand-text/60">
            *Valores e disponibilidade variam conforme data e personalização.
          </p>
        </div>
      </section>

      {/* MODAL DO CARROSSEL (fica no final) */}
      {openCarousel && (
        <CarouselModal images={images} onClose={() => setOpenCarousel(false)} />
      )}
    </main>
  );
}
