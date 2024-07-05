import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({
    productId: { type: Number },
    name: { type: String },
    category: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    product_img: { type: String },
    description: { type: String },
    productInfo: { type: Object },
    type: { type: String },
    isActive: { type: Boolean, default: true },
},
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
export const Products = mongoose.model("Products", productsSchema, "products");