import winstonLogger from "../utils/winston.util.js";

// Manejo centralizado de errores
function errorHandler(error, req, res, next) {
  const message = `${req.method} ${req.url} - ${error.message.toUpperCase()}`;

  // Solo registrar si no se ha registrado antes
  if (error.statusCode && !error.logged) {
    winstonLogger.error(message); // Error controlado
    error.logged = true; // Marcar como registrado
  } else if (!error.statusCode && !error.logged) {
    winstonLogger.fatal(message); // Error inesperado
    console.error(error); // Solo en desarrollo
    error.logged = true;
  }

  // Responder al cliente
  return res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Error del servidor" });
}

export default errorHandler;
