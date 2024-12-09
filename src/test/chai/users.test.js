import { expect } from "chai";
import envUtil from "../../utils/env.util.js";
import User from "../../dao/user.model.js";
import dbConnect from "../../utils/db.util.js";

const data = {
  name: "Esther",
  email: "esther@example.com",
  password: "hola1234",
};

describe("Testing Users Module with CHAI", () => {
  let userId = "";

  before(async () => {
    await dbConnect(envUtil.MONGO_URI);
    await User.deleteMany(); // Limpiar la base de datos antes de las pruebas
  });

  it("Email property is present", () => {
    expect(data).to.have.property("email");
  });

  it("Email is a string", () => {
    expect(data.email).to.be.a("string");
  });

  it("Email contains '@'", () => {
    expect(data.email.includes("@")).to.be.true;
  });

  it("Creates a user and returns an object with _id", async () => {
    const newUser = await User.create(data);
    userId = newUser._id.toString();
    expect(newUser).to.have.property("_id");
  });

  it("Role defaults to '0' when creating a user", async () => {
    const user = await User.findOne({ email: data.email });
    expect(user).to.have.property("role");
    expect(user.role).to.equal(0);
  });

  it("Fails to create a duplicate user", async () => {
    try {
      await User.create(data);
    } catch (error) {
      expect(error.code).to.equal(11000); // Error de duplicado
    }
  });

  it("Deletes a user and ensures removal from the database", async () => {
    await User.findByIdAndDelete(userId);
    const deletedUser = await User.findById(userId);
    expect(deletedUser).to.be.null;
  });
});
