import express from "express";
import mailController from "../controllers/mailsController.js";

const C = mailController;

const mailRoute = express.Router();

mailRoute.post('/:orderId', C.sendOrderConfirmation);
// mailRoute.post('/order-cancel/:orderId', authenticate, C.sendOrderCancelMail);

export default mailRoute;