// src/routes/carts.router.js
import { Router } from "express";
import {
  createCart,
  readAllCarts,
  readCart,
  updateCart,
  deleteCart,
} from "../controllers/carts.controller.js";

const cartsRouter = Router();

// Crear un carrito
cartsRouter.post("/", createCart);

// Leer todos los carritos
cartsRouter.get("/", readAllCarts);

// Leer un carrito por ID
cartsRouter.get("/:cid", readCart);

// Actualizar un carrito por ID
cartsRouter.put("/:cid", updateCart);

// Eliminar un carrito por ID
cartsRouter.delete("/:cid", deleteCart);

export default cartsRouter;
