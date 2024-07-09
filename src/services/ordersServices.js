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

createOrder : async (data) => {
  try {
    const response = await Orders.create(data);
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
},

 createOrderById : async (id, updateData) => {
  try {
    const newId = new mongoose.Types.ObjectId(id);
    // Check if the order with the given ID exists
    const existingOrder = await Orders.findById(newId);

    let response;
    if (existingOrder) {
      // If order exists, merge existing data with new updateData
      const updatedData = { ...existingOrder, ...updateData };
      // Update the order
      response = await Orders.findByIdAndUpdate(newId, updatedData, { new: true });
    } else {
      // If order doesn't exist, create a new one
      response = await Orders.create({ _id: newId, ...updateData });
    }
    return response;
  } catch (error) {
    console.error('Error in createOrderById:', error);
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
}
export default orderService;
