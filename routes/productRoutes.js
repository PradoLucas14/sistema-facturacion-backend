const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Rutas para el CRUD de productos
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct); // PATCH para actualizar
router.delete("/:id", productController.deleteProduct);

module.exports = router;
