const express = require("express");
const { check } = require("express-validator");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

// Ruta para registrar usuarios
router.post("/register", [
    check("name", "El nombre debe tener al menos 8 caracteres").isLength({ min: 8 }),
    check("email", "El email no es válido").isEmail(),
    check("password", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 })
], registerUser);

module.exports = router;
