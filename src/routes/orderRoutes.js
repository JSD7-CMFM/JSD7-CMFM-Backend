import express from "express";
import orderController from "../controllers/ordersController.js";

const C = orderController;

const orderRoute = express.Router();

orderRoute.get("/", C.getOrders);
orderRoute.get("/:id", C.getOrder);
orderRoute.post("/", C.createOrder);
orderRoute.patch("/:id", C.updateOrder);
// orderRoute.post("/:id", C.createOrder);


export default orderRoute;