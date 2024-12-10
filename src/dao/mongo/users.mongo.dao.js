// src/dao/mongo/users.mongo.dao.js
import User from "../user.model.js";

export default class UsersMongoDAO {
  async create(data) {
    return User.create(data);
  }

  async find() {
    return User.find();
  }

  async findById(id) {
    return User.findById(id);
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findByIdAndUpdate(id, update) {
    return User.findByIdAndUpdate(id, update, { new: true });
  }

  async findByIdAndDelete(id) {
    return User.findByIdAndDelete(id);
  }
}
