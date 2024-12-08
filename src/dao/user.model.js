import { Schema, model } from "mongoose";

const collection = "users";

// Definir el esquema de usuario
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }, // Nueva propiedad
  age: { type: Number, default: 18 }, // Nueva propiedad
  role: { type: Number, default: 0 }, // Nueva propiedad
  avatar: { type: String }, // Nueva propiedad opcional
});

// Crear el modelo de usuario
const User = model(collection, userSchema);

export default User;
