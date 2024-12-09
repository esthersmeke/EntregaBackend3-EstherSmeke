import { expect } from "chai";
import User from "../../dao/user.model.js";
import dbConnect from "../../utils/db.util.js";
import { faker } from "@faker-js/faker";

describe("Testeando el módulo de usuarios con CHAI", () => {
  const data = {
    name: "Test User",
    email: faker.internet.email(),
    password: "test1234",
  };
  let tid = "";

  before(async () => await dbConnect());

  it("La propiedad email es enviada por el usuario", () =>
    expect(data).to.have.property("email"));
  it("La propiedad password es enviada por el usuario", () =>
    expect(data).to.have.property("password"));

  it("La creación de un usuario devuelve un objeto con el objectid", async () => {
    const one = await User.create(data);
    tid = one._id;
    expect(one).to.have.property("_id");
  });

  it("El usuario tiene un rol por defecto", async () => {
    await User.deleteOne({ email: data.email }); // Elimina si ya existe
    const one = await User.create(data);
    expect(one).to.have.property("role");
    expect(one.role).to.equal(0);
  });

  it("La eliminación de un usuario lo saca de la base de datos", async () => {
    await User.findByIdAndDelete(tid);
    const one = await User.findById(tid);
    expect(one).to.not.exist;
  });
});
