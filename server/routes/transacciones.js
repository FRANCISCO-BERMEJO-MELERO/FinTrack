import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../db/database.js";

const router = express.Router();

router.get("/", (req, res) => {
    try {
        const transactions = db
            .prepare("SELECT * FROM transacciones ORDER BY createdAt DESC")
            .all();
        res.json(transactions);
    } catch (error) {
        console.error("❌ Error al obtener transacciones:", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get("/inversiones", (req, res) => {
    try {
        const transactions = db
            .prepare("SELECT * FROM transacciones WHERE tipo_id = 3 ORDER BY createdAt DESC")
            .all();
        res.json(transactions);
    } catch (error) {
        console.error("❌ Error al obtener transacciones:", error.message);
        res.status(500).json({ error: error.message });
    }
});


router.get("/balance", (req, res) => {
    try {
        const total = db
            .prepare(
                "SELECT SUM( CASE WHEN tipo_id = 1 THEN cantidad WHEN tipo_id IN (2, 3) THEN -cantidad ELSE 0 END) AS total FROM transacciones;"
            )
            .get();
        res.json(total || { total: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/transacciones_actuales", (req, res) => {
    try {
        const año = new Date().getFullYear();
        const mes = new Date().getMonth() + 1 ;
        const total = db
            .prepare(
                "SELECT * FROM transacciones WHERE strftime('%Y', fecha) = ? AND strftime('%m', fecha) = ?"
            )
            .all(año.toString(), mes.toString());
        res.json(total || { total: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/ingreso_actual", (req, res) => {
    try {
        const date = new Date().toISOString().split("T")[0];
        const total = db
            .prepare(
                "SELECT SUM(cantidad) as total FROM transacciones WHERE tipo_id = 1 AND fecha = ?"
            )
            .get(date);
        res.json(total || { total: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/gasto_actual", (req, res) => {
    try {
        const año = new Date().getFullYear();
        const mes = new Date().getMonth() + 1;
        const total = db
            .prepare(
                "SELECT SUM(cantidad) as total FROM transacciones WHERE (tipo_id = 2 OR tipo_id = 3) AND strftime('%Y', fecha) = ? AND strftime('%m', fecha) = ?"
            )
            .all(año.toString(), mes.toString());
        res.json(total || { total: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/inversion_actual", (req, res) => {
    try {
        const date = new Date().toISOString().split("T")[0];
        const total = db
            .prepare(
                "SELECT SUM(cantidad) as total FROM transacciones WHERE tipo_id = 2 AND fecha = ?"
            )
            .get(date);
        res.json(total || { total: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






router.post("/", (req, res) => {
    try {
        const { tipo_id, cantidad, categoria_id, fecha, descripcion } = req.body;
        if (
            !tipo_id ||
            !cantidad ||
            !categoria_id ||
            !fecha ||
            isNaN(cantidad)
        ) {
            return res.status(400).json({
                error:
                    "Campos requeridos: tipo_id, cantidad, categoria_id, fecha. 'cantidad' debe ser numérica.",
            });
        }
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const stmt = db.prepare(` INSERT INTO transacciones (tipo_id, cantidad, categoria_id, fecha, descripcion, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?) `);

        const info = stmt.run(
            Number(tipo_id),
            Number(cantidad),
            Number(categoria_id),
            fecha,
            descripcion || "",
            createdAt,
            updatedAt
        );

        // info.lastInsertRowid te devuelve el id generado por SQLite
        res.status(201).json({
            message: "✅ Transacción creada correctamente",
            id: info.lastInsertRowid
        });

    } catch (error) {
        console.error("❌ Error al insertar transacción:", error.message);
        res.status(500).json({ error: error.message });
    }
});



router.post("/inversion", (req, res) => {
    try {
        const {
            tipo_id,          // tipo de transacción (debe existir en 'tipos', por ejemplo 'inversión')
            cantidad,         // monto total invertido
            categoria_id,     // categoría asociada (ej. "Ahorros" o "Inversiones")
            fecha,
            descripcion,
            tipo_inversion,   // 'cripto', 'etf', 'bonos', 'acciones', ...
            plataforma,       // Binance, Degiro, etc.
            activo,           // BTC, AAPL, SP500, etc.
            unidades,         // número de tokens o acciones
            valor_unitario,   // precio por unidad en la fecha de compra
            moneda            // USD, EUR, etc.
        } = req.body;

        // 🧩 Validaciones básicas
        if (!tipo_id || !cantidad || !categoria_id || !fecha || isNaN(cantidad)) {
            return res.status(400).json({
                error: "Campos requeridos: tipo_id, cantidad, categoria_id, fecha. 'cantidad' debe ser numérica."
            });
        }

        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        // 🧾 Inserción completa según la estructura actual
        const stmt = db.prepare(`
            INSERT INTO transacciones (
                tipo_id,
                cantidad,
                categoria_id,
                fecha,
                descripcion,
                es_inversion,
                tipo_inversion,
                plataforma,
                activo,
                unidades,
                valor_unitario,
                moneda,
                createdAt,
                updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const info = stmt.run(
            Number(tipo_id),
            Number(cantidad),
            Number(categoria_id),
            fecha,
            descripcion || "",
            1, // es_inversion = 1
            tipo_inversion || null,
            plataforma || null,
            activo || null,
            unidades ? Number(unidades) : null,
            valor_unitario ? Number(valor_unitario) : null,
            moneda || "USD",
            createdAt,
            updatedAt
        );

        res.status(201).json({
            message: "✅ Inversión registrada correctamente",
            id: info.lastInsertRowid
        });

    } catch (error) {
        console.error("❌ Error al registrar inversión:", error.message);
        res.status(500).json({ error: error.message });
    }
});




router.put("/", (req, res) => {
    try {
        const { id, tipo_id, cantidad, categoria_id, fecha, descripcion } =
            req.body;
        if (!id)
            return res.status(400).json({ error: "El campo 'id' es obligatorio" });
        const updatedAt = new Date().toISOString();
        db.prepare(
            "UPDATE transacciones SET tipo_id = ?, cantidad = ?, categoria_id = ?, fecha = ?, descripcion = ?, updatedAt = ? WHERE id = ?"
        ).run(
            Number(tipo_id),
            Number(cantidad),
            Number(categoria_id),
            fecha,
            descripcion || "",
            updatedAt,
            id
        );
        res.json({ message: "✅ Transacción actualizada correctamente", id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/", (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: "El campo 'id' es obligatorio" });
        db.prepare("DELETE FROM transacciones WHERE id = ?").run(id);
        res.json({ message: "🗑️ Transacción eliminada", id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const transaction = db
            .prepare("SELECT * FROM transacciones WHERE id = ?")
            .get(id);
        if (!transaction) {
            return res.status(404).json({ error: "Transacción no encontrada" });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
