// src/test/chai/products.test.js
import { expect } from "chai";
import productsService from "../../services/products.service.js";
import dbConnect from "../../utils/db.util.js";

describe("Testing Products with CHAI through Service Layer", () => {
  const data = { name: "Test Product", price: 100.0 };
  let pid = "";

  before(async () => {
    await dbConnect();
  });

  it("Should have name and price properties", () => {
    expect(data).to.have.property("name");
    expect(data).to.have.property("price");
  });

  it("Creating a product returns an object with _id", async () => {
    const one = await productsService.create(data);
    pid = one._id;
    expect(one).to.have.property("_id");
  });

  it("The product price is a number", async () => {
    const one = await productsService.create({
      name: "Another Product",
      price: 50,
    });
    expect(one.price).to.be.a("number");
  });

  it("Should return an error when product name or price is missing", async () => {
    try {
      await productsService.create({
        name: "",
        price: 0,
      });
      expect.fail("Expected validation error.");
    } catch (error) {
      expect(error.message).to.equal("Required data is missing.");
    }
  });

  it("Deleting a product removes it from the storage", async () => {
    await productsService.delete(pid);
    try {
      await productsService.findById(pid);
    } catch (error) {
      // Debería lanzar error de productNotFound
      expect(error.message).to.equal("Product not found.");
    }
  });
});
