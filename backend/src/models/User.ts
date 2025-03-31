import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  auth0Id: string;
  email: string;
  name?: string;
  orders?: any[];
  address?: object;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String },
  orders: { type: Array, default: [] },
  address: { type: Object, default: {} }
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
