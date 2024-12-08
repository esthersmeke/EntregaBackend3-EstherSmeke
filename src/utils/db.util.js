import { connect } from "mongoose";
import env from "./env.util.js";
import logger from "./winston.util.js";

async function dbConnect() {
  try {
    await connect(env.MONGO_URI);
    logger.info(`Conexión a MongoDB establecida en PID: ${process.pid}`);
  } catch (error) {
    logger.error(`Error de conexión a la base de datos: ${error.message}`);
    process.exit(1); // Finaliza el proceso en caso de error crítico
  }
}

export default dbConnect;
