import express from "express";
import {
  generateUsers,
  generateProducts,
} from "../controllers/mocks.controller.js";

const router = express.Router();

// Ruta para generar usuarios
router.get("/users/:n", generateUsers);

// Ruta para generar productos
router.get("/products/:n", generateProducts);

export default router;
