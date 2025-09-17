import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Ruta de prueba
// app.get("/", (req, res) => {
//   res.send("API de Blog con MongoDB en marcha!");
// });
app.use("/api/users", userRoutes);
// Conectar a la base de datos
connectDB();
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
