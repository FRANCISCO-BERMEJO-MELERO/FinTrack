import express from "express";
import cors from "cors";
import transactionsRoutes from "./routes/transacciones.js";
import typesRoutes from "./routes/tipos.js";
import categoriesRoutes from "./routes/categorias.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/transacciones", transactionsRoutes);
app.use("/tipos", typesRoutes);
app.use("/categorias", categoriesRoutes);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
