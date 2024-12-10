// src/test/mocha/carts.test.js
import assert from "assert";
import Cart from "../../dao/cart.model.js";
import dbConnect from "../../utils/db.util.js";

// Mock IDs (puedes reemplazarlos con datos reales si es necesario)
const mockUserId = "6453e83f1c66f2c8d084e1e1"; // Simulated userId
const mockProductId = "6453e83f1c66f2c8d084e1e2"; // Simulated productId

describe("Testing Carts Module with MOCHA", () => {
  let cid = "";

  before(async () => await dbConnect());

  it("Creating a cart returns an object with _id", async () => {
    const cartData = {
      userId: mockUserId,
      products: [{ productId: mockProductId, quantity: 2 }],
    };
    const cart = await Cart.create(cartData);
    cid = cart._id.toString();
    assert.ok(cart._id);
    assert.strictEqual(cart.products[0].quantity, 2);
  });

  it("Retrieving all carts returns an array", async () => {
    const carts = await Cart.find();
    assert.ok(Array.isArray(carts));
    assert.ok(carts.length > 0);
  });

  it("Retrieving a cart by ID returns the correct cart", async () => {
    const cart = await Cart.findById(cid);
    assert.strictEqual(cart._id.toString(), cid);
  });

  it("Updating a cart changes its contents", async () => {
    const updatedCart = await Cart.findByIdAndUpdate(
      cid,
      { products: [{ productId: mockProductId, quantity: 5 }] },
      { new: true }
    );
    assert.strictEqual(updatedCart.products[0].quantity, 5);
  });

  it("Deleting a cart removes it from the database", async () => {
    await Cart.findByIdAndDelete(cid);
    const cart = await Cart.findById(cid);
    assert.strictEqual(cart, null);
  });
});
