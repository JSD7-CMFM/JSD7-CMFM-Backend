import express from "express";
import {
  getOrders,
  getOrder,
  updateOrder,
} from "../controllers/ordersController.js";

const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrder);
orderRouter.patch("/:id", updateOrder);

export default orderRouter;
