import { expect } from "chai";
import Product from "../../dao/product.model.js";
import dbConnect from "../../utils/db.util.js";

describe("Testeando el módulo de productos con CHAI", () => {
  const data = { name: "Test Product", price: 100.0 };
  let pid = "";

  before(async () => await dbConnect());

  it("La propiedad name es enviada por el cliente", () =>
    expect(data).to.have.property("name"));
  it("La propiedad price es enviada por el cliente", () =>
    expect(data).to.have.property("price"));

  it("La creación de un producto devuelve un objeto con el objectid", async () => {
    const one = await Product.create(data);
    pid = one._id;
    expect(one).to.have.property("_id");
  });

  it("El precio de un producto es un número", async () => {
    const one = await Product.create(data);
    expect(one.price).to.be.a("number");
  });

  it("La eliminación de un producto lo saca de la base de datos", async () => {
    await Product.findByIdAndDelete(pid);
    const one = await Product.findById(pid);
    expect(one).to.not.exist;
  });
});
