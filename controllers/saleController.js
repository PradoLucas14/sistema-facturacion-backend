const Sale = require("../models/Sale");
const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.createSale = async (req, res) => {
    try {
        const { userId, products } = req.body;

        let totalAmount = 0;
        for (let item of products) {
            totalAmount += item.quantity * item.price;
        }

        const sale = new Sale({ userId, products, totalAmount });
        await sale.save();

        res.status(201).json({ msg: "Venta registrada", sale });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate("userId", "username email").populate("products.productId", "name price");
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

exports.generateInvoice = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id)
            .populate("products.productId", "name price")
            .populate("userId", "username email");

        if (!sale) {
            return res.status(404).json({ msg: "Venta no encontrada" });
        }

        const doc = new PDFDocument();
        const filePath = `./invoices/factura_${sale._id}.pdf`;
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(20).text("Factura de Compra", { align: "center" });
        doc.moveDown();
        doc.text(`Fecha: ${new Date(sale.createdAt).toLocaleString()}`);
        doc.text(`Cliente: ${sale.userId.username}`);
        doc.text(`Correo: ${sale.userId.email}`);
        doc.moveDown();

        doc.fontSize(16).text("Productos:", { underline: true });
        sale.products.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.productId.name} - ${item.quantity} x $${item.price}`);
        });

        doc.moveDown();
        doc.fontSize(18).text(`Total: $${sale.totalAmount}`, { bold: true });

        doc.end();

        res.download(filePath, `factura_${sale._id}.pdf`);
    } catch (error) {
        res.status(500).json({ msg: "Error al generar factura", error });
    }
};
