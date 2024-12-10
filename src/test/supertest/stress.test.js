import { expect } from "chai";
import supertest from "supertest";
import envUtil from "../../utils/env.util.js";
import { faker } from "@faker-js/faker";

const requester = supertest(`http://localhost:${envUtil.PORT}/api`);

describe("Stress Testing E-commerce API Endpoints", function () {
  // Increase timeout for stress tests
  this.timeout(30000);

  // Predefined product IDs for read operations
  let productIds = [];

  // Create products before running tests
  before(async () => {
    const productPromises = Array.from({ length: 10 }, () => {
      const productData = {
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
      };
      return requester.post("/products").send(productData);
    });

    const responses = await Promise.all(productPromises);
    productIds = responses.map((response) => response._body.response._id);
  });

  // Existing tests remain the same...
  describe("Product Creation Stress Test", () => {
    it("Should handle concurrent product creation", async () => {
      const productPromises = Array.from({ length: 50 }, () => {
        const productData = {
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price()),
          description: faker.commerce.productDescription(),
        };
        return requester.post("/products").send(productData);
      });

      const responses = await Promise.all(productPromises);

      responses.forEach((response) => {
        expect(response.statusCode).to.equal(201);
        expect(response._body.response).to.have.property("_id");
      });
    });
  });

  // Stress test for cart operations
  describe("Cart Operations Stress Test", () => {
    const userId = "6453e83f1c66f2c8d084e1f1";
    const productId = "6453e83f1c66f2c8d084e1f2";

    it("Should handle multiple concurrent cart creations and updates", async () => {
      const cartPromises = Array.from({ length: 100 }, (_, index) => {
        return requester
          .post("/carts")
          .send({
            userId,
            products: [
              {
                productId,
                quantity: faker.number.int({ min: 1, max: 10 }),
              },
            ],
          })
          .then((createResponse) => {
            const cartId = createResponse._body.response._id;
            return requester.put(`/carts/${cartId}`).send({
              products: [
                {
                  productId,
                  quantity: faker.number.int({ min: 5, max: 15 }),
                },
              ],
            });
          });
      });

      const responses = await Promise.all(cartPromises);

      responses.forEach((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response._body.response.products[0]).to.have.property(
          "quantity"
        );
      });
    });
  });

  // Stress test for user registration
  describe("User Registration Stress Test", () => {
    it("Should handle concurrent user registrations", async () => {
      const userPromises = Array.from({ length: 50 }, () => {
        const userData = {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        };
        return requester.post("/users").send(userData);
      });

      const responses = await Promise.all(userPromises);

      responses.forEach((response) => {
        expect(response.statusCode).to.equal(201);
        expect(response._body.response).to.have.property("_id");
      });
    });
  });

  // Concurrent read operations stress test
  describe("Concurrent Read Operations Stress Test", () => {
    it("Should handle multiple concurrent read requests", async () => {
      const readPromises = Array.from({ length: 100 }, () => {
        const randomProductId =
          productIds[Math.floor(Math.random() * productIds.length)];
        return requester.get(`/products/${randomProductId}`);
      });

      const responses = await Promise.all(readPromises);

      responses.forEach((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response._body.response).to.have.property("_id");
      });
    });
  });

  // Clean up created products after tests
  after(async () => {
    const deletePromises = productIds.map((id) =>
      requester.delete(`/products/${id}`)
    );
    await Promise.all(deletePromises);
  });
});
