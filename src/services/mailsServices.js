// import { mongoose } from "mongoose";
import { Users } from "../models/usersModel.js";
import { Orders } from "../models/ordersModel.js";

const mailService = {
  async getEmailUser(orderId) {
    try {
      // ค้นหา order ด้วย orderId ที่ได้รับ
      const order = await Orders.findById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      // หา user ด้วย user_id ที่อยู่ใน order
      const user = await Users.findById(order.user_id);
      if (!user) {
        throw new Error("User not found");
      }

      // คืนค่า email ของ user
      return user.email;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default mailService;
