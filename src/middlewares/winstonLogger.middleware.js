import winstonLogger from "../utils/winston.util.js";

// Middleware de registro de solicitudes HTTP
function loggerMiddleware(req, res, next) {
  try {
    // Agregar logger al objeto req
    req.logger = winstonLogger;

    // Crear mensaje para el registro
    const message = `${req.method} ${req.url} - IP: ${req.ip}`;

    // Registrar la solicitud como HTTP
    req.logger.http(message);

    // Continuar con la siguiente función
    return next();
  } catch (error) {
    req.logger.error(`Error en el middleware de logger: ${error.message}`);
    return next(error);
  }
}

export default loggerMiddleware;
