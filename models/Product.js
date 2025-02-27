const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // No permite nombres duplicados
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
        min: 0 // No permite precios negativos
    },
    costPrice: {
        type: Number,
        required: true,
        min: 0 // No permite costos negativos
    },
    stock: {
        type: Number,
        required: true,
        min: 0 // No permite stock negativo
    }
});

module.exports = mongoose.model("Product", ProductSchema);
