const express = require("express");
const { conversas } = require("../../estado");
const { startConversation, handleMessage } = require("../services/conversationEngine");
const { sendWhatsAppMessage } = require("../services/whatsappCloudApi");

const router = express.Router();

// Variáveis via .env (recomendado)
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

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

// 2) Recebe mensagens
router.post("/webhook", async (req, res) => {
  try {
    const entry = req.body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    const message = value?.messages?.[0];
    if (!message) return res.sendStatus(200); // nada pra processar

    // Número de quem mandou (identificador do usuário)
    const from = message.from;

    // Texto enviado
    const text = message.text?.body || "";

    // cria conversa se não existir
    if (!conversas[from]) {
      conversas[from] = startConversation();

      const boasVindas =
        "Olá! 💚 Seja bem-vindo(a) à Márcia Porto Cakes 🍰\nO que você deseja?\n1️⃣ Bolo\n2️⃣ Doces\n3️⃣ Personalizado";

      // manda boas-vindas e encerra
      await sendWhatsAppMessage({
        phoneNumberId: PHONE_NUMBER_ID,
        accessToken: ACCESS_TOKEN,
        to: from,
        text: boasVindas,
      });

      return res.sendStatus(200);
    }

    // processa fluxo
    const conversa = conversas[from];
    const { resposta, conversa: conversaAtualizada } = handleMessage(conversa, text);
    conversas[from] = conversaAtualizada;

    // responde no WhatsApp
    await sendWhatsAppMessage({
      phoneNumberId: PHONE_NUMBER_ID,
      accessToken: ACCESS_TOKEN,
      to: from,
      text: resposta,
    });

    return res.sendStatus(200);
  } catch (err) {
    console.error("Erro no webhook WhatsApp:", err?.response?.data || err);
    return res.sendStatus(200); // WhatsApp exige 200 pra não ficar reenviando
  }
});

module.exports = router;
