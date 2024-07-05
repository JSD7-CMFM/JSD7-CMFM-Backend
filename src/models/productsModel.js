import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    productId:{ type: Number },
    name: { type: String },
    category: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    product_img: { type: String },
    description: { type: String },
    // productinfo: { type: String },
    productinfo1: { type: String },
    productinfo2: { type: String },
    type: { type: String },
    isActive: { type: Boolean , default: true },
    created_at: { type: Date, default: new Date().getTime() },
    updated_at: { type: Date, default: new Date().getTime() },
});

export const Products = mongoose.model("Products", productsSchema, "products");