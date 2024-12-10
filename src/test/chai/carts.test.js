// src/test/chai/carts.test.js
import { expect } from "chai";
import cartsService from "../../services/carts.service.js";
import dbConnect from "../../utils/db.util.js";

// Suponiendo que ya tienes usuarios y productos creados en tu test o puedes crear mocks.
// Para este test, crearemos un userId y productId ficticios. Dependiendo de tu lógica
// podrías necesitar crear usuarios/productos antes. Aquí lo simplificamos asumiendo
// que el storage es memory o mongo, y que puedes trabajar con cualquier ID.
// En un escenario real, deberías crear un usuario y un producto real antes de crear el carrito.

describe("Testing Carts with CHAI through Service Layer", () => {
  let cid = "";
  const mockUserId = "6453e83f1c66f2c8d084e1e1"; // Reemplaza con un userId válido
  const mockProductId = "6453e83f1c66f2c8d084e1e2"; // Reemplaza con un productId válido

  before(async () => {
    await dbConnect();
  });

  it("Should create a cart with a userId and products array", async () => {
    const cartData = {
      userId: mockUserId,
      products: [{ productId: mockProductId, quantity: 2 }],
    };
    const cart = await cartsService.create(cartData);
    cid = cart._id;
    expect(cart).to.have.property("_id");
    expect(cart.products).to.be.an("array");
    expect(cart.products[0]).to.have.property("quantity", 2);
  });

  it("Should retrieve all carts", async () => {
    const carts = await cartsService.find();
    expect(carts).to.be.an("array");
    expect(carts.length).to.be.greaterThan(0);
  });

  it("Should retrieve a cart by ID", async () => {
    const cart = await cartsService.findById(cid);
    expect(cart._id.toString()).to.equal(cid.toString());
  });

  it("Should update a cart", async () => {
    const updatedCart = await cartsService.update(cid, {
      products: [{ productId: mockProductId, quantity: 5 }],
    });
    expect(updatedCart.products[0].quantity).to.equal(5);
  });

  it("Should delete a cart", async () => {
    await cartsService.delete(cid);
    try {
      await cartsService.findById(cid);
    } catch (error) {
      expect(error.message).to.equal("Cart not found.");
    }
  });
});
