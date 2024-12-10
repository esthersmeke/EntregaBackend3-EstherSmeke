// src/services/products.service.js
import { productDao } from "../dao/factory.js";
import CustomError from "../utils/CustomError.util.js";
import errors from "../utils/errors.util.js";

class ProductsService {
  async create(data) {
    if (!data.name || !data.price) {
      CustomError.newError(errors.missingData);
    }
    return productDao.create(data);
  }

  async find() {
    const products = await productDao.find();
    if (!products || products.length === 0) {
      CustomError.newError(errors.productNotFound);
    }
    return products;
  }

  async findById(id) {
    const product = await productDao.findById(id);
    if (!product) {
      CustomError.newError(errors.productNotFound);
    }
    return product;
  }

  async update(id, data) {
    const updated = await productDao.findByIdAndUpdate(id, data);
    if (!updated) {
      CustomError.newError(errors.productNotFound);
    }
    return updated;
  }

  async delete(id) {
    const deleted = await productDao.findByIdAndDelete(id);
    if (!deleted) {
      CustomError.newError(errors.productNotFound);
    }
    return deleted;
  }
}

export default new ProductsService();
