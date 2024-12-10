// src/dao/files/carts.files.dao.js
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class CartsFilesDAO {
  constructor() {
    this.filePath = __dirname + "/carts.json";
    // Crear el archivo si no existe
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  async _readFile() {
    const data = await fs.promises.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async _writeFile(data) {
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async create(cart) {
    const carts = await this._readFile();
    const newCart = {
      ...cart,
      _id: (Date.now() + Math.random()).toString(),
      products: [],
    };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async find() {
    const carts = await this._readFile();
    return carts;
  }

  async findById(id) {
    const carts = await this._readFile();
    return carts.find((c) => c._id === id) || null;
  }

  async addProductToCart(cartId, product) {
    const carts = await this._readFile();
    const cart = carts.find((c) => c._id === cartId);
    if (!cart) return null;
    cart.products.push(product);
    await this._writeFile(carts);
    return cart;
  }

  async findByIdAndDelete(id) {
    const carts = await this._readFile();
    const index = carts.findIndex((c) => c._id === id);
    if (index === -1) return null;
    const [deleted] = carts.splice(index, 1);
    await this._writeFile(carts);
    return deleted;
  }
}
