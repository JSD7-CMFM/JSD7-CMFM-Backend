import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    user_id: { type: String, require: true },
    cart_products: [
      {
        product_id: {
          type: String,
          required: true,
        },
        amount: { type: Number, require: true },
        name: { type: String },
      },
    ],
    total_price: { type: Number },
    status: { type: String, default: "pending" },
    address: { type: String },
    // orderNumber: { type: Number, unique: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Orders = mongoose.model("Orders", ordersSchema, "orders");
