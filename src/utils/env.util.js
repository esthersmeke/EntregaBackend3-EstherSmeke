import { config } from "dotenv";
import args from "./args.util.js";

const { mode } = args;
const path = `.env.${mode}`;
config({ path }); // Carga del archivo .env adecuado

// Validación de variables requeridas
const requiredEnvVars = ["MONGO_URI", "GOOGLE_ID", "PORT"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Variable de entorno ${key} no definida en ${path}`);
  }
});

export default {
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_ID: process.env.GOOGLE_ID,
  PORT: process.env.PORT || 3000,
};