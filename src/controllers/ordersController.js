import orderService from "../services/ordersServices.js";

const orderController = {
  getOrders: async (req, res, next) => {
    try {
      const data = await orderService.getAllOrders();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  getOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await orderService.getOrderById(id);
      if (!data) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  createOrder: async (req, res, next) => {
    const data = req.body;
    console.log("Request Body:", data);
    try {
      const order = await orderService.createOrder(data);
      if (!order) {
        const error = new Error("Order/Cart failed to create");
        error.statusCode = 400;
        return next(error);
      }
      return res
        .status(201)
        .json({ message: "Order created", order: order, cart: order._id });
    } catch (error) {
      next(error);
    }
  },

  updateOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const data = await orderService.updateOrderById(id, updateData);
      if (!data) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ message: "Update successful", data: data });
    } catch (error) {
      next(error);
    }
  },

  //   createOrder: async (req, res, next) => {
  //   try {
  //     const {id } = req.query;
  //     const updateData = req.body;
  //     const data = await orderService.createOrderById(id, updateData);
  //     if (!data) {
  //       const error = new Error("Order not found");
  //       error.statusCode = 404;
  //       return next(error);
  //     }
  //     return res.status(200).json({ message: "Update successful" });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
};

export default orderController;
