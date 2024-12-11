// index.js
import express from "express";
import logger from "./src/utils/winston.util.js";
import dbConnect from "./src/utils/db.util.js";
import indexRouter from "./src/routes/index.router.js";
import args from "./src/utils/args.util.js";
import env from "./src/utils/env.util.js";
import loggerMiddleware from "./src/middlewares/winstonLogger.middleware.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/utils/swagger.util.js";

const port = env.PORT || args.p;
const mode = args.mode || env.MODE;

// Conectar a la base de datos
dbConnect();

// Crear el servidor
const app = express();

// Configuración del servidor
app.use(express.json());

// Implementar el middleware de logger
app.use(loggerMiddleware);

// Documentación Swagger
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas principales
app.use("/api", indexRouter);

// Ruta de salud (health check)
app.get("/", (req, res) => {
  req.logger.info("Solicitud GET en /");
  res.send(`Servidor funcionando en modo ${mode}`);
});

// Manejo de errores 404 (ruta no encontrada)
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Implementar el middleware de manejo de errores centralizado
app.use(errorHandler);

// Iniciar servidor
app.listen(port, () => {
  logger.info(`
  =========================
  Servidor Iniciado 🚀
  Modo: ${mode.toUpperCase()}
  Puerto: ${port}
  =========================
  `);
});

// Captura de errores no manejados
process.on("unhandledRejection", (reason) => {
  logger.fatal(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  logger.fatal(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

// Ruta para evitar el error de favicon.ico
app.get("/favicon.ico", (req, res) => res.status(204).end());
