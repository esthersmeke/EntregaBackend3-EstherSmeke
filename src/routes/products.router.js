import { Router } from "express";
import {
  createMocks,
  createProduct,
  readAllProducts,
  readProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const productsRouter = Router();

// Crear producto
productsRouter.post("/", createProduct);

// Crear múltiples productos de prueba (mocks)
productsRouter.get("/mocks/:quantity", createMocks);

// Leer todos los productos
productsRouter.get("/", readAllProducts);

// Leer un producto por ID
productsRouter.get("/:pid", readProduct);

// Actualizar un producto por ID
productsRouter.put("/:pid", updateProduct);

// Eliminar un producto por ID
productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
