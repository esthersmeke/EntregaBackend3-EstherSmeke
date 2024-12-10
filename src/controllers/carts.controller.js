// src/controllers/carts.controller.js
import Cart from "../dao/cart.model.js";
import logger from "../utils/winston.util.js";
import CustomError from "../utils/CustomError.util.js";
import errors from "../utils/errors.util.js";

// Crear un carrito
export const createCart = async (req, res, next) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !Array.isArray(products) || products.length === 0) {
      CustomError.newError(errors.missingData);
    }

    const cart = await Cart.create({ userId, products });
    logger.info(`Cart created for user: ${cart.userId}`);
    return res.status(201).json({
      response: cart,
      message: "CART CREATED",
    });
  } catch (error) {
    logger.error(`Error creating cart: ${error.message}`);
    return next(error);
  }
};

// Leer todos los carritos
export const readAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find()
      .populate("products.productId")
      .populate("userId");
    if (carts.length === 0) {
      CustomError.newError(
        errors.cartNotFound || { message: "Carts not found.", statusCode: 404 }
      );
    }
    logger.info(`Carts retrieved: ${carts.length}`);
    return res.status(200).json({
      response: carts,
      message: "CARTS READ",
    });
  } catch (error) {
    logger.error(`Error reading carts: ${error.message}`);
    return next(error);
  }
};

// Leer un carrito por ID
export const readCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid)
      .populate("products.productId")
      .populate("userId");
    if (!cart) {
      CustomError.newError(
        errors.cartNotFound || { message: "Cart not found.", statusCode: 404 }
      );
    }
    logger.info(`Cart retrieved with ID: ${cart._id}`);
    return res.status(200).json({
      response: cart,
      message: "CART READ",
    });
  } catch (error) {
    logger.error(`Error retrieving cart: ${error.message}`);
    return next(error);
  }
};

// Actualizar un carrito
export const updateCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      CustomError.newError(errors.missingData);
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    )
      .populate("products.productId")
      .populate("userId");

    if (!updatedCart) {
      CustomError.newError(
        errors.cartNotFound || { message: "Cart not found.", statusCode: 404 }
      );
    }

    logger.info(`Cart updated with ID: ${updatedCart._id}`);
    return res.status(200).json({
      response: updatedCart,
      message: "CART UPDATED",
    });
  } catch (error) {
    logger.error(`Error updating cart: ${error.message}`);
    return next(error);
  }
};

// Eliminar un carrito
export const deleteCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const deletedCart = await Cart.findByIdAndDelete(cid);
    if (!deletedCart) {
      CustomError.newError(
        errors.cartNotFound || { message: "Cart not found.", statusCode: 404 }
      );
    }
    logger.info(`Cart deleted with ID: ${deletedCart._id}`);
    return res.status(200).json({
      response: deletedCart,
      message: "CART DELETED",
    });
  } catch (error) {
    logger.error(`Error deleting cart: ${error.message}`);
    return next(error);
  }
};
