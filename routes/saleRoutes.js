const express = require("express");
const { createSale, getSales, generateInvoice } = require("../controllers/saleController");

const router = express.Router();

router.post("/register", createSale);
router.get("/", getSales);
router.get("/invoice/:id", generateInvoice);

module.exports = router;
