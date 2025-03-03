const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");

// Inicializar aplicación
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/auth", authRoutes);  // Rutas de autenticación
app.use("/api/users", userRoutes);  // Rutas de usuarios
app.use("/api/products", productRoutes);  // Rutas de productos
app.use("/api/sales", saleRoutes);  // Rutas de ventas

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => console.log(`🔥 Servidor corriendo en el puerto ${PORT}`));

