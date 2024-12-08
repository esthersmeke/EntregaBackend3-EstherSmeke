import winstonLogger from "../utils/winston.util.js";

// Manejo centralizado de errores
function errorHandler(error, req, res, next) {
  const message = `${req.method} ${req.url} - ${error.message.toUpperCase()}`;

  if (error.statusCode) {
    // Error controlado
    winstonLogger.error(message);
  } else {
    // Error inesperado
    winstonLogger.fatal(message);
    console.error(error); // Solo en desarrollo
  }

  // Responder al cliente
  return res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Error del servidor" });
}

export default errorHandler;
