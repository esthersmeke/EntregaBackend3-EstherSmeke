// src/services/users.service.js
import { userDao } from "../dao/factory.js";
import CustomError from "../utils/CustomError.util.js";
import errors from "../utils/errors.util.js";

class UsersService {
  async create(data) {
    if (!data.email || !data.password) {
      CustomError.newError(errors.missingData);
    }
    return userDao.create(data);
  }

  async find() {
    const users = await userDao.find();
    if (!users || users.length === 0) {
      CustomError.newError(errors.userNotFound);
    }
    return users;
  }

  async findById(id) {
    const user = await userDao.findById(id);
    if (!user) {
      CustomError.newError(errors.userNotFound);
    }
    return user;
  }

  async update(id, data) {
    const updated = await userDao.findByIdAndUpdate(id, data);
    if (!updated) {
      CustomError.newError(errors.userNotFound);
    }
    return updated;
  }

  async delete(id) {
    const deleted = await userDao.findByIdAndDelete(id);
    if (!deleted) {
      CustomError.newError(errors.userNotFound);
    }
    return deleted;
  }
}

export default new UsersService();
