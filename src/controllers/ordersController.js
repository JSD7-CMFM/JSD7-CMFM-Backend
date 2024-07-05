import orderService from "../services/ordersServices.js";

const orderController = {
  getOrders: async (req, res) => {
    try {
      const data = await orderService.getAllOrders();
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await orderService.getOrderById(id);
      if (!data) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const id = req.params;
      const updateData = req.body;
      const data = await orderService.updateOrderById(id, updateData);
      if (!data) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json({ message: "Update successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default orderController;
