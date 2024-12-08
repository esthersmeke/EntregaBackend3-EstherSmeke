import { Router } from "express";
import { generateUsers, getAllUsers } from "../controllers/mocks.controller.js";

const usersRouter = Router();

// Ruta para generar usuarios
usersRouter.get("/mocks/:n", generateUsers);

// Ruta para obtener todos los usuarios guardados en MongoDB
usersRouter.get("/", getAllUsers);

export default usersRouter;
