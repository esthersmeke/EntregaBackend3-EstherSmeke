// src/routes/index.router.js
import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const indexRouter = Router();

// Rutas para usuarios
indexRouter.use("/users", usersRouter);

// Rutas para productos
indexRouter.use("/products", productsRouter);

// Rutas para carritos
indexRouter.use("/carts", cartsRouter);

export default indexRouter;
