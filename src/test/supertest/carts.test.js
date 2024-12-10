// src/test/supertest/carts.test.js
import { expect } from "chai";
import supertest from "supertest";
import envUtil from "../../utils/env.util.js";
import { faker } from "@faker-js/faker";

const requester = supertest(`http://localhost:${envUtil.PORT}/api`);

describe("Testing Carts Endpoints with Supertest", () => {
  let cartId = "";
  // Deberías tener un userId y productId existente. Si no, primero crea users/products.
  const mockUserId = "6453e83f1c66f2c8d084e1f1";
  const mockProductId = "6453e83f1c66f2c8d084e1f2";

  it("Should create a cart via POST /carts", async () => {
    const response = await requester.post("/carts").send({
      userId: mockUserId,
      products: [{ productId: mockProductId, quantity: 2 }],
    });
    const { _body, statusCode } = response;
    cartId = _body.response._id;
    expect(statusCode).to.equal(201);
    expect(_body.response).to.have.property("_id");
  });

  it("Should read all carts via GET /carts", async () => {
    const response = await requester.get("/carts");
    const { statusCode, _body } = response;
    expect(statusCode).to.equal(200);
    expect(_body.response).to.be.an("array");
  });

  it("Should read a cart by ID via GET /carts/:cid", async () => {
    const response = await requester.get(`/carts/${cartId}`);
    const { statusCode, _body } = response;
    expect(statusCode).to.equal(200);
    expect(_body.response._id).to.equal(cartId);
  });

  it("Should update a cart via PUT /carts/:cid", async () => {
    const response = await requester.put(`/carts/${cartId}`).send({
      products: [{ productId: mockProductId, quantity: 10 }],
    });
    const { statusCode, _body } = response;
    expect(statusCode).to.equal(200);
    expect(_body.response.products[0].quantity).to.equal(10);
  });

  it("Should delete a cart via DELETE /carts/:cid", async () => {
    const response = await requester.delete(`/carts/${cartId}`);
    const { statusCode } = response;
    expect(statusCode).to.equal(200);
  });

  it("Trying to read a deleted cart should return 404", async () => {
    const response = await requester.get(`/carts/${cartId}`);
    expect(response.statusCode).to.equal(404);
    expect(response._body.message).to.include("Cart not found");
  });
});
