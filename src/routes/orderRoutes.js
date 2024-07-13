import express from "express";
import orderController from "../controllers/ordersController.js";
import authenticate from "../middlewares/authenticate.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const C = orderController;

const orderRoute = express.Router();

orderRoute.get("/", authenticate, authenticateAdmin, C.getOrders);
orderRoute.get("/:id", authenticate, C.getOrder);
orderRoute.post("/:id", authenticate, C.createOrder);
orderRoute.patch("/:id", authenticate, C.updateOrder);
orderRoute.post("/", authenticate, C.createOrder);

export default orderRoute;
