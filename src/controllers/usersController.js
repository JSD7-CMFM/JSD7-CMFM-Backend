import { getAllUsers } from "../services/usersServices.js";

export const getUsers = async (req, res) => {
  try {
    const data = await getAllUsers();
    return res.status(200).json(data);
  } catch (error) {}
};
