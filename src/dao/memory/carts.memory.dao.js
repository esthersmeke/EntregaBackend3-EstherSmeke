// src/dao/memory/carts.memory.dao.js
export default class CartsMemoryDAO {
  constructor() {
    this.carts = []; // Array en memoria
  }

  async create(cart) {
    const newCart = {
      ...cart,
      _id: (Date.now() + Math.random()).toString(),
      products: [],
    };
    this.carts.push(newCart);
    return newCart;
  }

  async find() {
    return this.carts;
  }

  async findById(id) {
    return this.carts.find((c) => c._id === id) || null;
  }

  async addProductToCart(cartId, product) {
    const cart = await this.findById(cartId);
    if (!cart) return null;
    cart.products.push(product);
    return cart;
  }

  async findByIdAndDelete(id) {
    const index = this.carts.findIndex((c) => c._id === id);
    if (index === -1) return null;
    const deleted = this.carts.splice(index, 1);
    return deleted[0];
  }
}
