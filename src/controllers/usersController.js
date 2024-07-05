import userService from "../services/usersServices.js";
import utils from "../utils/index.js";
import { CreateCustomError } from "../config/error.js";
import * as jwt from "../utils/jwt.js";

const usersController = {
  getUsers: async (req, res, next) => {
    try {
      const data = await userService.getAllUsers();
      res.status(200).json({ message: "Get All Users", data: data });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.status(200).json({ message: "Get User By ID", data: user });
    } catch (error) {
      next(error);
    }
  },
  
    // try {
    //   const user = req.body;
    //   res.status(200).json({ message: "Login Successful", data: user });
    // } catch (error) {
    //   next(error);
    // }

  createUser: async (req, res, next) => {
    try {
      const hashed = await utils.bcrypt.hashed(req.body.password);
      req.body.password = hashed;
      const data = req.body;
      const user = await userService.createUser(data);
      delete user.password;
      const token = jwt.sign(user.toObject());
      res
        .status(201)
        .json({ message: "Create User", data: user, token: token });
    } catch (error) {
      next(error);
    }
  },
  updateUsers: async (req, res, next) => {
    try {
      const id = req.params;
      const data = req.body;
      await userService.updateUser(id, data);
      return res.status(200).json({ message: "update successful" });
    } catch (error) {
      console.error("Error in Update Product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteUsers: async (req, res, next) => {
    try {
      const id = req.params;
      await userService.deleteUser(id);
      return res.status(200).json({ message: "delete successful" });
    } catch (error) {
      console.error("Error in Update Product:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default usersController;

// export { getUsers, getUserById, createUser, updateUsers, deleteUsers };
