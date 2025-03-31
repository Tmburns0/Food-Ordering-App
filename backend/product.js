const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the product (e.g., "Pepperoni Pizza")
  price: { type: Number, required: true }, // Price of the product
  description: { type: String }, // Optional description (e.g., "Classic pepperoni pizza with cheese")
  image: { type: String }, // Image URL or path
  category: { type: String }, // Optional category (e.g., "Pizza", "Sides")
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
