import { expect } from "chai";
import supertest from "supertest";
import envUtil from "../../utils/env.util.js";
import { faker } from "@faker-js/faker";

const requester = supertest(`http://localhost:${envUtil.PORT}/api`);

describe("Testeando las funcionalidades de User con Supertest", () => {
  const data = {
    name: "Test User",
    email: faker.internet.email(), // Genera un correo único por ejecución
    password: "test1234",
  };
  let userId = "";

  it("Se crea correctamente un usuario", async () => {
    const response = await requester.post("/users").send(data);
    const { _body, statusCode } = response;
    userId = _body.response._id;
    expect(statusCode).to.be.equals(201);
  });

  it("Se leen correctamente todos los usuarios", async () => {
    const response = await requester.get("/users");
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("La lectura de un usuario devuelve un objeto con los datos del usuario", async () => {
    const response = await requester.get(`/users/${userId}`);
    const { _body } = response;
    expect(_body.response).to.be.an("object");
    expect(_body.response).to.have.property("name");
    expect(_body.response).to.have.property("email");
    expect(_body.response).to.have.property("role");
  });

  it("Se actualiza correctamente un usuario", async () => {
    const updatedData = { password: "newpassword123" };
    const response = await requester.put(`/users/${userId}`).send(updatedData);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("La actualización de la contraseña persiste", async () => {
    const response = await requester.get(`/users/${userId}`);
    expect(response._body.response.password).to.not.equal("test1234");
  });

  it("Se elimina correctamente un usuario", async () => {
    const response = await requester.delete(`/users/${userId}`);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("Intentar leer un usuario eliminado devuelve un error", async () => {
    const response = await requester.get(`/users/${userId}`);
    const { statusCode, _body } = response;
    expect(statusCode).to.be.equals(404);
    expect(_body.message).to.include("User not found");
  });
});
