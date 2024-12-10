// src/dao/files/products.files.dao.js
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ProductsFilesDAO {
  constructor() {
    this.filePath = __dirname + "/products.json";
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

  async create(product) {
    const products = await this._readFile();
    const newProduct = {
      ...product,
      _id: (Date.now() + Math.random()).toString(),
    };
    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async find() {
    const products = await this._readFile();
    return products;
  }

  async findById(id) {
    const products = await this._readFile();
    return products.find((p) => p._id === id) || null;
  }

  async findByIdAndUpdate(id, update) {
    const products = await this._readFile();
    const index = products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...update };
    await this._writeFile(products);
    return products[index];
  }

  async findByIdAndDelete(id) {
    const products = await this._readFile();
    const index = products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    const [deleted] = products.splice(index, 1);
    await this._writeFile(products);
    return deleted;
  }
}
