// src/dao/product.model.js
import mongoose from "mongoose";

// Definir el esquema de producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Definir el modelo de producto
const Product = mongoose.model("Product", productSchema);

export default Product;
