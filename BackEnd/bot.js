// bot.js

// ==========================================
// 1. BANCO DE DADOS COMPLETO
// ==========================================
const catalog = {
  bolos: [
    { id: 1, nome: "Chantilly", preco: 100.0 },
    { id: 2, nome: "Chantininho", preco: 115.0 },
    { id: 3, nome: "Pasta americana", preco: 160.0 },
  ],
  brigadeirosTradicionais: [
    { id: 1, nome: "Tradicional: Beijinho", preco: 100.0 },
    { id: 2, nome: "Tradicional: Chocolate ao leite", preco: 100.0 },
    { id: 3, nome: "Tradicional: Chocolate branco", preco: 100.0 },
    { id: 4, nome: "Tradicional: Paçoca", preco: 100.0 },
  ],
  brigadeirosGourmet: [
    { id: 5, nome: "Gourmet: Cajuzinho", preco: 150.0 },
    { id: 6, nome: "Gourmet: Cereja", preco: 150.0 },
    { id: 7, nome: "Gourmet: Chocolate ao leite", preco: 150.0 },
    { id: 8, nome: "Gourmet: Chocolate branco", preco: 150.0 },
    { id: 9, nome: "Gourmet: Chocolate meio amargo", preco: 150.0 },
    { id: 10, nome: "Gourmet: Coco queimado", preco: 150.0 },
    { id: 11, nome: "Gourmet: Doce de leite", preco: 150.0 },
    { id: 12, nome: "Gourmet: Dois amores", preco: 150.0 },
    { id: 13, nome: "Gourmet: Galak", preco: 150.0 },
    { id: 14, nome: "Gourmet: Limão", preco: 150.0 },
    { id: 15, nome: "Gourmet: Maracujá", preco: 150.0 },
    { id: 16, nome: "Gourmet: Morango", preco: 150.0 },
    { id: 17, nome: "Gourmet: Ninho com nutella", preco: 150.0 },
    { id: 18, nome: "Gourmet: Nozes", preco: 150.0 },
    { id: 19, nome: "Gourmet: Ovomaltine", preco: 150.0 },
    { id: 20, nome: "Gourmet: Romeu e Julieta", preco: 150.0 },
    { id: 21, nome: "Gourmet: Pistache", preco: 150.0 },
    { id: 22, nome: "Gourmet: Surpresa de uva", preco: 150.0 },
  ],
  brigadeirosRecheados: [
    { id: 23, nome: "Recheado: Bombom de cereja", preco: 180.0 },
    { id: 24, nome: "Recheado: Damasco", preco: 180.0 },
    { id: 25, nome: "Recheado: Licor", preco: 180.0 },
    { id: 26, nome: "Recheado: Bombom de morango", preco: 180.0 },
    { id: 27, nome: "Recheado: Ovomaltine", preco: 180.0 },
    { id: 28, nome: "Recheado: Oreo", preco: 180.0 },
    { id: 29, nome: "Recheado: Bombom de prestigio", preco: 180.0 },
    { id: 30, nome: "Recheado: Torta de limão", preco: 180.0 },
    { id: 31, nome: "Recheado: Bombom de uva", preco: 180.0 },
    { id: 32, nome: "Brigadeiro Personalizado (Consultar)", preco: 180.0 },
  ],
  docesFinos: [
    { id: 1, nome: "Bem casado", preco: 250.0 },
    { id: 2, nome: "Bombom aberto", preco: 250.0 },
    { id: 3, nome: "Bombom fechado", preco: 250.0 },
    { id: 4, nome: "Brigadeiro espelhado", preco: 250.0 },
    { id: 5, nome: "Camafeu de nozes", preco: 250.0 },
    { id: 7, nome: "Mini torta", preco: 250.0 },
  ],
  docesPersonalizados: [
    { id: 1, nome: "Pirulito 3D", preco: 10.0 },
    { id: 2, nome: "Choco Maçã P", preco: 10.0 },
    { id: 3, nome: "Choco Maçã G", preco: 20.0 },
    { id: 4, nome: "Bolo no palito 3D", preco: 15.0 },
    { id: 5, nome: "Porta Retrato P", preco: 10.0 },
    { id: 6, nome: "Porta Retrato G", preco: 10.0 },
    { id: 7, nome: "Cakepops", preco: 15.0 },
    { id: 8, nome: "Bombom (chocolate ou ninho)", preco: 15.0 },
    { id: 9, nome: "Popsicle (massa: brig - cobertura: choco)", preco: 10.0 },
    { id: 10, nome: "Doces esculpidos à partir de", preco: 20.0 },
  ],
  kitsFesta: [
    {
      id: 1,
      nome: "Kit Festa Personalizado 3D",
      preco: 220.0,
      descricao:
        "6 Bolos no palito, 6 Pirulitos, 10 Bombons P, 8 Portas Retratos P (Decoração 3D)",
    },
  ],
  massas: ["Baunilha", "Chocolate", "Morango"],
  recheios: [
    "Abacaxi com coco",
    "Brig branco",
    "Brig black",
    "Brig galak",
    "Diamante negro",
    "Dois amores",
    "Doce de leite",
    "Kit kat",
    "Leite ninho",
    "Morango",
    "Morango com suspiro",
    "Nutella",
    "Ovomaltine",
    "Paçoca",
    "Prestigio",
    "Sonho de valsa",
  ],
};

// ==========================================
// 2. FUNÇÕES DE SUPORTE
// ==========================================
function buildMenuPrincipal() {
  return (
    "🧁 *Menu Márcia Porto Cakes* 🍰\n\n" +
    "1️⃣ Bolos\n" +
    "2️⃣ Brigadeiros e Doces\n" +
    "3️⃣ Kits Festa\n\n" +
    "Responda com o número.\n" +
    "_Comandos: *menu* (reiniciar), *voltar* (passo anterior), *cancelar* (parar pedido)_"
  );
}

function buildMenuDoces() {
  return (
    "🍬 *Qual linha de Brigadeiros ou Doces deseja?*\n\n" +
    "1. Brigadeiros Tradicionais\n" +
    "2. Brigadeiros Gourmet\n" +
    "3. Brigadeiros Recheados\n" +
    "4. Doces Finos\n" +
    "5. Doces Personalizados\n\n" +
    "_(Ou digite *voltar* / *cancelar*)_"
  );
}

function startConversation() {
  return {
    etapa: "MENU_PRINCIPAL",
    historico: [],
    pedido: {},
    tempLista: null,
    tempCategoria: null, // "bolos" | "doces" | "kits"
  };
}

// ==========================================
// 3. HELPERS (robustez)
// ==========================================
function ensureState(conversa) {
  if (!conversa || typeof conversa !== "object") conversa = startConversation();

  if (!conversa.etapa) conversa.etapa = "MENU_PRINCIPAL";
  if (!Array.isArray(conversa.historico)) conversa.historico = [];
  if (!conversa.pedido || typeof conversa.pedido !== "object")
    conversa.pedido = {};
  if (typeof conversa.tempLista === "undefined") conversa.tempLista = null;
  if (typeof conversa.tempCategoria === "undefined")
    conversa.tempCategoria = null;

  return conversa;
}

function reset(conversa) {
  Object.assign(conversa, startConversation());
}

function goTo(conversa, nextEtapa) {
  conversa.historico.push(conversa.etapa);
  conversa.etapa = nextEtapa;
}

function fmtBRL(n) {
  return "R$ " + Number(n).toFixed(2);
}

function parseYesNo(lowText) {
  // igualdade exata pra evitar "assim" cair como "sim"
  if (lowText === "sim" || lowText === "s") return true;
  if (lowText === "não" || lowText === "nao" || lowText === "n") return false;
  return null;
}

function parseDateBR(text) {
  // dd/mm ou dd/mm/aaaa
  const t = String(text || "").trim();
  const m = t.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/);
  if (!m) return null;

  const dd = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  let yyyy = m[3] ? parseInt(m[3], 10) : null;
  if (yyyy !== null && yyyy < 100) yyyy += 2000;

  if (mm < 1 || mm > 12) return null;
  const maxByMonth = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  if (dd < 1 || dd > maxByMonth[mm]) return null;

  const ddStr = String(dd).padStart(2, "0");
  const mmStr = String(mm).padStart(2, "0");
  if (yyyy) return ddStr + "/" + mmStr + "/" + yyyy;
  return ddStr + "/" + mmStr;
}

// ==========================================
// 4. RENDERIZAÇÃO (para voltar funcionar direito)
// ==========================================
function renderEtapa(conversa) {
  switch (conversa.etapa) {
    case "MENU_PRINCIPAL":
      return buildMenuPrincipal();

    case "MENU_DOCES":
      return buildMenuDoces();

    case "LISTA_BOLOS": {
      let m = "🎂 *Escolha o Bolo:*\n\n";
      catalog.bolos.forEach((b) => {
        m += b.id + ". " + b.nome + " - " + fmtBRL(b.preco) + "\n";
      });
      m += "\n_(Digite o número ou *voltar* / *cancelar*)_";
      return m;
    }

    case "LISTA_KITS": {
      let menuKits = "🎈 *Nossos Kits Festa:*\n\n";
      catalog.kitsFesta.forEach((kit) => {
        menuKits +=
          kit.id + ". *" + kit.nome + "* - " + fmtBRL(kit.preco) + "\n";
        menuKits += "🎁 Conteúdo: " + kit.descricao + "\n\n";
      });
      menuKits += "_(Digite o número ou *voltar* / *cancelar*)_";
      return menuKits;
    }

    case "LISTA_DOCES_FINAL": {
      const alvo = conversa.tempLista || [];
      let dMsg = "✨ *Escolha o sabor/tipo:*\n\n";
      alvo.forEach((d) => {
        dMsg += d.id + ". " + d.nome + " - " + fmtBRL(d.preco) + "\n";
      });
      dMsg += "\n_(Digite o número ou *voltar* / *cancelar*)_";
      return dMsg;
    }

    case "MASSA": {
      let maMsg = "🍞 *Escolha a massa:*\n\n";
      catalog.massas.forEach((m, i) => {
        maMsg += i + 1 + ". " + m + "\n";
      });
      maMsg += "\n_(Digite o número ou *voltar* / *cancelar*)_";
      return maMsg;
    }

    case "RECHEIO": {
      let reMsg = "🍫 *Escolha o recheio:*\n\n";
      catalog.recheios.forEach((r, i) => {
        reMsg += i + 1 + ". " + r + "\n";
      });
      reMsg += "\n_(Digite o número ou *voltar* / *cancelar*)_";
      return reMsg;
    }

    case "ANIVERSARIO":
      return "É para aniversário? (Sim/Não)\n\n_(Ou digite *voltar* / *cancelar*)_";

    case "NOME_NIVER":
      return "Qual o nome do aniversariante?\n\n_(Ou digite *voltar* / *cancelar*)_";

    case "IDADE_NIVER":
      return "Qual a idade?\n\n_(Ou digite *voltar* / *cancelar*)_";

    case "TEMA":
      return "Qual o tema ou observação? (Diga 'sem tema' se não tiver)\n\n_(Ou digite *voltar* / *cancelar*)_";

    case "DATA":
      return "Para qual data você precisa? (ex: 15/04 ou 15/04/2026)\n\n_(Ou digite *voltar* / *cancelar*)_";

    case "QUANTIDADE":
      return "Qual a quantidade ou tamanho? (ex: 2kg ou 50 unidades)\n\n_(Ou digite *voltar* / *cancelar*)_";

    default:
      conversa.etapa = "MENU_PRINCIPAL";
      return "Digite *menu* para recomeçar.\n\n" + buildMenuPrincipal();
  }
}

// ==========================================
// 5. MOTOR DE MENSAGENS
// ==========================================
function handleMessage(conversa, msg) {
  conversa = ensureState(conversa);

  const text = String(msg || "").trim();
  const lowText = text.toLowerCase().trim();

  // ------------------------------------------
  // COMANDOS GLOBAIS (funcionam em qualquer etapa)
  // ------------------------------------------
  if (lowText === "reiniciar" || lowText === "menu") {
    reset(conversa);
    return { resposta: renderEtapa(conversa), conversa };
  }

  if (
    lowText === "cancelar" ||
    lowText === "cancela" ||
    lowText === "cancel" ||
    lowText === "sair" ||
    lowText === "parar"
  ) {
    reset(conversa);
    return {
      resposta: "❌ Pedido cancelado.\n\n" + renderEtapa(conversa),
      conversa,
    };
  }

  if (lowText === "voltar") {
    if (conversa.historico.length === 0) {
      return {
        resposta: "Você já está no começo 🙂\n\n" + renderEtapa(conversa),
        conversa,
      };
    }
    conversa.etapa = conversa.historico.pop();
    return { resposta: "🔄 Voltamos!\n\n" + renderEtapa(conversa), conversa };
  }

  // ------------------------------------------
  // FLUXO POR ETAPAS
  // ------------------------------------------
  switch (conversa.etapa) {
    case "MENU_PRINCIPAL":
      if (text === "1") {
        conversa.tempCategoria = "bolos";
        goTo(conversa, "LISTA_BOLOS");
        return { resposta: renderEtapa(conversa), conversa };
      }

      if (text === "2") {
        conversa.tempCategoria = "doces";
        goTo(conversa, "MENU_DOCES");
        return { resposta: renderEtapa(conversa), conversa };
      }

      if (text === "3") {
        conversa.tempCategoria = "kits";
        conversa.tempLista = catalog.kitsFesta;
        goTo(conversa, "LISTA_KITS");
        return { resposta: renderEtapa(conversa), conversa };
      }

      return {
        resposta:
          "Opção inválida. Escolha 1, 2 ou 3.\n\n" + renderEtapa(conversa),
        conversa,
      };

    case "MENU_DOCES": {
      let alvo = null;
      let categoriaLabel = null;

      if (text === "1") {
        alvo = catalog.brigadeirosTradicionais;
        categoriaLabel = "Brigadeiros Tradicionais";
      } else if (text === "2") {
        alvo = catalog.brigadeirosGourmet;
        categoriaLabel = "Brigadeiros Gourmet";
      } else if (text === "3") {
        alvo = catalog.brigadeirosRecheados;
        categoriaLabel = "Brigadeiros Recheados";
      } else if (text === "4") {
        alvo = catalog.docesFinos;
        categoriaLabel = "Doces Finos";
      } else if (text === "5") {
        alvo = catalog.docesPersonalizados;
        categoriaLabel = "Doces Personalizados";
      }

      if (!alvo)
        return {
          resposta: "Escolha de 1 a 5 ou *voltar*.\n\n" + renderEtapa(conversa),
          conversa,
        };

      conversa.tempLista = alvo;
      conversa.pedido.categoria = categoriaLabel;

      goTo(conversa, "LISTA_DOCES_FINAL");
      return { resposta: renderEtapa(conversa), conversa };
    }

    case "LISTA_BOLOS": {
      const bolo = catalog.bolos.find((b) => String(b.id) === text);
      if (!bolo)
        return {
          resposta: "Número não encontrado.\n\n" + renderEtapa(conversa),
          conversa,
        };

      conversa.pedido.item = bolo.nome;
      conversa.pedido.categoria = "Bolo";
      conversa.pedido.precoBase = bolo.preco;

      goTo(conversa, "MASSA");
      return { resposta: renderEtapa(conversa), conversa };
    }

    case "LISTA_DOCES_FINAL":
    case "LISTA_KITS": {
      const listaBusca = conversa.tempLista || [];
      const selecionado = listaBusca.find((i) => String(i.id) === text);
      if (!selecionado)
        return {
          resposta:
            "Número inválido. Tente novamente.\n\n" + renderEtapa(conversa),
          conversa,
        };

      conversa.pedido.item = selecionado.nome;
      conversa.pedido.precoBase = selecionado.preco;
      conversa.pedido.descricaoKit = selecionado.descricao || null;

      // limpa lista temporária depois de escolher
      conversa.tempLista = null;

      goTo(conversa, "ANIVERSARIO");
      return { resposta: renderEtapa(conversa), conversa };
    }

    case "MASSA": {
      const idxM = parseInt(text, 10) - 1;
      if (!catalog.massas[idxM])
        return {
          resposta: "Selecione uma massa da lista.\n\n" + renderEtapa(conversa),
          conversa,
        };

      conversa.pedido.massa = catalog.massas[idxM];

      goTo(conversa, "RECHEIO");
      return { resposta: renderEtapa(conversa), conversa };
    }

    case "RECHEIO": {
      const idxR = parseInt(text, 10) - 1;
      if (!catalog.recheios[idxR])
        return {
          resposta:
            "Selecione um recheio da lista.\n\n" + renderEtapa(conversa),
          conversa,
        };

      conversa.pedido.recheio = catalog.recheios[idxR];

      goTo(conversa, "ANIVERSARIO");
      return { resposta: renderEtapa(conversa), conversa };
    }

    case "ANIVERSARIO": {
      const yn = parseYesNo(lowText);
      if (yn === null)
        return {
          resposta: "Responda apenas Sim ou Não.\n\n" + renderEtapa(conversa),
          conversa,
        };

      conversa.pedido.niver = yn;

      if (yn) {
        goTo(conversa, "NOME_NIVER");
        return { resposta: renderEtapa(conversa), conversa };
      }

      goTo(conversa, "TEMA");
      return { resposta: renderEtapa(conversa), conversa };
    }

    case "NOME_NIVER":
      conversa.pedido.nomeNiver = text;
      goTo(conversa, "IDADE_NIVER");
      return { resposta: renderEtapa(conversa), conversa };

    case "IDADE_NIVER": {
      const idade = parseInt(text, 10);
      if (!Number.isFinite(idade) || idade <= 0 || idade > 120) {
        return {
          resposta:
            "Digite uma idade válida (ex: 5, 18, 30).\n\n" +
            renderEtapa(conversa),
          conversa,
        };
      }

      conversa.pedido.idadeNiver = idade;
      goTo(conversa, "TEMA");
      return { resposta: renderEtapa(conversa), conversa };
    }

    case "TEMA":
      conversa.pedido.tema = text || "sem tema";
      goTo(conversa, "DATA");
      return { resposta: renderEtapa(conversa), conversa };

    case "DATA": {
      const d = parseDateBR(text);
      if (!d)
        return {
          resposta:
            "Data inválida. Use dd/mm ou dd/mm/aaaa.\n\n" +
            renderEtapa(conversa),
          conversa,
        };

      conversa.pedido.data = d;
      goTo(conversa, "QUANTIDADE");
      return { resposta: renderEtapa(conversa), conversa };
    }

    case "QUANTIDADE": {
      conversa.pedido.quantidade = text;

      const p = conversa.pedido;
      let resumo = `📝 *RESUMO DO PEDIDO*\n\n`;
      resumo += `✅ Item: ${p.item}\n`;
      if (typeof p.precoBase === "number")
        resumo += `💰 Preço base: ${fmtBRL(p.precoBase)}\n`;
      if (p.descricaoKit) resumo += `📦 Inclui: ${p.descricaoKit}\n`;
      if (p.massa) resumo += `🍞 Massa: ${p.massa}\n🍫 Recheio: ${p.recheio}\n`;
      resumo += `📅 Data: ${p.data}\n⚖️ Qtd: ${p.quantidade}\n🎨 Tema: ${p.tema}\n`;
      if (p.niver)
        resumo += `🎂 Niver: ${p.nomeNiver} (${p.idadeNiver} anos)\n`;
      resumo +=
        `\n_Em breve a Márcia entrará em contato!_\n\n` +
        `📲 *Instagram*: https://www.instagram.com/mportobolos/\n` +
        `🌐 *Site*: https://marciaportocakes.com.br/`;

      return { resposta: resumo, conversa };
    }

    default:
      return {
        resposta: "Digite *menu* para recomeçar.\n\n" + buildMenuPrincipal(),
        conversa,
      };
  }
}

module.exports = {
  buildMenuText: buildMenuPrincipal,
  startConversation,
  handleMessage,
};
