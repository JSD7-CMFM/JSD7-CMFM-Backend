import { Products } from "../models/productsModel.js";
import { mongoose } from "mongoose"

const productServices = {

    async getAllProducts() {
        const response = await Products.find();
        return response;
    },

    async getProductById(id) {
        const response = await Products.findById(id);
        return response;
    },

    async createProduct(data) {
        const response = await Products.create(data);
        return response;
    },

    async updateProduct(id, data) {
        const newId = new mongoose.Types.ObjectId(id)
        const response = await Products.findByIdAndUpdate(newId, data);
        return response;
    },

    async deleteProduct(id, data) {
        const newId = new mongoose.Types.ObjectId(id)
        const response = await Products.findByIdAndDelete(newId, data);
        return response;
    }
};
export { productServices };