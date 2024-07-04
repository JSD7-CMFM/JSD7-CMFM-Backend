import { getProductById } from "../services/productByIdServices.js";

export const getProductId = async (req, res) => {
  try {
    const {id} = req.params // Adjust as per your route configuration
    const product = await getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error in getProductId:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};







