import { Products } from "../models/productsModel.js";

const createProduct = async (data) => {
        const response = await Products.create(data);
        return response ;
};

export { createProduct };