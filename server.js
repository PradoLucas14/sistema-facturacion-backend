require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Importar conexión a la DB

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("🚀 API de Sistema de Facturación funcionando...");
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
