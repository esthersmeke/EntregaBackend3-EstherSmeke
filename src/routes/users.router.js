// src/routes/users.router.js
import { Router } from "express";
import {
  create,
  createMock,
  createMocks,
  readAll,
  read,
  update,
  destroy,
} from "../controllers/users.controller.js";

const usersRouter = Router();

// Crear usuario
usersRouter.post("/", create);

// Crear usuario de prueba (mock)
usersRouter.get("/mocks", createMock);

// Crear múltiples usuarios de prueba (mocks)
usersRouter.get("/mocks/:quantity", createMocks);

// Leer todos los usuarios
usersRouter.get("/", readAll);

// Leer un usuario por ID
usersRouter.get("/:uid", read);

// Actualizar un usuario
usersRouter.put("/:uid", update);

// Eliminar un usuario
usersRouter.delete("/:uid", destroy);

export default usersRouter;
