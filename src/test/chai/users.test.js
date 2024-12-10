import { expect } from "chai";
import usersService from "../../services/users.service.js";
import dbConnect from "../../utils/db.util.js";
import { faker } from "@faker-js/faker";

describe("Testing Users with CHAI through Service Layer", () => {
  let data;
  let uid = "";

  before(async () => await dbConnect());

  beforeEach(() => {
    // Genera un nuevo usuario antes de cada prueba
    data = {
      name: "Test User",
      email: faker.internet.email(),
      password: "test1234",
    };
  });

  it("Should have email and password properties", () => {
    expect(data).to.have.property("email");
    expect(data).to.have.property("password");
  });

  it("Creating a user returns an object with _id", async () => {
    const one = await usersService.create(data);
    uid = one._id;
    expect(one).to.have.property("_id");
  });

  it("User has a default role", async () => {
    try {
      const existing = await usersService.findById(uid);
      if (existing) await usersService.delete(uid);
    } catch (error) {
      // User not found, continue
    }
    const one = await usersService.create(data);
    expect(one).to.have.property("role");
    expect(one.role).to.equal(0);
  });

  it("Should return an error when email or password is missing", async () => {
    try {
      await usersService.create({
        name: "Test User",
        email: "",
        password: "",
      });
      expect.fail("Expected validation error.");
    } catch (error) {
      expect(error.message).to.equal("Required data is missing.");
    }
  });

  it("Deleting a user removes it from the storage", async () => {
    const newUser = await usersService.create(data); // Ensure unique email
    const tid = newUser._id.toString();

    await usersService.delete(tid); // Delete the user

    try {
      await usersService.findById(tid); // Expect to fail
      expect.fail("Expected the user not to be found.");
    } catch (error) {
      expect(error.message).to.equal("User not found.");
    }
  });
});
