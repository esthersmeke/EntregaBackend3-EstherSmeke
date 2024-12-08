import mongoose from "mongoose";

// Definir el esquema de producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Asegurar que el nombre es obligatorio
  price: { type: Number, required: true }, // Asegurar que el precio es obligatorio
});

// Definir el modelo de producto
const Product = mongoose.model("Product", productSchema);

export default Product;
