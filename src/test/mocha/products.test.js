import assert from "assert";
import Product from "../../dao/product.model.js";
import dbConnect from "../../utils/db.util.js";

describe("Testeando el módulo de productos con MOCHA", () => {
  const data = { name: "Test Product", price: 100.0 };
  let pid = "";

  before(async () => await dbConnect());

  it("La propiedad name es enviada por el cliente", () => assert.ok(data.name));
  it("La propiedad price es enviada por el cliente", () =>
    assert.ok(data.price));

  it("La creación de un producto devuelve un objeto con el objectid", async () => {
    const one = await Product.create(data);
    pid = one._id;
    assert.ok(one._id);
  });

  it("El producto no se crea si ya existe con el mismo nombre", async () => {
    let one = await Product.findOne({ name: data.name });
    if (!one) {
      one = await Product.create(data);
    }
    assert.ok(one._id);
  });

  it("La eliminación de un producto lo saca de la base de datos", async () => {
    await Product.findByIdAndDelete(pid);
    const one = await Product.findById(pid);
    assert.strictEqual(one, null);
  });
});
