import { getAllProducts } from "../services/productsServices.js";

export const getProducts = async (req, res) => {
  try {
    const data = await getAllProducts();
    return res.status(200).json(data);
  } catch (error) {console.log(error)}
};