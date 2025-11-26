import express from "express";
import db from "../db/database.js";

const router = express.Router();

// GET /objetivos - Obtener todos los objetivos
router.get("/", (req, res) => {
    try {
        const objetivos = db
            .prepare("SELECT * FROM objetivos ORDER BY createdAt DESC")
            .all();
        res.json(objetivos);
    } catch (error) {
        console.error("❌ Error al obtener objetivos:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// GET /objetivos/:id - Obtener un objetivo específico
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const objetivo = db
            .prepare("SELECT * FROM objetivos WHERE id = ?")
            .get(id);

        if (!objetivo) {
            return res.status(404).json({ error: "Objetivo no encontrado" });
        }

        res.json(objetivo);
    } catch (error) {
        console.error("❌ Error al obtener objetivo:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// POST /objetivos - Crear nuevo objetivo
router.post("/", (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            cantidad_objetivo,
            cantidad_actual,
            fecha_limite,
            categoria
        } = req.body;

        // Validaciones
        if (!nombre || !cantidad_objetivo || isNaN(cantidad_objetivo)) {
            return res.status(400).json({
                error: "Campos requeridos: nombre, cantidad_objetivo (numérica)"
            });
        }

        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const stmt = db.prepare(`
            INSERT INTO objetivos (
                nombre,
                descripcion,
                cantidad_objetivo,
                cantidad_actual,
                fecha_limite,
                categoria,
                createdAt,
                updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const info = stmt.run(
            nombre,
            descripcion || "",
            Number(cantidad_objetivo),
            cantidad_actual ? Number(cantidad_actual) : 0,
            fecha_limite || null,
            categoria || "Ahorro General",
            createdAt,
            updatedAt
        );

        res.status(201).json({
            message: "✅ Objetivo creado correctamente",
            id: info.lastInsertRowid
        });
    } catch (error) {
        console.error("❌ Error al crear objetivo:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// PUT /objetivos - Actualizar objetivo
router.put("/", (req, res) => {
    try {
        const {
            id,
            nombre,
            descripcion,
            cantidad_objetivo,
            cantidad_actual,
            fecha_limite,
            categoria,
            completado
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "El campo 'id' es obligatorio" });
        }

        const updatedAt = new Date().toISOString();

        const stmt = db.prepare(`
            UPDATE objetivos 
            SET nombre = ?,
                descripcion = ?,
                cantidad_objetivo = ?,
                cantidad_actual = ?,
                fecha_limite = ?,
                categoria = ?,
                completado = ?,
                updatedAt = ?
            WHERE id = ?
        `);

        stmt.run(
            nombre,
            descripcion || "",
            Number(cantidad_objetivo),
            Number(cantidad_actual),
            fecha_limite || null,
            categoria || "Ahorro General",
            completado ? 1 : 0,
            updatedAt,
            id
        );

        res.json({ message: "✅ Objetivo actualizado correctamente", id });
    } catch (error) {
        console.error("❌ Error al actualizar objetivo:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// DELETE /objetivos - Eliminar objetivo
router.delete("/", (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "El campo 'id' es obligatorio" });
        }

        db.prepare("DELETE FROM objetivos WHERE id = ?").run(id);

        res.json({ message: "🗑️ Objetivo eliminado", id });
    } catch (error) {
        console.error("❌ Error al eliminar objetivo:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
