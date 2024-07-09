import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
    cart_products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      amount: { type: Number, required: true },
      name: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      product_img: { type: String },
      }
    ],
    total_price: { type: Number, require: true },
    status: { type: String, require: true, unique: true },
    address: { type: String, require: true, unique: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Orders = mongoose.model("Orders", ordersSchema, "orders");
