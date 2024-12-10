// src/dao/mongo/carts.mongo.dao.js
import Cart from "../cart.model.js";

export default class CartsMongoDAO {
  async create(data) {
    return Cart.create(data);
  }

  async find() {
    return Cart.find().populate("products.productId");
  }

  async findById(id) {
    return Cart.findById(id).populate("products.productId");
  }

  async addProductToCart(cartId, product) {
    const cart = await this.findById(cartId);
    if (!cart) return null;
    cart.products.push(product);
    await cart.save();
    return cart;
  }

  async findByIdAndUpdate(id, update) {
    return Cart.findByIdAndUpdate(id, update, { new: true }).populate(
      "products.productId"
    );
  }

  async findByIdAndDelete(id) {
    return Cart.findByIdAndDelete(id);
  }
}
