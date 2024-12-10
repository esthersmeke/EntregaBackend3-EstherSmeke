// src/dao/files/users.files.dao.js
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class UsersFilesDAO {
  constructor() {
    this.filePath = __dirname + "/users.json";
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

  async create(user) {
    const users = await this._readFile();
    const newUser = {
      ...user,
      _id: (Date.now() + Math.random()).toString(),
    };
    users.push(newUser);
    await this._writeFile(users);
    return newUser;
  }

  async find() {
    const users = await this._readFile();
    return users;
  }

  async findById(id) {
    const users = await this._readFile();
    return users.find((u) => u._id === id) || null;
  }

  async findByEmail(email) {
    const users = await this._readFile();
    return users.find((u) => u.email === email) || null;
  }

  async findByIdAndUpdate(id, update) {
    const users = await this._readFile();
    const index = users.findIndex((u) => u._id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...update };
    await this._writeFile(users);
    return users[index];
  }

  async findByIdAndDelete(id) {
    const users = await this._readFile();
    const index = users.findIndex((u) => u._id === id);
    if (index === -1) return null;
    const [deleted] = users.splice(index, 1);
    await this._writeFile(users);
    return deleted;
  }
}
