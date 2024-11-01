import mongoose from "mongoose";

// Definir el esquema de producto
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// Definir el modelo de producto
const Product = mongoose.model("Product", productSchema);

export default Product;
