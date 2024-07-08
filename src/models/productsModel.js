import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    productId: { type: Number },
    name: { type: String, require: true },
    category: { type: String, require: true },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    product_img: { type: String },
    description: { type: String },
    productInfo: { type: Object },
    type: { type: String, require: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
export const Products = mongoose.model("Products", productsSchema, "products");
