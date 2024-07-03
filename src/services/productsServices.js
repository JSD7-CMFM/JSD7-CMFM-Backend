import { Products } from "../models/productsModel.js";

const getAllProducts = async () => {
  try {
    const response = await Products.find();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getAllProducts };