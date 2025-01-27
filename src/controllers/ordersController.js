import orderService from "../services/ordersServices.js";

const orderController = {
  getOrders: async (req, res, next) => {
    try {
      const data = await orderService.getAllOrders();
      if (!data) {
        const error = new Error("Order not found");
        error.message = "Order not found";
        error.statusCode = 404;
        return next(error);
      }
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
        error.message = "Order not found";
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
    try {
      const order = await orderService.createOrder(data);
      if (!order) {
        const error = new Error("Order/Cart failed to create");
        error.message = "Order/Cart failed to create";
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
      const source = req.headers.source;
      const data = await orderService.updateOrderById(id, updateData, source);
      if (!data) {
        const error = new Error("Controller: Order not found");
        error.message = "Order not found";
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ message: "Update successful", data: data });
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;
