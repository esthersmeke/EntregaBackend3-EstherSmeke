import express from "express";
import mongoose from "mongoose";
import logger from "./src/utils/winston.util.js";
import dbConnect from "./src/utils/db.util.js";
import indexRouter from "./src/routes/index.router.js";
import args from "./src/utils/args.util.js";
import env from "./src/utils/env.util.js";
import loggerMiddleware from "./src/middlewares/winstonLogger.middleware.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import { cpus } from "os";
import cluster from "cluster";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/utils/swagger.util.js";

const port = args.p || env.PORT;
const mode = args.mode || env.MODE;
const numberOfCPUs = cpus().length;

// Proceso principal (Master)
if (cluster.isPrimary) {
  console.log(`Número de CPUs disponibles: ${numberOfCPUs}`);
  console.log(`Proceso Principal (Master) PID: ${process.pid}`);

  // Crear un worker por cada CPU
  for (let i = 0; i < numberOfCPUs; i++) {
    cluster.fork();
  }

  // Manejar la finalización de un Worker
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} finalizado`);
    cluster.fork(); // Reemplazar el Worker
  });
} else {
  // Crea el Servidor en cada Worker
  const app = express();

  // Configuración del servidor
  app.use(express.json());

  // Implementar el middleware de logger
  app.use(loggerMiddleware);

  // Conexión a la base de datos
  dbConnect();

  // Rutas
  app.use("/api", indexRouter);

  // Ruta principal
  app.get("/", (req, res) => {
    req.logger.info("Solicitud GET en /");
    res.send(
      `Servidor funcionando en modo ${mode} - Worker PID: ${process.pid}`
    );
  });

  // Swagger
  const swaggerSpecs = swaggerJsdoc(swaggerOptions);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  // Manejo de errores 404 (ruta no encontrada)
  app.use((req, res, next) => {
    const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
  });

  // Implementar el middleware de manejo de errores centralizado
  app.use(errorHandler);

  // Ruta para evitar el error de favicon.ico
  app.get("/favicon.ico", (req, res) => res.status(204).end());

  // Iniciar servidor
  app.listen(port, () => {
    logger.info(
      `Servidor escuchando en el puerto ${port} - Worker PID: ${process.pid}`
    );
  });
}
