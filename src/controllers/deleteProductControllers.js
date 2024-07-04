import { deleteProduct } from "../services/deleteProductServices.js";

export const deleteProducts = async (req, res, next) => {
    try {
        const id = req.params
        const product = await deleteProduct(id);
        return res.status(200).json({ message: "delete successful"});
    } catch (error) {
        console.error("Error in Update Product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};