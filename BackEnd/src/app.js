const express = require("express");
const cors = require("cors");

const mensagemRoutes = require("./routes/mensagem.routes");
const whatsappRoutes = require("./routes/whatsapp.routes");

const app = express();

// 🌐 ORIGENS PERMITIDAS
const allowedOrigins = [
  "https://marcia-porto.vercel.app", // FRONT EM PRODUÇÃO (Vercel)
  "http://localhost:5173",           // FRONT LOCAL (Vite)
];

// 🔓 CONFIGURAÇÃO DE CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // permite chamadas sem origin (Insomnia, Postman, Webhook WhatsApp)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS bloqueado"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🧠 BODY JSON
app.use(express.json());

// ✅ ROTA DE TESTE
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// 📦 ROTAS
app.use(mensagemRoutes);
app.use(whatsappRoutes);

module.exports = app;
