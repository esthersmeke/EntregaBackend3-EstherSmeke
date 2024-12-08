import express from "express";
import {
  generateProducts,
  getAllProducts,
} from "../controllers/mocks.controller.js";

const router = express.Router();

// Ruta para generar productos
router.get("/products/mocks/:n", generateProducts);

// Ruta para obtener todos los productos guardados en MongoDB
router.get("/products", getAllProducts);

export default router;
