const express = require("express");
const cors = require("cors");
const mensagemRoutes = require("./routes/mensagem.routes");
const whatsappRoutes = require("./routes/whatsapp.routes");

const app = express();

// 🔓 LIBERA CORS PARA O FRONT
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

app.use(express.json());

app.get("/", (req, res) => res.send("Servidor funcionando!"));
app.use(mensagemRoutes);
app.use(whatsappRoutes);

module.exports = app;
