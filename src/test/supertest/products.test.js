// src/test/supertest/products.test.js
import { expect } from "chai";
import supertest from "supertest";
import envUtil from "../../utils/env.util.js";
import { faker } from "@faker-js/faker";

const requester = supertest(`http://localhost:${envUtil.PORT}/api`);

describe("Testing Products Endpoints with Supertest", () => {
  let productId = "";
  const productData = {
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
  };

  it("Should create a product via POST /products", async () => {
    const response = await requester.post("/products").send(productData);
    const { _body, statusCode } = response;
    productId = _body.response._id;
    expect(statusCode).to.equal(201);
    expect(_body.response).to.have.property("_id");
    expect(_body.response.name).to.equal(productData.name);
  });

  it("Should read all products via GET /products", async () => {
    const response = await requester.get("/products");
    const { statusCode, _body } = response;
    expect(statusCode).to.equal(200);
    expect(_body.response).to.be.an("array");
    expect(_body.response.length).to.be.greaterThan(0);
  });

  it("Should read a product by ID via GET /products/:pid", async () => {
    const response = await requester.get(`/products/${productId}`);
    const { statusCode, _body } = response;
    expect(statusCode).to.equal(200);
    expect(_body.response._id).to.equal(productId);
  });

  it("Should update a product via PUT /products/:pid", async () => {
    const updatedData = { price: 999.99 };
    const response = await requester
      .put(`/products/${productId}`)
      .send(updatedData);
    const { statusCode, _body } = response;
    expect(statusCode).to.equal(200);
    expect(_body.response.price).to.equal(999.99);
  });

  it("Should delete a product via DELETE /products/:pid", async () => {
    const response = await requester.delete(`/products/${productId}`);
    const { statusCode, _body } = response;
    expect(statusCode).to.equal(200);
    expect(_body.response._id).to.equal(productId);
  });

  it("Trying to read a deleted product should return 404", async () => {
    const response = await requester.get(`/products/${productId}`);
    expect(response.statusCode).to.equal(404);
    expect(response._body.message).to.include("Product not found");
  });
});
