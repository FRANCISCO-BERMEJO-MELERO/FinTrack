import express from "express";
import db from "../db/database.js";

const router = express.Router();

// ✅ Crear un nuevo gasto fijo
router.post("/", (req, res) => {
    try {
        const { nombre, cantidad, categoria_id, tipo_id, fecha_inicio, descripcion, frecuencia } = req.body;

        if (!nombre || !cantidad || !categoria_id || !tipo_id || !fecha_inicio) {
            return res.status(400).json({ error: "Campos requeridos: nombre, cantidad, categoria_id, tipo_id, fecha_inicio." });
        }

        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const stmt = db.prepare(`
      INSERT INTO gastos_fijos (nombre, cantidad, categoria_id, tipo_id, fecha_inicio, descripcion, frecuencia, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

        const info = stmt.run(nombre, cantidad, categoria_id, tipo_id, fecha_inicio, descripcion || "", frecuencia || "mensual", createdAt, updatedAt);

        res.status(201).json({ message: "✅ Gasto fijo creado correctamente", id: info.lastInsertRowid });
    } catch (error) {
        console.error("❌ Error al crear gasto fijo:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 🧠 Obtener todos los gastos fijos
router.get("/", (req, res) => {
    try {
        const gastos = db.prepare("SELECT * FROM gastos_fijos").all();
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✏️ Modificar un gasto fijo
router.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cantidad, categoria_id, tipo_id, descripcion, frecuencia, activo } = req.body;

        const updatedAt = new Date().toISOString();
        const stmt = db.prepare(`
      UPDATE gastos_fijos
      SET nombre = COALESCE(?, nombre),
          cantidad = COALESCE(?, cantidad),
          categoria_id = COALESCE(?, categoria_id),
          tipo_id = COALESCE(?, tipo_id),
          descripcion = COALESCE(?, descripcion),
          frecuencia = COALESCE(?, frecuencia),
          activo = COALESCE(?, activo),
          updatedAt = ?
      WHERE id = ?
    `);

        stmt.run(nombre, cantidad, categoria_id, tipo_id, descripcion, frecuencia, activo, updatedAt, id);
        res.json({ message: "✅ Gasto fijo actualizado correctamente" });
    } catch (error) {
        console.error("❌ Error al actualizar gasto fijo:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// 🧹 Eliminar gasto fijo
router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        db.prepare("DELETE FROM gastos_fijos WHERE id = ?").run(id);
        res.json({ message: "🗑️ Gasto fijo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔄 Sincronizar gastos fijos (crear transacciones mensuales)
router.get("/sincronizar", (req, res) => {
    try {
        const hoy = new Date();
        const mesActual = hoy.toISOString().slice(0, 7);

        const gastos = db.prepare("SELECT * FROM gastos_fijos WHERE activo = 1").all();
        const insertTrans = db.prepare(`
      INSERT INTO transacciones (tipo_id, cantidad, categoria_id, fecha, descripcion, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        let generados = 0;

        gastos.forEach((gasto) => {
            const ultimoMes = gasto.ultimo_aplicado ? gasto.ultimo_aplicado.slice(0, 7) : null;
            if (ultimoMes !== mesActual) {
                const fechaHoy = hoy.toISOString().split("T")[0];
                const timestamp = new Date().toISOString();

                insertTrans.run(
                    gasto.tipo_id,
                    gasto.cantidad,
                    gasto.categoria_id,
                    fechaHoy,
                    gasto.descripcion || gasto.nombre,
                    timestamp,
                    timestamp
                );

                db.prepare("UPDATE gastos_fijos SET ultimo_aplicado = ? WHERE id = ?").run(fechaHoy, gasto.id);
                generados++;
            }
        });

        res.json({ message: `✅ ${generados} gastos fijos aplicados.` });
    } catch (error) {
        console.error("❌ Error al sincronizar gastos fijos:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
