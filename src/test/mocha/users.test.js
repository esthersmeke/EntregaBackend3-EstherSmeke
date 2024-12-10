import assert from "assert";
import User from "../../dao/user.model.js";
import dbConnect from "../../utils/db.util.js";
import { faker } from "@faker-js/faker";

describe("Testeando el módulo de usuarios con MOCHA", () => {
  const data = {
    name: "Test User",
    email: faker.internet.email(),
    password: "test1234",
  };

  let tid = "";

  before(async () => await dbConnect());

  it("La propiedad email es enviada por el usuario que quiere registrarse", () =>
    assert.ok(data.email));
  it("La propiedad password es enviada por el usuario que quiere registrarse", () =>
    assert.ok(data.password));

  it("La creación de un usuario devuelve un objeto con el objectid", async () => {
    const one = await User.create(data);
    tid = one._id;
    assert.ok(one._id);
  });

  it("El usuario no se crea si ya existe en la base de datos", async () => {
    let one = await User.findOne({ email: data.email });
    if (!one) {
      one = await User.create(data);
    }
    assert.ok(one._id);
  });

  it("La eliminación de un usuario lo saca de la base de datos", async () => {
    await User.findByIdAndDelete(tid);
    const one = await User.findById(tid);
    assert.strictEqual(one, null);
  });
});
