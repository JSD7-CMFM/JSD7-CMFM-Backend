import express from "express";
import usersController from "../controllers/usersController.js";
import authenticate from "../middlewares/authenticate.js";

const C = usersController;

const userRoute = express.Router();

userRoute.get("/", C.getUsers);

userRoute.get("/:id", C.getUserById);

userRoute.post("/register", C.createUser);

userRoute.post("/login", C.loginUser);

userRoute.patch("/:id", authenticate, C.updateUsers);

userRoute.delete("/:id", C.deleteUsers);

export default userRoute;
