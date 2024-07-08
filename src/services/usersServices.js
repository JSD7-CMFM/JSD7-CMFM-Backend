import { mongoose } from "mongoose";
import { Users } from "../models/usersModel.js";

const userService = {
  async getAllUsers() {
    return await Users.find();
  },

  async createUser(data) {
    return await Users.create(data);
  },

  //use to verify login
  async findByEmail(email) {
    return await Users.findOne({ email });
  },

  async getUserById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    const objectId = new mongoose.Types.ObjectId(id);
    return await Users.findById(objectId).select("-password");
  },

  async updateUser(id, data) {
    const newId = new mongoose.Types.ObjectId(id);
    const response = await Users.findByIdAndUpdate(newId, data);
    return response;
  },

  async deleteUser(id, data) {
    const newId = new mongoose.Types.ObjectId(id);
    const response = await Users.findByIdAndDelete(newId, data);
    return response;
  },
};

export default userService;
