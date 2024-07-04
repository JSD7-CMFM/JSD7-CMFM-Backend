import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users/register", createUser);

// router.post("/users/login", getUserById);
// router.patch("/users/:id", getUserById);
// router.delete("/users/:id", getUserById);

export default router;
