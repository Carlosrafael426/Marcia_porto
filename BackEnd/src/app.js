const express = require("express");
const cors = require("cors");
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Importando sua lógica de conversa existente
const { conversas } = require("../estado"); 
const { startConversation, handleMessage } = require("./services/conversationEngine");

const app = express();

// --- CONFIGURAÇÃO DO CLIENTE WHATSAPP (Substitui o Webhook da Meta) ---
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necessário para rodar em servidores como Render
    }
});

// Gera o QR Code no terminal para você escanear
client.on('qr', (qr) => {
    console.log('--- ESCANEIE O QR CODE ABAIXO ---');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Robô da Márcia Porto Cakes está ONLINE e conectado!');
});

// Lógica Principal de Recebimento de Mensagens
client.on('message', async (msg) => {
    const from = msg.from;
    const text = msg.body;

    // Ignorar mensagens de grupos para não bugar o robô
    if (from.includes('@g.us')) return;

    // Comando para reiniciar fluxo
    if (text.toLowerCase() === 'reiniciar') {
        delete conversas[from];
    }

    // Se não houver conversa ativa, envia boas-vindas
    if (!conversas[from]) {
        conversas[from] = startConversation();
        const boasVindas = "Olá! 💚 Seja bem-vindo(a) à Márcia Porto Cakes 🍰\nO que você deseja?\n1️⃣ Bolo\n2️⃣ Doces\n3️⃣ Personalizado";
        return client.sendMessage(from, boasVindas);
    }

    // Processa o fluxo usando sua handleMessage original
    try {
        const conversa = conversas[from];
        const { resposta, conversa: conversaAtualizada } = handleMessage(conversa, text);
        conversas[from] = conversaAtualizada;

        await client.sendMessage(from, resposta);
    } catch (err) {
        console.error("Erro ao processar mensagem:", err);
    }
});


// --- RESTO DA SUA CONFIGURAÇÃO DE EXPRESS ---

const allowedOrigins = [
  "https://marcia-porto.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS bloqueado"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor e Robô funcionando!");
});

// Como agora o robô roda via 'client.on', você pode manter mensagemRoutes 
// para o seu front-end, mas whatsappRoutes (Webhook Meta) não será mais necessária.
const mensagemRoutes = require("./routes/mensagem.routes");
app.use(mensagemRoutes);

const PORT = process.env.PORT || 3000;

module.exports = app;