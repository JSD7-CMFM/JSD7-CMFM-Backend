import express from "express";
import {
  getOrders,
  getOrder,
  updateOrder,
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/orders", getOrders);
router.get("/orders/:id", getOrder);
router.patch("/orders/:id", updateOrder);

export default router;
