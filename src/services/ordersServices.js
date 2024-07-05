import { Orders } from "../models/ordersModel.js";
import { mongoose } from "mongoose";

const orderService = {
getAllOrders : async () => {
  try {
    const response = await Orders.find();
    return response;
  } catch (error) {
    console.log(error);
  }
},

getOrderById : async (id) => {
  try {
    const response = await Orders.findById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
},

updateOrderById : async (id, updateData) => {
  try {
    const newId = new mongoose.Types.ObjectId(id);
    const response = await Orders.findByIdAndUpdate(newId, updateData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
}
export default orderService;
