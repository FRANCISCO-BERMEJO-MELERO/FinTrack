import express from "express";
import { v4 as uuidv4 } from 'uuid';
import db from "../db/database.js";

const router = express.Router();

router.get("/", (req, res) => {
    const types = db.prepare("SELECT * FROM tipos").all();
    res.send(types);
});

router.post("/", (req, res) => {
    const { name } = req.body;
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    db.prepare("INSERT INTO tipos (id, name, createdAt, updatedAt) VALUES (?, ?, ?, ?)")
        .run(id, name, createdAt, updatedAt);
    res.send({ id });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const type = db.prepare("SELECT * FROM tipos WHERE id = ?").get(id);
    res.send(type);
});

router.put("/", (req, res) => {
    const { id, name } = req.body;
    const updatedAt = new Date().toISOString();
    db.prepare("UPDATE tipos SET name = ?, updatedAt = ? WHERE id = ?")
        .run(name, updatedAt, id);
    res.send({ id });
});

router.delete("/", (req, res) => {
    const { id } = req.body;
    db.prepare("DELETE FROM tipos WHERE id = ?").run(id);
    res.send({ id });
});


export default router;