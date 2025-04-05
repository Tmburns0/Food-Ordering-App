import mongoose, { Schema, Document } from "mongoose";

// Define a sub-schema for the Order
const orderSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["new", "processing", "shipped", "delivered"], default: "new" },
  createdAt: { type: Date, default: Date.now },
});

// Define the IUser interface for TypeScript
export interface IUser extends Document {
  auth0Id: string;
  email: string;
  name?: string;
  orders?: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    status: string;
    createdAt: Date;
  }[];
  address?: {
    line1?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String },
  orders: { type: [orderSchema], default: [] }, // Reference the sub-schema for orders
  address: {
    line1: { type: String },
    city: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
});

// Create and export the User model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
