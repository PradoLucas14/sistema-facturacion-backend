const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Inicializar aplicación
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", require("./routes/userRoutes"));  // Rutas de usuarios
app.use("/api/products", require("./routes/productRoutes"));  // Rutas de productos
app.use("/api/sales", require("./routes/saleRoutes"));  // Rutas de ventas

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en el puerto ${PORT}`));
