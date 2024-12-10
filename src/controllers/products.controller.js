// src/controllers/products.controller.js
import productsService from "../services/products.service.js";
import logger from "../utils/winston.util.js";
import CustomError from "../utils/CustomError.util.js";
import errors from "../utils/errors.util.js";
import { faker } from "../utils/faker.util.js";

// Crear productos de prueba
export const createMocks = async (req, res, next) => {
  try {
    const { quantity } = req.params;
    if (!quantity || isNaN(quantity)) {
      CustomError.newError(errors.invalidQuantity);
    }

    const mocks = [];
    for (let i = 0; i < quantity; i++) {
      mocks.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
      });
    }

    // Crear todos los productos mediante el servicio
    const created = [];
    for (const mock of mocks) {
      const prod = await productsService.create(mock);
      created.push(prod);
    }

    logger.info(`${quantity} mock products created.`);
    return res.status(201).json({
      message: `${quantity} PRODUCTS CREATED`,
    });
  } catch (error) {
    logger.error(`Error creating mock products: ${error.message}`);
    return next(error);
  }
};

export const readAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.find();
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

export const createProduct = async (req, res, next) => {
  try {
    const product = await productsService.create(req.body);
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

export const readProduct = async (req, res, next) => {
  try {
    const product = await productsService.findById(req.params.pid);
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

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productsService.update(
      req.params.pid,
      req.body
    );
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

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await productsService.delete(req.params.pid);
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
