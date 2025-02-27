const Product = require("../models/Product");

// Crear un producto
exports.createProduct = async (req, res) => {
    const { name, price, costPrice, stock } = req.body;

    try {
        // Validar si el producto ya existe
        let existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ msg: "El producto ya existe" });
        }

        // Validar valores negativos
        if (price < 0 || costPrice < 0 || stock < 0) {
            return res.status(400).json({ msg: "El precio, costo y stock no pueden ser negativos" });
        }

        // Crear nuevo producto
        const product = new Product({ name, price, costPrice, stock });
        await product.save();
        res.status(201).json({ msg: "Producto creado exitosamente", product });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Editar un producto (PATCH)
exports.updateProduct = async (req, res) => {
    try {
        const { price, costPrice, stock } = req.body;

        // No permitir valores negativos
        if (price < 0 || costPrice < 0 || stock < 0) {
            return res.status(400).json({ msg: "El precio, costo y stock no pueden ser negativos" });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        res.status(200).json({ msg: "Producto actualizado", product });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json({ msg: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
