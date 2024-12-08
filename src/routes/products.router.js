import express from "express";
import {
  generateProducts,
  getAllProducts,
} from "../controllers/mocks.controller.js";

const router = express.Router();

// Ruta para generar productos
router.get("/mocks/:n", generateProducts);

// Ruta para obtener todos los productos guardados en MongoDB
router.get("/", getAllProducts);

export default router;
