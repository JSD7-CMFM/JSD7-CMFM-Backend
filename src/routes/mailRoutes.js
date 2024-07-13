import express from "express";
import mailController from "../controllers/mailsController.js";
import authenticate from "../middlewares/authenticate.js";

const C = mailController;
const mailRoute = express.Router();

mailRoute.post('/:orderId', authenticate, C.sendOrderConfirmation);

export default mailRoute;