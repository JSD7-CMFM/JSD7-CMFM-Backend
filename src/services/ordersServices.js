import { Orders } from "../models/ordersModel.js";
import { mongoose } from "mongoose";

const orderService = {
  getAllOrders: async () => {
    try {
      const response = await Orders.find();
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await Orders.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  // createOrder: async (data) => {
  //   console.log("data service", data);
  //   try {
  //     // const latestOrder = await Orders.findOne()
  //     //   .sort({ orderNumber: -1 })
  //     //   .exec();
  //     // const newOrderNumber = latestOrder ? latestOrder.orderNumber + 1 : 1;
  //     // data.orderNumber = newOrderNumber;

  //     const response = await Orders.create(data);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  createOrder: async (data) => {
    try {
      // Find the latest order by orderNumber
      const latestOrder = await Orders.findOne()
        .sort({ orderNumber: -1 })
        .exec();

      // Log the latestOrder details for debugging
      console.log("Latest Order:", latestOrder);

      // Determine the new order number
      const newOrderNumber =
        latestOrder && latestOrder.orderNumber
          ? latestOrder.orderNumber + 1
          : 1;

      // Log the new order number for debugging
      console.log("New Order Number:", newOrderNumber);

      // Assign the new order number to the order data
      data.orderNumber = newOrderNumber;

      // Create the new order
      const response = await Orders.create(data);
      return response;
    } catch (error) {
      console.error("Error in createOrder:", error);
      throw error; // Ensure the error is propagated correctly
    }
  },

  updateOrderById: async (id, updateData, source) => {
    try {
      const newId = new mongoose.Types.ObjectId(id);
      const order = await Orders.findById(newId);
      console.log("Updated cart products:", order);
      if (!order) {
        throw new Error("Order not found");
      }
      if (source === "addProduct") {
        const checkProductIndex = order.cart_products.findIndex(
          (item) => item.product_id === updateData.product_id
        );
        if (checkProductIndex !== -1) {
          order.cart_products[checkProductIndex].amount += updateData.amount;
        } else {
          const newItem = {
            product_id: updateData.product_id,
            amount: updateData.amount,
            name: updateData.name,
            category: updateData.category,
            description: updateData.description,
            price: updateData.price,
            product_img: updateData.product_img,
          };
          order.cart_products.push(newItem);
        }
        const response = await order.save();
        return response;
      }
      if (source === "delete") {
        order.cart_products = order.cart_products.filter(
          (product) => product.product_id !== updateData[0].product_id
        );
        const response = await order.save();
        return response;
      }
      if (source === "checkout") {
      }
    } catch (error) {
      console.log(error);
    }
  },

  createOrderById: async (id, updateData) => {
    try {
      const newId = new mongoose.Types.ObjectId(id);
      // Check if the order with the given ID exists
      const existingOrder = await Orders.findById(newId);

      let response;
      if (existingOrder) {
        // If order exists, merge existing data with new updateData
        const updatedData = { ...existingOrder, ...updateData };
        // Update the order
        response = await Orders.findByIdAndUpdate(newId, updatedData, {
          new: true,
        });
      } else {
        // If order doesn't exist, create a new one
        response = await Orders.create({ _id: newId, ...updateData });
      }
      return response;
    } catch (error) {
      console.error("Error in createOrderById:", error);
      throw error; // Rethrow the error to handle it further up the call stack
    }
  },

  //   createOrderById: async (req, res) => {
  //   try {
  //     const { id } = req.params
  //     const { } = req.body
  //     console.log(id)
  //     const order = await Orders.findOne({ user_id: id }).exec()
  //     if (!order) {
  //       let newOrder = new Orders({
  //         user_id: id
  //       })

  //       let response = await newOrder.save()
  //       res.send(response)
  //     }
  //   } catch (error) {

  //   }
  // }
};
export default orderService;
