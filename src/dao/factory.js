// src/dao/factory.js
import env from "../utils/env.util.js";

// Importar DAOs Mongo
import ProductsMongoDAO from "./mongo/products.mongo.dao.js";
import UsersMongoDAO from "./mongo/users.mongo.dao.js";
import CartsMongoDAO from "./mongo/carts.mongo.dao.js";

// Importar DAOs Memory
import ProductsMemoryDAO from "./memory/products.memory.dao.js";
import UsersMemoryDAO from "./memory/users.memory.dao.js";
import CartsMemoryDAO from "./memory/carts.memory.dao.js";

// Importar DAOs Files
import ProductsFilesDAO from "./files/products.files.dao.js";
import UsersFilesDAO from "./files/users.files.dao.js";
import CartsFilesDAO from "./files/carts.files.dao.js";

let productDao;
let userDao;
let cartDao;

switch (env.STORAGE_TYPE) {
  case "memory":
    productDao = new ProductsMemoryDAO();
    userDao = new UsersMemoryDAO();
    cartDao = new CartsMemoryDAO();
    break;
  case "files":
    productDao = new ProductsFilesDAO();
    userDao = new UsersFilesDAO();
    cartDao = new CartsFilesDAO();
    break;
  case "mongo":
  default:
    productDao = new ProductsMongoDAO();
    userDao = new UsersMongoDAO();
    cartDao = new CartsMongoDAO();
    break;
}

export { productDao, userDao, cartDao };
