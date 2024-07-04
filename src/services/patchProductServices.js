import { Products } from "../models/productsModel.js";
import { mongoose } from "mongoose"

const updateProduct = async (id, data) => {
        const newId = new mongoose.Types.ObjectId(id)
        const response = await Products.findByIdAndUpdate(newId,data);
        return response ;
};

export { updateProduct };