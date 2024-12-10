// src/dao/memory/users.memory.dao.js
export default class UsersMemoryDAO {
  constructor() {
    this.users = []; // Array en memoria
  }

  async create(user) {
    const newUser = {
      ...user,
      _id: (Date.now() + Math.random()).toString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  }

  async findById(id) {
    return this.users.find((u) => u._id === id) || null;
  }

  async findByEmail(email) {
    return this.users.find((u) => u.email === email) || null;
  }

  async findByIdAndUpdate(id, update) {
    const index = this.users.findIndex((u) => u._id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...update };
    return this.users[index];
  }

  async findByIdAndDelete(id) {
    const index = this.users.findIndex((u) => u._id === id);
    if (index === -1) return null;
    const deleted = this.users.splice(index, 1);
    return deleted[0];
  }
}
