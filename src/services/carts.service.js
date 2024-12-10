// src/services/carts.service.js
import { cartDao } from "../dao/factory.js";
import CustomError from "../utils/CustomError.util.js";
import errors from "../utils/errors.util.js";

class CartsService {
  async create(data) {
    const { userId, products } = data;
    if (!userId || !Array.isArray(products) || products.length === 0) {
      CustomError.newError(errors.missingData);
    }
    return cartDao.create(data);
  }

  async find() {
    const carts = await cartDao.find();
    if (!carts || carts.length === 0) {
      CustomError.newError(errors.cartNotFound);
    }
    return carts;
  }

  async findById(id) {
    const cart = await cartDao.findById(id);
    if (!cart) {
      CustomError.newError(errors.cartNotFound);
    }
    return cart;
  }

  async update(id, data) {
    const { products } = data;
    if (!Array.isArray(products)) {
      CustomError.newError(errors.missingData);
    }
    const updated = await cartDao.findByIdAndUpdate(id, { products });
    if (!updated) {
      CustomError.newError(errors.cartNotFound);
    }
    return updated;
  }

  async delete(id) {
    const deleted = await cartDao.findByIdAndDelete(id);
    if (!deleted) {
      CustomError.newError(errors.cartNotFound);
    }
    return deleted;
  }
}

export default new CartsService();
