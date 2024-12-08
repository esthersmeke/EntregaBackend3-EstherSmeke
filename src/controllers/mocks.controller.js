import User from "../dao/user.model.js";
import Product from "../dao/product.model.js";
import { faker } from "@faker-js/faker";
import logger from "../utils/winston.util.js";

// Función para generar usuarios
export const generateUsers = async (req, res) => {
  const { n } = req.params;

  // Simulación de 401 (No autorizado)
  if (!req.headers.authorization) {
    logger.warn("No autorizado. Falta token.");
    return res.status(401).json({
      message: "No autorizado. Proporcione un token válido.",
      statusCode: 401,
    }); // res401
  }

  // Simulación de 403 (Prohibido)
  if (req.headers.authorization !== "Bearer valid-token") {
    logger.warn("Acceso denegado. Token inválido.");
    return res.status(403).json({
      message: "Acceso denegado. No tiene permisos suficientes.",
      statusCode: 403,
    }); // res403
  }

  if (!n || isNaN(n)) {
    logger.warn("El parámetro 'n' no es válido.");
    return res.status(400).json({
      message: "El parámetro 'n' debe ser un número válido.",
      statusCode: 400,
    }); // res400
  }

  const users = [];
  for (let i = 0; i < n; i++) {
    users.push({
      name: faker.person.firstName() + " " + faker.person.lastName(),
      email: faker.internet.email(),
    });
  }

  try {
    await User.insertMany(users);
    logger.info(`Generando ${n} usuarios...`);
    res.status(201).json({
      message: `${n} usuarios generados correctamente.`,
      statusCode: 201,
    }); // res201
  } catch (error) {
    logger.error(`Error al generar usuarios: ${error.message}`);
    res.status(500).json({
      message: "Error al generar usuarios.",
      statusCode: 500,
    }); // res500
  }
};

// Función para generar productos
export const generateProducts = async (req, res) => {
  const { n } = req.params;

  // Simulación de 401 (No autorizado)
  if (!req.headers.authorization) {
    logger.warn("No autorizado. Falta token.");
    return res.status(401).json({
      message: "No autorizado. Proporcione un token válido.",
      statusCode: 401,
    }); // res401
  }

  // Simulación de 403 (Prohibido)
  if (req.headers.authorization !== "Bearer valid-token") {
    logger.warn("Acceso denegado. Token inválido.");
    return res.status(403).json({
      message: "Acceso denegado. No tiene permisos suficientes.",
      statusCode: 403,
    }); // res403
  }

  if (!n || isNaN(n)) {
    logger.warn("El parámetro 'n' no es válido.");
    return res.status(400).json({
      message: "El parámetro 'n' debe ser un número válido.",
      statusCode: 400,
    }); // res400
  }

  const products = [];
  for (let i = 0; i < n; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
    });
  }

  try {
    await Product.insertMany(products);
    logger.info(`Generando ${n} productos...`);
    res.status(201).json({
      message: `${n} productos generados correctamente.`,
      statusCode: 201,
    }); // res201
  } catch (error) {
    logger.error(`Error al generar productos: ${error.message}`);
    res.status(500).json({
      message: "Error al generar productos.",
      statusCode: 500,
    }); // res500
  }
};

// Función para obtener todos los usuarios guardados
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      logger.warn("No se encontraron usuarios.");
      return res.status(404).json({
        message: "No se encontraron usuarios.",
        statusCode: 404,
      }); // res404
    }
    res.status(200).json({
      message: "Usuarios obtenidos correctamente.",
      users,
      statusCode: 200,
    }); // res200
  } catch (error) {
    logger.error(`Error al obtener usuarios: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener usuarios.",
      statusCode: 500,
    }); // res500
  }
};

// Función para obtener todos los productos guardados
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      logger.warn("No se encontraron productos.");
      return res.status(404).json({
        message: "No se encontraron productos.",
        statusCode: 404,
      }); // res404
    }
    res.status(200).json({
      message: "Productos obtenidos correctamente.",
      products,
      statusCode: 200,
    }); // res200
  } catch (error) {
    logger.error(`Error al obtener productos: ${error.message}`);
    res.status(500).json({
      message: "Error al obtener productos.",
      statusCode: 500,
    }); // res500
  }
};
