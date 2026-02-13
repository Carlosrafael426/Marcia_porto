import boloChantilly from "../assets/Bolos/bolo_tema_whatsapp_image_2026_01_26_at_14_48_24_2.jpeg"
import boloChantininho from "../assets/Bolos/bolo_tema_whatsapp_image_2026_01_26_at_16_09_18_3.jpeg"
import boloPastaAmericana from "../assets/Bolos/bolo_tema_whatsapp_image_2026_01_26_at_15_57_24_1.jpeg"
import boloTematico from "../assets/Bolos/bolo_tema_natal.jpg"
import docePersonalizado from "../assets/Doces/bolo_tema_whatsapp_image_2026_01_26_at_16_17_01_4.jpeg"
import brigadeiroGourmet from "../assets/Doces/bri_gourmet.jpg"
import brigadeiroRecheado from "../assets/Doces/bri_gourmet1.jpg"
import brigadeiroTradicional from "../assets/Doces/briga_tradicional.jpg"
import kitFesta from "../assets/Doces/kit_festa.jpg"

export const categories = ["Bolos", "Doces", "Personalizados"];

export const products = [
  {
    id: 1,
    name: "Bolo de Chantily",
    category: "Bolos",
    priceFrom: "R$ 100,00kg",
    desc: "Massa fofinha, recheio cremoso e cobertura caprichada.",
    img: boloChantilly,
  },
  {
    id: 2,
    name: "Bolo de Chantininho",
    category: "Bolos",
    priceFrom: "R$ 115,00kg",
    desc: "Com cobertura de Chantininho — clássico delicioso.",
    img: boloChantininho,
  },
  {
    id: 3,
    name: "Bolo de Pasta Americana",
    category: "Bolos",
    priceFrom: "R$ 160,00kg",
    desc: "Com cobertura de pasta americana — clássico que sempre vende.",
    img: boloPastaAmericana,
  },
  {
    id: 4,
    name: "Brigadeiros tradicionais",
    category: "Doces",
    priceFrom: "R$ 100,00 /cento",
    desc: "Sabores variados, perfeito pra festas e presentes.",
    img: brigadeiroTradicional,
  },
  {
    id: 5,
    name: "Brigadeiros Gourmet",
    category: "Doces",
    priceFrom: "R$ 150,00 /cento",
    desc: "Sabores variados, perfeito pra festas e presentes confirmar sabores disponiveis.",
    img: brigadeiroGourmet,
  },
  {
    id: 6,
    name: "Brigadeiros Recheados",
    category: "Doces",
    priceFrom: "R$ 180,00 /cento",
    desc: "Sabores variados, perfeito pra festas e presentes confirmar recheios disponiveis.",
    img: brigadeiroRecheado,
  },
  {
    id: 7,
    name: "Doces Finos",
    category: "Doces",
    priceFrom: "R$ 250,00 /cento",
    desc: "Cremoso e equilibrado, finalizado com carinho confirmar os doces disponiveis.",
    img: docePersonalizado,
  },
  {
    id: 8,
    name: "Bolo Temático",
    category: "Personalizados",
    priceFrom: "Sob consulta",
    desc: "Personalização por tema, cores e acabamento.",
    img: boloTematico,
  },
  {
    id: 9,
    name: "Kit Festa",
    category: "Personalizados",
    priceFrom: "Sob consulta",
    desc: "Combos com bolo + doces para sua comemoração(Não tabalhamos com decoração, trabalhamos apenas com doces e bolos).",
    img: kitFesta,
  },
];
