import assert from "assert";
import envUtil from "../../utils/env.util.js";
import User from "../../dao/user.model.js";
import dbConnect from "../../utils/db.util.js";

const data = {
  name: "Esther",
  email: "esther@example.com",
  password: "hola1234",
};

describe("Testing Users Module with MOCHA", () => {
  let userId = "";

  before(async () => {
    await dbConnect(envUtil.MONGO_URI);
    await User.deleteMany(); // Limpiar la base de datos antes de las pruebas
  });

  it("Email property is present in user data", () => {
    assert.ok(data.email);
  });

  it("Password property is present in user data", () => {
    assert.ok(data.password);
  });

  it("Creates a user and returns an object with _id", async () => {
    const newUser = await User.create(data);
    userId = newUser._id.toString();
    assert.ok(newUser._id);
  });

  it("Fails to create duplicate users", async () => {
    try {
      await User.create(data); // Crear usuario existente
    } catch (error) {
      assert.strictEqual(error.code, 11000); // Código de error de duplicado en MongoDB
    }
  });

  it("Deletes a user and removes it from the database", async () => {
    await User.findByIdAndDelete(userId);
    const deletedUser = await User.findById(userId);
    assert.strictEqual(deletedUser, null);
  });
});
