import express from "express";
import usersController from "../controllers/usersController.js";
import authenticate from "../middlewares/authenticate.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const C = usersController;

const userRoute = express.Router();

userRoute.get("/", authenticate, authenticateAdmin, C.getUsers);

userRoute.get("/:id", authenticate, C.getUserById);

userRoute.post("/register", C.createUser);

userRoute.post("/login", C.loginUser);

userRoute.patch("/:id", authenticate, C.updateUsers);

userRoute.delete("/:id", authenticate, C.deleteUsers);

export default userRoute;
