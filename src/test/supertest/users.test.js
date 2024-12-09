import { expect } from "chai";
import supertest from "supertest";
import envUtil from "../../utils/env.util.js";
import dbConnect from "../../utils/db.util.js";
import User from "../../dao/user.model.js";

// Configurar Supertest con la URL base
const requester = supertest(`http://localhost:${envUtil.PORT}/api`);

describe("Testing Users Module with SUPERTEST", () => {
  let userId = "";

  const testData = {
    name: "Esther",
    email: "esther@example.com",
    password: "hola1234",
  };

  // Configurar base de datos antes de ejecutar las pruebas
  before(async () => {
    await dbConnect(envUtil.MONGO_URI);
    await User.deleteMany(); // Limpiar la colección antes de ejecutar pruebas
  });

  it("Creates a user successfully", async () => {
    const response = await requester.post("/users").send(testData);
    const { _body, statusCode } = response;
    userId = _body.response._id;

    expect(statusCode).to.be.equals(201);
    expect(_body.response).to.have.property("_id");
    expect(_body.response.email).to.be.equal(testData.email);
  });

  it("Reads all users successfully", async () => {
    const response = await requester.get("/users");
    const { _body, statusCode } = response;

    expect(statusCode).to.be.equals(200);
    expect(_body.response).to.be.an("array");
    expect(_body.response.length).to.be.greaterThan(0);
  });

  it("Reads a specific user by ID", async () => {
    const response = await requester.get(`/users/${userId}`);
    const { _body, statusCode } = response;

    expect(statusCode).to.be.equals(200);
    expect(_body.response).to.be.an("object");
    expect(_body.response).to.have.property("_id").that.equals(userId);
  });

  it("Updates a user successfully", async () => {
    const updatedData = { password: "newpassword123" };
    const response = await requester.put(`/users/${userId}`).send(updatedData);
    const { statusCode, _body } = response;

    expect(statusCode).to.be.equals(200);
    expect(_body.response).to.have.property("password");
  });

  it("Fails to create an existing user", async () => {
    const response = await requester.post("/users").send(testData);
    const { statusCode, _body } = response;

    expect(statusCode).to.be.equals(400);
    expect(_body.message).to.include("User already exists");
  });

  it("Deletes a user successfully", async () => {
    const response = await requester.delete(`/users/${userId}`);
    const { statusCode, _body } = response;

    expect(statusCode).to.be.equals(200);
    expect(_body.message).to.be.equals("USER DELETED");

    const deletedUser = await User.findById(userId);
    expect(deletedUser).to.be.null;
  });
});
