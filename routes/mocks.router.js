import express from "express";
import {
  generateUsers,
  generateProducts,
  getAllUsers,
  getAllProducts,
} from "../controllers/mocks.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Ruta base /api/mocks funcionando");
});

// Ruta para generar usuarios
router.get("/users/:n", generateUsers);

// Ruta para generar productos
router.get("/products/:n", generateProducts);

// Ruta para obtener todos los usuarios guardados en MongoDB
router.get("/users", getAllUsers);

// Ruta para obtener todos los productos guardados en MongoDB
router.get("/products", getAllProducts);

export default router;
