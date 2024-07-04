import { getAllOrders } from "../services/ordersServices.js";
import { getOrderById } from "../services/ordersServices.js";
import { updateOrderById } from "../services/ordersServices.js";

export const getOrders = async (req, res) => {
  try {
    const data = await getAllOrders();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOrderById(id);
    if (!data) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const id = req.params;
    const updateData = req.body;
    const data = await updateOrderById(id, updateData);
    if (!data) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
