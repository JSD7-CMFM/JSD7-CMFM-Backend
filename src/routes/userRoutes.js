import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/users", usersController.getUsers);

router.get("/users/:id", usersController.getUserById);

router.post("/users/register", usersController.createUser);

router.post("/users/login", usersController.loginUser);

router.patch("/users/:id", usersController.updateUsers);

router.delete("/users/:id", usersController.deleteUsers);

export default router;
