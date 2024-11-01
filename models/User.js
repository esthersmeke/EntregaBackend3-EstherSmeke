import mongoose from "mongoose";

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Definir el modelo de usuario
const User = mongoose.model("User", userSchema);

export default User;
