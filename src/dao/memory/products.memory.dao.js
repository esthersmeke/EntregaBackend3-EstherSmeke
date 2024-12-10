// src/dao/memory/products.memory.dao.js
export default class ProductsMemoryDAO {
  constructor() {
    this.products = []; // Array en memoria
  }

  async create(data) {
    const newProduct = {
      ...data,
      _id: (Date.now() + Math.random()).toString(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findById(id) {
    return this.products.find((p) => p._id === id) || null;
  }

  async findByIdAndUpdate(id, update) {
    const index = this.products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...update };
    return this.products[index];
  }

  async findByIdAndDelete(id) {
    const index = this.products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    const deleted = this.products.splice(index, 1);
    return deleted[0];
  }
}
