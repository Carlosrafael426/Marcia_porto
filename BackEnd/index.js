require("dotenv").config();
const app = require("./src/app");
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 1. Criamos o objeto de conversas na memória (já que não existe o arquivo estado.js)
const conversas = {}; 

// 2. Importamos a lógica do caminho correto: src -> services -> conversationEngine
const { startConversation, handleMessage } = require("./src/services/conversationEngine");

const PORT = process.env.PORT || 3000;

// 3. Configuração do WhatsApp
const path = require('path');

const client = new Client({
    // Mudamos o diretório para fora da pasta do OneDrive
    authStrategy: new LocalAuth({
        dataPath: path.join(process.env.USERPROFILE, '.wwebjs_auth_marcia') 
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});;

client.on('qr', (qr) => {
    console.log('\n✅ ESCANEIE ESTE QR CODE COM SEU WHATSAPP:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🚀 Robô da Márcia Porto Cakes está ON e conectado!');
});

client.on('message', async (msg) => {
    // Ignora mensagens de grupos
    if (msg.from.includes('@g.us')) return;

    const from = msg.from;
    const text = msg.body;

    // Comando para reiniciar o fluxo
    if (text.toLowerCase() === 'reiniciar' || text.toLowerCase() === 'menu') {
        delete conversas[from];
    }

    // Se a conversa não existir no objeto, inicia ela
    if (!conversas[from]) {
        conversas[from] = startConversation();
        const boasVindas = "Olá! 🍰 Seja bem-vindo(a) à Márcia Porto Cakes.\n\n" + 
                           "1️⃣ Bolo\n2️⃣ Doces\n3️⃣ Personalizado\n\nResponda com o número ou nome.";
        return client.sendMessage(from, boasVindas);
    }

    // Processa a mensagem usando sua lógica de etapas
    try {
        const { resposta, conversa: conversaAtualizada } = handleMessage(conversas[from], text);
        conversas[from] = conversaAtualizada;

        await client.sendMessage(from, resposta);
    } catch (error) {
        console.error("Erro no processamento:", error);
    }
});

client.initialize();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});