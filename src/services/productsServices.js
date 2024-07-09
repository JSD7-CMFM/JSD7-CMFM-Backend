import { Products } from "../models/productsModel.js";
import { mongoose } from "mongoose";

const productServices = {
  async searchProducts(req, res, next) {
    try {
      let { limit, page, search } = req.query;
      limit = parseInt(limit) || 12;
      page = parseInt(page) || 1;

      const skip = (page - 1) * limit;

      const response = await Products.find({ name: { $regex: search, $options: 'i' } })
        .skip(skip)
        .limit(limit);

      const count = await Products.countDocuments({ name: { $regex: search, $options: 'i' } });
      const totalPage = Math.ceil(count / limit);

      if (!res.headersSent) {
        return res.json({ response, totalPage });
      }
    } catch (error) {
      next(error);
    }
  },

  async getAllProducts() {
    const response = await Products.find();
    return response;
  },
  getProducts: async (req, res, next) => {
    try {
      const data = await productServices.getAllProducts();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
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
    const newId = new mongoose.Types.ObjectId(id);
    const response = await Products.findByIdAndUpdate(newId, data);
    return response;
  },

  async deleteProduct(id, data) {
    const newId = new mongoose.Types.ObjectId(id);
    const response = await Products.findByIdAndDelete(newId, data);
    return response;
  },
};
export default productServices;
