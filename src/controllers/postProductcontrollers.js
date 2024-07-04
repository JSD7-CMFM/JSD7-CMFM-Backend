import { createProduct } from "../services/postProductServices.js";

export const postProduct = async (req, res, next) => {
    try {
        const data = req.body
        const product = await createProduct(data);
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error in Create Product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};