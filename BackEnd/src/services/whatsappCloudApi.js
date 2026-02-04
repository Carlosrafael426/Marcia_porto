const axios = require("axios");

async function sendWhatsAppMessage({ phoneNumberId, accessToken, to, text }) {
  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

  await axios.post(
    url,
    {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

module.exports = { sendWhatsAppMessage };
