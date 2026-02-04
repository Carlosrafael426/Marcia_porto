function buildMenuText() {
  return "Menu 🍰\n1️⃣ Bolo\n2️⃣ Doces\n3️⃣ Personalizado\n\nResponda com o número ou o nome.";
}

function startConversation() {
  return {
    etapa: 1,
    pedido: {
      categoria: null,
      isAniversario: null,
      aniversarianteNome: null,
      aniversarianteIdade: null,
      tema: null,
      data: null,
      quantidade: null,
    },
    historico: [], 
  };
}


function handleMessage(conversa, msg) {
  const msgTrim = String(msg || "").trim();
  const msgLower = msgTrim.toLowerCase();

  // Se já finalizou
  if (conversa.etapa >= 8) {
    return {
      resposta:
        "Seu pedido já foi registrado 💚\nSe quiser fazer outro, digite: reiniciar",
      conversa,
    };
  }

  // ETAPA 1 — Categoria (normaliza)
  if (conversa.etapa === 1) {
    let categoria = msgLower;

    if (categoria === "1" || categoria.includes("bolo")) categoria = "Bolo";
    else if (categoria === "2" || categoria.includes("doce")) categoria = "Doces";
    else if (categoria === "3" || categoria.includes("personal")) categoria = "Personalizado";
    else {
      return {
        resposta: "Não entendi 😅\nResponda com:\n1️⃣ Bolo\n2️⃣ Doces\n3️⃣ Personalizado",
        conversa,
      };
    }

    conversa.pedido.categoria = categoria;

    if (categoria === "Bolo") {
      conversa.etapa = 2;
      return { resposta: "Perfeito! 🎉 É um bolo de aniversário? (Sim/Não)", conversa };
    }

    conversa.pedido.isAniversario = false;
    conversa.etapa = 5;
    return {
      resposta: "Certo! Tem algum tema ou observação? (se não tiver, diga: sem tema)",
      conversa,
    };
  }

  // ETAPA 2 — Confirmar se é aniversário
  if (conversa.etapa === 2) {
    const t = msgLower;

    const isSim = t === "sim" || t === "s" || t === "1" || t.includes("sim");
    const isNao =
      t === "não" || t === "nao" || t === "n" || t === "2" || t.includes("nao");

    if (!isSim && !isNao) {
      return {
        resposta: "Só pra eu entender certinho: é bolo de aniversário? Responda com Sim ou Não 🙂",
        conversa,
      };
    }

    conversa.pedido.isAniversario = isSim;

    if (isSim) {
      conversa.etapa = 3;
      return { resposta: "Qual o nome do aniversariante? 🎂", conversa };
    }

    conversa.etapa = 5;
    return {
      resposta: "Perfeito! Tem algum tema ou observação? (se não tiver, diga: sem tema)",
      conversa,
    };
  }

  // ETAPA 3 — Nome do aniversariante
  if (conversa.etapa === 3) {
    conversa.pedido.aniversarianteNome = msgTrim;
    conversa.etapa = 4;
    return { resposta: "E qual a idade do aniversariante? 🎉 (ex: 6)", conversa };
  }

  // ETAPA 4 — Idade do aniversariante (validação simples)
  if (conversa.etapa === 4) {
    const match = msgTrim.match(/\d+/);
    if (!match) {
      return { resposta: "Me diga a idade só com números, por favor 🙂 (ex: 6)", conversa };
    }
    conversa.pedido.aniversarianteIdade = match[0];
    conversa.etapa = 5;
    return {
      resposta: "Agora me diga: tem algum tema ou observação? (se não tiver, diga: sem tema)",
      conversa,
    };
  }

  // ETAPA 5 — Tema / Observações
  if (conversa.etapa === 5) {
    conversa.pedido.tema = msgTrim;
    conversa.etapa = 6;
    return { resposta: "Para qual data você precisa do pedido?", conversa };
  }

  // ETAPA 6 — Data
  if (conversa.etapa === 6) {
    conversa.pedido.data = msgTrim;
    conversa.etapa = 7;
    return { resposta: "Qual o tamanho ou quantidade desejada?", conversa };
  }

  // ETAPA 7 — Quantidade + Resumo
  if (conversa.etapa === 7) {
    conversa.pedido.quantidade = msgTrim;
    conversa.etapa = 8;

    const p = conversa.pedido;

    const linhas = [
      "Perfeito! 💚 Aqui está o resumo do seu pedido:\n",
      `📦 Produto: ${p.categoria}`,
      `🎉 Aniversário: ${p.isAniversario ? "Sim" : "Não"}`,
    ];

    if (p.isAniversario) {
      linhas.push(`👤 Aniversariante: ${p.aniversarianteNome}`);
      linhas.push(`🎈 Idade: ${p.aniversarianteIdade}`);
    }

    linhas.push(`🎨 Tema/Obs: ${p.tema}`);
    linhas.push(`📅 Data: ${p.data}`);
    linhas.push(`🎂 Quantidade/Tamanho: ${p.quantidade}`);

    return {
      resposta:
        linhas.join("\n") +
        "\n\nEm breve a Márcia vai confirmar com você 😊\nSe quiser fazer outro pedido, digite: reiniciar",
      conversa,
    };
  }

  return {
    resposta: 'Ops 😅 Saí do fluxo.\nDigite: reiniciar  (para começar de novo) ou menu (para ver opções).',
    conversa,
  };
}

module.exports = { buildMenuText, startConversation, handleMessage };
