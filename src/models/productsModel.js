import { required } from "joi";
import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    productId: { type: Number },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    product_img: { type: String },
    description: { type: String },
    productInfo: { type: Object },
    type: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
export const Products = mongoose.model("Products", productsSchema, "products");
