import { Users } from "../models/usersModel.js";
const getAllUsers = async () => {
  try {
    const response = await Users.find();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getAllUsers };