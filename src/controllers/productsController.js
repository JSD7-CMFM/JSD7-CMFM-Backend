import { productServices } from "../services/productsServices.js";

export const getProducts = async (req, res) => {
  try {
    const data = await productServices.getAllProducts();
    return res.status(200).json(data);
  } catch (error) {console.log(error)}
};


export const getProductId = async (req, res) => {
  try {
    const {id} = req.params
    const product = await productServices.getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error in getProductId:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const postProduct = async (req, res, next) => {
    try {
        const data = req.body
        const product = await productServices.createProduct(data);
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error in Create Product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateProducts = async (req, res, next) => {
    try {
        const id = req.params
        const data = req.body
        const product = await productServices.updateProduct(id,data);
        return res.status(200).json({ message: "update successful"});
    } catch (error) {
        console.error("Error in Update Product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteProducts = async (req, res, next) => {
    try {
        const id = req.params
        const product = await productServices.deleteProduct(id);
        return res.status(200).json({ message: "delete successful"});
    } catch (error) {
        console.error("Error in Update Product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};