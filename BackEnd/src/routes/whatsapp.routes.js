const express = require("express");
const { conversas } = require("../../estado");
const { startConversation, handleMessage } = require("../services/conversationEngine");
const { sendWhatsAppMessage } = require("../services/whatsappCloudApi");

const router = express.Router();

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// dedupe simples (evita responder 2x)
const processedMessageIds = new Set();
function rememberMessageId(id) {
  if (!id) return false;
  if (processedMessageIds.has(id)) return true;
  processedMessageIds.add(id);
  // evita crescer infinito
  if (processedMessageIds.size > 5000) {
    const first = processedMessageIds.values().next().value;
    processedMessageIds.delete(first);
  }
  return false;
}

// 1) Verificação do webhook
router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// 2) Recebe eventos
router.post("/webhook", (req, res) => {
  // ✅ responde rápido pra Meta não reenviar
  res.sendStatus(200);

  (async () => {
    try {
      const entry = req.body?.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      const message = value?.messages?.[0];
      if (!message) return;

      // evita duplicado
      if (rememberMessageId(message.id)) return;

      const from = message.from;

      // pega texto (se não for texto, envia orientação)
      const text = message.text?.body?.trim();

      if (!text) {
        await sendWhatsAppMessage({
          phoneNumberId: PHONE_NUMBER_ID,
          accessToken: ACCESS_TOKEN,
          to: from,
          text: "Por enquanto eu entendo apenas mensagens de texto 🙂\nMe diga: 1️⃣ Bolo, 2️⃣ Doces ou 3️⃣ Personalizado.",
        });
        return;
      }

      // cria conversa se não existir
      if (!conversas[from]) {
        conversas[from] = startConversation();

        const boasVindas =
          "Olá! 💚 Seja bem-vindo(a) à Márcia Porto Cakes 🍰\nO que você deseja?\n1️⃣ Bolo\n2️⃣ Doces\n3️⃣ Personalizado";

        await sendWhatsAppMessage({
          phoneNumberId: PHONE_NUMBER_ID,
          accessToken: ACCESS_TOKEN,
          to: from,
          text: boasVindas,
        });
        return;
      }

      // processa fluxo
      const conversa = conversas[from];
      const { resposta, conversa: conversaAtualizada } = handleMessage(conversa, text);
      conversas[from] = conversaAtualizada;

      await sendWhatsAppMessage({
        phoneNumberId: PHONE_NUMBER_ID,
        accessToken: ACCESS_TOKEN,
        to: from,
        text: resposta,
      });
    } catch (err) {
      console.error("Erro no webhook WhatsApp:", err?.response?.data || err);
    }
  })();
});

module.exports = router;
