import { config } from "dotenv";
import args from "./args.util.js";

const { mode } = args; // Este 'mode' viene de la CLI (ej: --mode=prod)
const path = `.env.${mode}`;
config({ path }); // Carga el archivo .env correspondiente al modo

// Validación de variables requeridas
const requiredEnvVars = ["MONGO_URI", "GOOGLE_ID", "PORT"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Variable de entorno ${key} no definida en ${path}`);
  }
});

export default {
  MODE: mode, // Aquí exportamos el modo actual
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_ID: process.env.GOOGLE_ID,
  PORT: process.env.PORT || 3000,
};
