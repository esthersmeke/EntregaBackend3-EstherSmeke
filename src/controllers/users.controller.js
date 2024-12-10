// src/controllers/users.controller.js
import User from "../dao/user.model.js";
import logger from "../utils/winston.util.js";
import CustomError from "../utils/CustomError.util.js";
import errors from "../utils/errors.util.js";
import { faker } from "../utils/faker.util.js";

// Crear un usuario
export const create = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      CustomError.newError(errors.missingData);
    }
    const user = await User.create(req.body);
    logger.info(`User created: ${user.email}`);
    return res.status(201).json({
      response: user,
      message: "USER CREATED",
    });
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    return next(error);
  }
};

// Crear un usuario de prueba
export const createMock = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Generar valores por defecto si no se proporcionan
    const mockName = name || faker.person.firstName().toLowerCase();
    const mockEmail = email || faker.internet.email();
    const mockPassword = password || faker.internet.password();

    const user = await User.create({
      name: mockName,
      email: mockEmail,
      password: mockPassword,
    });
    logger.info(`Mock user created: ${user.email}`);
    return res.status(201).json({
      response: user,
      message: "MOCK USER CREATED",
    });
  } catch (error) {
    logger.error(`Error creating mock user: ${error.message}`);
    return next(error);
  }
};

// Crear múltiples usuarios de prueba
export const createMocks = async (req, res, next) => {
  try {
    const { quantity } = req.params;
    if (!quantity || isNaN(quantity)) {
      CustomError.newError(errors.invalidQuantity);
    }

    const users = [];
    for (let i = 0; i < quantity; i++) {
      users.push({
        name: faker.person.firstName().toLowerCase(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
      });
    }

    await User.insertMany(users);
    logger.info(`${quantity} Users created successfully.`);
    return res.status(201).json({
      message: `${quantity} Users created successfully.`,
    });
  } catch (error) {
    logger.error(`Error creating users: ${error.message}`);
    return next(error);
  }
};

// Leer todos los usuarios
export const readAll = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      CustomError.newError(errors.userNotFound);
    }
    logger.info(`Users retrieved: ${users.length}`);
    return res.status(200).json({
      response: users,
      message: "USERS READ",
    });
  } catch (error) {
    logger.error(`Error reading users: ${error.message}`);
    return next(error);
  }
};

// Leer un usuario por ID
export const read = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);
    if (!user) {
      CustomError.newError(errors.userNotFound);
    }
    logger.info(`User retrieved: ${user.email}`);
    return res.status(200).json({
      response: user,
      message: "USER READ",
    });
  } catch (error) {
    logger.error(`Error retrieving user: ${error.message}`);
    return next(error);
  }
};

// Actualizar un usuario
export const update = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const updatedUser = await User.findByIdAndUpdate(uid, req.body, {
      new: true,
    });
    if (!updatedUser) {
      CustomError.newError(errors.userNotFound);
    }
    logger.info(`User updated: ${updatedUser.email}`);
    return res.status(200).json({
      response: updatedUser,
      message: "USER UPDATED",
    });
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    return next(error);
  }
};

// Eliminar un usuario
export const destroy = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deletedUser = await User.findByIdAndDelete(uid);
    if (!deletedUser) {
      CustomError.newError(errors.userNotFound);
    }
    logger.info(`User deleted: ${deletedUser.email}`);
    return res.status(200).json({
      response: deletedUser,
      message: "USER DELETED",
    });
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    return next(error);
  }
};
