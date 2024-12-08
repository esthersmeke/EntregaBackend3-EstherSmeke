import { expect } from "chai";
import envUtil from "../../utils/env.util.js";
import User from "../../dao/user.model.js";
import dbConnect from "../../utils/db.util.js";

const data = {
  name: "Esther",
  email: "esther@example.com",
  password: "hola1234",
};

describe("Testeando el módulo de usuarios con CHAI", () => {
  let userId = "";

  // Conexión a la base de datos antes de todas las pruebas
  before(async () => {
    await dbConnect(envUtil.MONGO_URI);
  });

  it("La propiedad email está presente", () => {
    expect(data).to.have.property("email");
  });

  it("El email es de tipo string", () => {
    expect(data.email).to.be.a("string");
  });

  it("El email contiene un '@'", () => {
    expect(data.email.includes("@")).to.be.true;
  });

  it("La creación de un usuario devuelve un objeto con el objectId", async () => {
    const newUser = await User.create(data);
    userId = newUser._id.toString();
    expect(newUser).to.have.property("_id");
  });

  it("El rol del usuario creado es por defecto '0'", async () => {
    const user = await User.findOne({ email: data.email });
    expect(user).to.have.property("role");
    expect(user.role).to.equal(0);
  });

  it("El usuario no se crea si ya existe en la base de datos", async () => {
    const existingUser = await User.findOne({ email: data.email });
    expect(existingUser).to.exist;
    expect(existingUser.email).to.equal(data.email);
  });

  it("La eliminación de un usuario lo saca de la base de datos", async () => {
    await User.findByIdAndDelete(userId);
    const deletedUser = await User.findById(userId);
    expect(deletedUser).to.be.null;
  });
});
