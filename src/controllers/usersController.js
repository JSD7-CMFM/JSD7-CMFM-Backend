import { Orders } from "../models/ordersModel.js";
import { Users } from "../models/usersModel.js";
import userService from "../services/usersServices.js";
import utils from "../utils/index.js";

const usersController = {
  getUsers: async (req, res, next) => {
    try {
      const data = await userService.getAllUsers();
      return res.status(200).json({ message: "Get All Users", data: data });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ message: "Get User By ID", data: user });
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userService.findByEmail(email);
      if (!user || !(await utils.bcrypt.compare(password, user.password))) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        return next(error);
      }

      const checkId = user._id.toString();
      const checkUserCart = await Orders.findOne({
        user_id: checkId,
        status: "pending",
      }).select("_id");

      const token = utils.jwt.sign({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      // const token = utils.jwt.sign(user.toObject());
      return res.status(200).json({
        message: "Login Successful",
        email: user.email,
        id: user._id,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        cart: checkUserCart ? checkUserCart._id : "No_cart",
        token: token,
      });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const hashedPassword = await utils.bcrypt.hashed(req.body.password);
      req.body.password = hashedPassword;

      if (req.body.email) {
        const emailDupe = await Users.findOne({ email: req.body.email });
        if (emailDupe) {
          const error = new Error("Email already exists");
          error.statusCode = 409;
          return next(error);
        }
      }
      const user = await userService.createUser(req.body);

      if (!user) {
        const error = new Error("User creation failed");
        error.statusCode = 400;
        return next(error);
      }
      const token = utils.jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      });
      return res.status(201).json({
        message: "User Created",
        email: user.email,
        id: user._id,
        firstName: user.firstName,
        cart: "No_cart",
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  updateUsers: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const tokenUser = req.user;
      const user = await userService.getUserByIdPatch(id);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }

      if (!tokenUser.isAdmin) {
        if (!data.password) {
          res
            .status(401)
            .json({ message: "Unauthorized: Password is required" });
          return;
        }
        const isPasswordCorrect = await utils.bcrypt.compare(
          data.password,
          user.password
        );
        if (!isPasswordCorrect) {
          const error = new Error("Password is incorrect");
          error.message = "Password is incorrect";
          error.statusCode = 401;
          return next(error);
        }
      }
      delete data.password;
      const updatedUser = await userService.updateUser(id, data);
      if (!updatedUser) {
        const error = new Error("User update failed");
        error.statusCode = 400;
        return next(error);
      }

      return res.status(200).json({ message: "Update successful" });
    } catch (error) {
      next(error);
    }
  },

  deleteUsers: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      return res.status(200).json({ message: "Delete successful" });
    } catch (error) {
      next(error);
    }
  },
};

export default usersController;
