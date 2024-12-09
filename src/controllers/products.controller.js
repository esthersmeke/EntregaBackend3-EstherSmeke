// src/controllers/products.controller.js
import Product from "../dao/product.model.js";
import logger from "../utils/winston.util.js";
import CustomError from "../utils/CustomError.util.js";
import errors from "../utils/errors.util.js";
import { faker } from "@faker-js/faker";

// Crear productos de prueba
export const createMocks = async (req, res, next) => {
  try {
    const { quantity } = req.params;
    if (!quantity || isNaN(quantity)) {
      CustomError.newError(errors.invalidQuantity);
    }

    const products = [];
    for (let i = 0; i < quantity; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
      });
    }

    await Product.insertMany(products);
    logger.info(`${quantity} mock products created.`);
    return res.status(201).json({
      message: `${quantity} PRODUCTS CREATED`,
    });
  } catch (error) {
    logger.error(`Error creating mock products: ${error.message}`);
    return next(error);
  }
};

// Leer todos los productos
export const readAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      CustomError.newError(errors.productNotFound);
    }
    logger.info(`Products retrieved: ${products.length}`);
    return res.status(200).json({
      response: products,
      message: "PRODUCTS READ",
    });
  } catch (error) {
    logger.error(`Error reading products: ${error.message}`);
    return next(error);
  }
};

// Crear un producto
export const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      CustomError.newError(errors.missingData);
    }

    const product = await Product.create({ name, price });
    logger.info(`Product created: ${product.name}`);
    return res.status(201).json({
      response: product,
      message: "PRODUCT CREATED",
    });
  } catch (error) {
    logger.error(`Error creating product: ${error.message}`);
    return next(error);
  }
};

// Leer un producto por ID
export const readProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) {
      CustomError.newError(errors.productNotFound);
    }
    logger.info(`Product retrieved: ${product.name}`);
    return res.status(200).json({
      response: product,
      message: "PRODUCT READ",
    });
  } catch (error) {
    logger.error(`Error retrieving product: ${error.message}`);
    return next(error);
  }
};

// Actualizar un producto
export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      CustomError.newError(errors.productNotFound);
    }
    logger.info(`Product updated: ${updatedProduct.name}`);
    return res.status(200).json({
      response: updatedProduct,
      message: "PRODUCT UPDATED",
    });
  } catch (error) {
    logger.error(`Error updating product: ${error.message}`);
    return next(error);
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);
    if (!deletedProduct) {
      CustomError.newError(errors.productNotFound);
    }
    logger.info(`Product deleted: ${deletedProduct.name}`);
    return res.status(200).json({
      response: deletedProduct,
      message: "PRODUCT DELETED",
    });
  } catch (error) {
    logger.error(`Error deleting product: ${error.message}`);
    return next(error);
  }
};
