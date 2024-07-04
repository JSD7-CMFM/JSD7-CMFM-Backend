import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  cart_products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      amount: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  status: { type: String, require: true, unique: true },
  address: { type: String, require: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Orders = mongoose.model("Orders", ordersSchema, "orders");
