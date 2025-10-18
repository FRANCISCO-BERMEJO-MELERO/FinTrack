import express from "express";
import { v4 as uuidv4 } from 'uuid';
import db from "../db/database.js";

const router = express.Router();



router.get("/", (req, res) => {
    const transactions = db.prepare("SELECT * FROM transacciones ORDER BY createdAt DESC").all();
    res.send(transactions);
});

router.post("/", (req, res) => {
    const { type_id, amount, category_id, date, description } = req.body;
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    db.prepare("INSERT INTO transacciones (id, type_id, amount, category_id, date, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .run(id, type_id, amount, category_id, date, description, createdAt, updatedAt);
    res.send({ id });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const transaction = db.prepare("SELECT * FROM transacciones WHERE id = ?").get(id);
    res.send(transaction);
});

router.put("/", (req, res) => {
    const { id, type_id, amount, category_id, date, description } = req.body;
    const updatedAt = new Date().toISOString();
    db.prepare("UPDATE transacciones SET type_id = ?, amount = ?, category_id = ?, date = ?, description = ?, updatedAt = ? WHERE id = ?")
        .run(type_id, amount, category_id, date, description, updatedAt, id);
    res.send({ id });
});


router.delete("/", (req, res) => {
    const { id } = req.body;
    db.prepare("DELETE FROM transacciones WHERE id = ?").run(id);
    res.send({ id });
});

router.get("/ingreso_actual", (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    const total = db.prepare("SELECT SUM(amount) as total FROM transacciones WHERE type_id = 1 AND date = ?").get(date);
    res.send(total);
});


export default router;