import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import chatRoute from "../routes/chatRoutes.js";
import userRoute from "../../src/routes/userRoutes.js";
import productRoute from "../../src/routes/productRoutes.js";
import orderRoute from "../../src/routes/orderRoutes.js";
import mailRoute from "../routes/mailRoutes.js";
import errorMiddleware from "../middlewares/errorHandling.js";

const restApiServer = (app) => {
  const corsOptions = {
    origin: ['http://localhost:5173', 'https://jsd-7-cmfm-frontend.vercel.app'],
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/chat", chatRoute);
  app.use("/users", userRoute);
  app.use("/products", productRoute);
  app.use("/orders", orderRoute);
  app.use("/mails", mailRoute);

  app.use(errorMiddleware.notFound);
  app.use(errorMiddleware.errorAll);
};

export default restApiServer;
