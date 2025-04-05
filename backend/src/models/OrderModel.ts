import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: Array<{ productId: mongoose.Types.ObjectId; quantity: number }>;
  total: number;
  status: string;
  createdAt: Date;
}

const orderSchema: Schema<IOrder> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ["new", "processing", "on the way", "delivered"], default: "new" },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
export default OrderModel;
