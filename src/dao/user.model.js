import { Schema, model } from "mongoose";

const collection = "users";

// Definir el esquema de usuario
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  age: { type: Number, default: 18 },
  role: { type: Number, default: 0 },
  avatar: { type: String },
});

// Crear el modelo de usuario
const User = model(collection, userSchema);

export default User;
