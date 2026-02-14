require("dotenv").config();

const app = require("./src/app");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");

// Conversas em memória (por chat)
const conversas = {};

// Lógica do bot
const { startConversation, handleMessage } = require("./bot");

const PORT = process.env.PORT || 3000;

// ======================================================
// CONFIGURAÇÕES DE PRODUÇÃO (RENDER)
// ======================================================
const AUTH_PATH = "/var/data/.wwebjs_auth_marcia";

// Remove arquivos de lock do Chromium que podem travar após restart
function safeUnlink(p) {
  try {
    fs.unlinkSync(p);
  } catch (_) {}
}

function clearChromiumLocks() {
  const lockFiles = ["SingletonLock", "SingletonCookie", "SingletonSocket"];

  // O Chromium pode colocar esses locks em subpastas diferentes
  const possibleDirs = [
    AUTH_PATH,
    path.join(AUTH_PATH, "Default"),
    path.join(AUTH_PATH, "session"),
    path.join(AUTH_PATH, "chrome-profile"),
  ];

  for (const dir of possibleDirs) {
    for (const lf of lockFiles) {
      safeUnlink(path.join(dir, lf));
    }
  }
}

// Tenta limpar locks antes de iniciar
clearChromiumLocks();

// ======================================================
// WHATSAPP CLIENT
// ======================================================
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "marcia-bot",
    dataPath: AUTH_PATH,
  }),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
    ],
  },
});

// QR Code
client.on("qr", (qr) => {
  console.log("\n✅ ESCANEIE ESTE QR CODE COM SEU WHATSAPP:");
  qrcode.generate(qr, { small: true });
});

// Logs úteis
client.on("authenticated", () => {
  console.log("✅ AUTHENTICATED: sessão salva com sucesso!");
});

client.on("auth_failure", (msg) => {
  console.log("❌ AUTH FAILURE:", msg);
});

client.on("ready", () => {
  console.log("🚀 Robô da Márcia Porto Cakes está ON e conectado!");
});

client.on("disconnected", (reason) => {
  console.log("⚠️ DISCONNECTED:", reason);
  // tenta limpar locks se desconectar
  clearChromiumLocks();
});

// Mensagens
client.on("message", async (msg) => {
  try {
    if (msg.from === "status@broadcast") return;
    if (msg.from.includes("@g.us")) return; // ignora grupos

    const from = msg.from;
    const text = msg.body || "";
    const low = text.toLowerCase().trim();

    // Comando para reiniciar o fluxo (zera conversa)
    if (low === "reiniciar" || low === "menu") {
      delete conversas[from];
    }

    // Inicia conversa
    if (!conversas[from]) {
      conversas[from] = startConversation();

      const boasVindas =
        "🎉 *Bem-vindo(a) à Márcia Porto Cakes!* 🍰\n\n" +
        "Escolha uma opção para começar:\n\n" +
        "1️⃣ Bolos\n" +
        "2️⃣ Brigadeiros e Doces\n" +
        "3️⃣ Kits Festa\n\n" +
        "_Digite o número da opção._\n\n" +
        "💡 Você pode digitar *menu* ou *reiniciar* a qualquer momento.";

      await client.sendMessage(from, boasVindas);
      return;
    }

    // Processa o fluxo
    const { resposta, conversa: conversaAtualizada } = handleMessage(
      conversas[from],
      text
    );

    conversas[from] = conversaAtualizada;

    await client.sendMessage(from, resposta);
  } catch (error) {
    console.error("Erro no processamento:", error);
  }
});

// Inicializa o WhatsApp
client.initialize();

// Seu server (se precisar manter vivo/health)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Segurança: não derrubar o processo
process.on("uncaughtException", (err) => {
  console.error("Houve um erro, mas o robô continuará rodando:", err);
});
