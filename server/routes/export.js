import express from "express";
import db from "../db/database.js";

const router = express.Router();

// GET /export - Exportar todos los datos
router.get("/", (req, res) => {
    try {
        // Obtener todas las transacciones
        const transacciones = db
            .prepare("SELECT * FROM transacciones ORDER BY fecha DESC")
            .all();

        // Obtener todas las categorías
        const categorias = db
            .prepare("SELECT * FROM categorias")
            .all();

        // Obtener todos los tipos
        const tipos = db
            .prepare("SELECT * FROM tipos")
            .all();

        // Obtener todos los gastos fijos
        const gastosFijos = db
            .prepare("SELECT * FROM gastos_fijos")
            .all();

        // Devolver todos los datos
        res.json({
            transacciones,
            categorias,
            tipos,
            gastosFijos,
            exportDate: new Date().toISOString(),
            totalTransacciones: transacciones.length
        });
    } catch (error) {
        console.error("❌ Error al exportar datos:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
