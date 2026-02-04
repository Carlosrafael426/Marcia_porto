const express = require("express");
const { conversas } = require("../../estado");
const {
  buildMenuText,
  startConversation,
  handleMessage,
} = require("../services/conversationEngine");

const router = express.Router();

router.post("/mensagem", (req, res) => {
  const { texto, userId } = req.body;
  const id = userId || "teste";

  const msg = String(texto || "").trim();
  const msgLower = msg.toLowerCase();

  // comandos globais
  if (msgLower === "reiniciar" || msgLower === "reset") {
    delete conversas[id];
    return res.json({
      resposta:
        "Tudo bem! ✅ Atendimento reiniciado.\nMe diga: você quer 1️⃣ Bolo, 2️⃣ Doces ou 3️⃣ Personalizado?",
    });
  }

  if (msgLower === "menu") {
    return res.json({ resposta: buildMenuText() });
  }

  // inicia conversa

  if (!conversas[id]) {
    conversas[id] = startConversation();

    const boasVindas =
      "Olá! 💚 Seja bem-vindo(a) à Márcia Porto Cakes 🍰\nO que você deseja?\n1️⃣ Bolo\n2️⃣ Doces\n3️⃣ Personalizado";

    conversas[id].historico.push({
      role: "bot",
      text: boasVindas,
      ts: Date.now(),
    });

    return res.json({
      resposta: boasVindas,
      historico: conversas[id].historico,
    });
  }

  // processa fluxo
  const conversa = conversas[id];
  conversa.historico.push({ role: "user", text: msg, ts: Date.now() });

  const { resposta, conversa: conversaAtualizada } = handleMessage(
    conversa,
    msg,
  );

  conversaAtualizada.historico.push({
    role: "bot",
    text: resposta,
    ts: Date.now(),
  });

  conversas[id] = conversaAtualizada;

  return res.json({ resposta, historico: conversas[id].historico });
});

router.get("/historico", (req, res) => {
  const { userId } = req.query;
  const id = userId || "teste";

  if (!conversas[id]) {
    return res.json({ historico: [] });
  }

  return res.json({ historico: conversas[id].historico });
});


module.exports = router;
