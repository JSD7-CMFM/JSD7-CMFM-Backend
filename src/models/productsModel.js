import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    productId: { type: Number },
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    product_img: { type: String },
    productinfo: { 
      info1: { type: String, required: true },
      info2: { type: String, required: true }
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
export const Products = mongoose.model("Products", productsSchema, "products");
