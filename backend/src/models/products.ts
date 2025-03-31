// src/models/products.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
}

const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String }
});

// Create the model
const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);

export default Product;







