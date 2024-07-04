import express from "express";
import { getUsers } from "../controllers/usersController.js";
import {
  getOrders,
  getOrder,
  updateOrder,
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrder);
router.patch("/orders/:id", updateOrder);

router.get("/products", (req, res) => {
  res.send("Hello from Products!");
});

export default router;
