import { config } from "dotenv";
import args from "./args.util.js";

const { mode } = args; // Este 'mode' viene de la CLI (ej: --mode=prod)

// Solo cargar dotenv si el proyecto no está en producción
if (process.env.NODE_ENV !== "production") {
  const path = `.env.${mode}`;
  config({ path }); // Carga el archivo .env correspondiente al modo
}

// Validación de variables requeridas
const requiredEnvVars = ["MONGO_URI", "PORT"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(
      `Variable de entorno ${key} no definida en el entorno actual`
    );
  }
});

export default {
  MODE: mode || process.env.MODE,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
};
