import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mocksRouter from "./routes/mocks.router.js";
import logger from "./logger.js"; // Importa el logger ya configurado

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => {
    logger.error(`Error de conexión a MongoDB: ${err.message}`);
    console.error("Error de conexión a MongoDB:", err);
  });

// Middleware para usar el router de mocks
app.use("/api/mocks", mocksRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Manejar errores 404 (ruta no encontrada)
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Middleware de manejo de errores generales
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });

  // Registrar el error en los logs
  if (status === 404) {
    logger.warn(
      `${status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    logger.error(
      `${status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
