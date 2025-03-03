const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Registrar un usuario
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "El email ya está en uso" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el usuario
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generar token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ msg: "Usuario registrado exitosamente", token });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

