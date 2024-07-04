import { Products } from "../models/productsModel.js";

const getProductById = async (id) => {
    try {
        const response = await Products.findById(id);
        return response ;
  } catch (error) {
      console.log("Error fetching product by ID:", error);
  }
};

export { getProductById };






