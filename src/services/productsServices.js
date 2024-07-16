import { Products } from "../models/productsModel.js";
import { mongoose } from "mongoose";

const productServices = {
  async getAllProducts(req, res) {
    let { limit, page, search, type } = req.query;
    limit = parseInt(limit);
    page = parseInt(page || 1);
    const skip = (page - 1) * limit;
    let query = {};
    if (type === "All") {
      query = {
        name: { $regex: search || "", $options: "i" },
      };
    } else if (type && type !== "All") {
      query = {
        name: { $regex: search || "", $options: "i" },
        type: type,
      };
    }
    const response = await Products.find(query)
      .skip(skip)
      .limit(limit || 12);
    let count;
    if (search || type !== "All") {
      count = response.length;
    } else {
      count = await Products.countDocuments();
    }

    const totalPage = Math.ceil(count / limit);
    return { response, totalPage };
  },

  // async getAllProducts() {
  //   const response = await Products.find();
  //   return response;
  // },
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
