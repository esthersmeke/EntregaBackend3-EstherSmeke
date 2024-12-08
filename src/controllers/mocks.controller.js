import User from "../dao/user.model.js";
import Product from "../dao/product.model.js";
import { faker } from "@faker-js/faker";
import logger from "../utils/winston.util.js";

// Función para generar usuarios
export const generateUsers = async (req, res) => {
  const { n } = req.params;
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
    res.json({ message: `${n} usuarios generados.` });
  } catch (error) {
    logger.error(`Error al generar usuarios: ${error.message}`);
    res.status(500).json({ message: "Error al generar usuarios." });
  }
};

// Función para generar productos
export const generateProducts = async (req, res) => {
  const { n } = req.params;
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
    res.json({ message: `${n} productos generados.` });
  } catch (error) {
    logger.error(`Error al generar productos: ${error.message}`);
    res.status(500).json({ message: "Error al generar productos." });
  }
};

// Función para obtener todos los usuarios guardados
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    logger.error(`Error al obtener usuarios: ${error.message}`);
    res.status(500).json({ message: "Error al obtener usuarios." });
  }
};

// Función para obtener todos los productos guardados
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    logger.error(`Error al obtener productos: ${error.message}`);
    res.status(500).json({ message: "Error al obtener productos." });
  }
};
