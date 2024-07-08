import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
    cart_products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        amount: { type: Number, require: true },
      },
    ],
    total_price: { type: Number, require: true },
    status: { type: String, require: true, unique: true },
    address: { type: String, require: true, unique: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Orders = mongoose.model("Orders", ordersSchema, "orders");
