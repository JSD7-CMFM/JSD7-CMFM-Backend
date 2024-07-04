import { updateProduct } from "../services/patchProductServices.js";

export const updateProducts = async (req, res, next) => {
    try {
        const id = req.params
        const data = req.body
        const product = await updateProduct(id,data);
        return res.status(200).json({ message: "update successful"});
    } catch (error) {
        console.error("Error in Update Product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};