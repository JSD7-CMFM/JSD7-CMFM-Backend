import { Products } from "../models/productsModel.js";
import { mongoose } from "mongoose"

const deleteProduct = async (id, data) => {
        const newId = new mongoose.Types.ObjectId(id)
        const response = await Products.findByIdAndDelete(newId,data);
        return response ;
};

export { deleteProduct };