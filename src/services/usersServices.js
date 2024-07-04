import { mongoose } from "mongoose";
import { Users } from "../models/usersModel.js";

const userService = {
  async getAllUsers() {
    return await Users.find();
  },

  async createUser(data) {
    return await Users.create(data);
  },

  async getUserById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    const objectId = new mongoose.Types.ObjectId(id);
    return await Users.findById(objectId);
  },

  //   async getUserByEmail(email) {
  //     return await Users.findUnique({ where: { email } });
  //   },

  //   async updateUser(id, data) {
  //     return await Users.update({ where: { id }, data });
  //   },

  //   async deleteUser(id) {
  //     return await Users.delete({ where: { id } });
  //   },
  //
};

export default userService;
