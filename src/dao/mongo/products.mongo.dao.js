// src/dao/mongo/products.mongo.dao.js
import Product from "../product.model.js";

export default class ProductsMongoDAO {
  async create(data) {
    return Product.create(data);
  }

  async find() {
    return Product.find();
  }

  async findById(id) {
    return Product.findById(id);
  }

  async findByIdAndUpdate(id, update) {
    return Product.findByIdAndUpdate(id, update, { new: true });
  }

  async findByIdAndDelete(id) {
    return Product.findByIdAndDelete(id);
  }
}
