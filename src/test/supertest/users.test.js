import { expect } from "chai";
import supertest from "supertest";
import envUtil from "../../utils/env.util.js";

const requester = supertest(`http://localhost:${envUtil.PORT}/api/mocks`);

describe("Testeando las funcionalidades de Users con SUPERTEST", () => {
  const data = {
    name: "Esther",
    email: "esther@example.com",
    password: "hola1234",
  };
  let userId = "";

  it("Se crea correctamente un usuario", async () => {
    const response = await requester.post("/users").send(data);
    const { body, statusCode } = response;
    userId = body._id;
    expect(statusCode).to.be.equals(201);
    expect(body).to.have.property("_id");
  });

  it("Se leen correctamente todos los usuarios", async () => {
    const response = await requester.get("/users");
    const { body, statusCode } = response;
    expect(statusCode).to.be.equals(200);
    expect(body).to.be.an("array");
  });

  it("La lectura de un usuario devuelve un objeto con los datos", async () => {
    const response = await requester.get(`/users/${userId}`);
    const { body, statusCode } = response;
    expect(statusCode).to.be.equals(200);
    expect(body).to.be.an("object");
    expect(body).to.have.property("email");
  });

  it("Se actualiza correctamente un usuario", async () => {
    const updateData = { password: "newPassword123" };
    const response = await requester.put(`/users/${userId}`).send(updateData);
    const { statusCode, body } = response;
    expect(statusCode).to.be.equals(200);
    expect(body).to.have.property("password", "newPassword123");
  });

  it("Se elimina correctamente un usuario", async () => {
    const response = await requester.delete(`/users/${userId}`);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
});
