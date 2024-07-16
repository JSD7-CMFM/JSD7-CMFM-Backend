import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    cart_products: [
      {
        product_id: {
          type: String,
          required: true,
        },
        amount: { type: Number },
        name: { type: String },
        description: { type: String },
        category: { type: String },
        product_img: { type: String },
        price: { type: Number },
        type: { type: String },
        stock: { type: Number },
      },
    ],
    total_price: { type: Number },
    status: { type: String, default: "pending" },
    address: {
      address: { type: String, default: "" },
      province: { type: String, default: "" },
      country: { type: String, default: "" },
      zipcode: { type: String, default: "" },
    },
    orderNumber: { type: Number, unique: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Orders = mongoose.model("Orders", ordersSchema, "orders");
