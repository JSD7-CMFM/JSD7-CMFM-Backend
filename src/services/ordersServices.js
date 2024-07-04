import { Orders } from "../models/ordersModel.js";
import { mongoose } from "mongoose";

const getAllOrders = async () => {
  try {
    const response = await Orders.find();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getOrderById = async (id) => {
  try {
    const response = await Orders.findById(id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateOrderById = async (id, updateData) => {
  try {
    const newId = new mongoose.Types.ObjectId(id);
    const response = await Orders.findByIdAndUpdate(newId, updateData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getAllOrders, getOrderById, updateOrderById };
