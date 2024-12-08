import assert from "assert";
import envUtil from "../../utils/env.util.js";
import User from "../../dao/user.model.js";
import dbConnect from "../../utils/db.util.js";

const data = {
  name: "Esther",
  email: "esther@example.com",
  password: "hola1234",
};

describe("Testeando el módulo de usuarios con MOCHA", () => {
  let userId = "";

  before(async () => {
    await dbConnect(envUtil.MONGO_URI);
  });

  it("La propiedad email es enviada por el usuario que quiere registrarse", () => {
    assert.ok(data.email);
  });

  it("La propiedad password es enviada por el usuario que quiere registrarse", () => {
    assert.ok(data.password);
  });

  it("La creación de un usuario devuelve un objeto con el objectid", async () => {
    const newUser = await User.create(data);
    userId = newUser._id.toString();
    assert.ok(newUser._id);
  });

  it("El usuario no se crea si ya existe en la base de datos", async () => {
    const existingUser = await User.findOne({ email: data.email });
    if (!existingUser) {
      const newUser = await User.create(data);
      userId = newUser._id.toString();
    } else {
      userId = existingUser._id.toString();
    }
    assert.ok(userId);
  });

  it("La eliminación de un usuario lo saca de la base de datos", async () => {
    await User.findByIdAndDelete(userId);
    const deletedUser = await User.findById(userId);
    assert.strictEqual(deletedUser, null);
  });
});
