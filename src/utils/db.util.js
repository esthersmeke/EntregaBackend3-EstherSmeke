import { connect } from "mongoose";
import env from "./env.util.js";
import logger from "./winston.util.js";

async function dbConnect() {
  try {
    const connection = await connect(env.MONGO_URI);
  } catch (error) {
    logger.error(`Error de conexión a la base de datos: ${error.message}`);
    process.exit(1); // Finaliza el proceso en caso de error crítico
  }
}

export default dbConnect;
