import express from "express";
// import cors from "cors";
// import morgan from "morgan";
import errorMiddleware from "../middlewares/errorHandling.js";
import userRoute from "../routes/userRoutes.js";
import productRoute from "../routes/productRoutes.js";
import orderRoute from "../routes/orderRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const restApiServer = (app) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use("/users", userRoute);
  app.use("/products", productRoute);
  app.use("/orders", orderRoute);
  app.use(errorMiddleware.notFound);
  app.use(errorMiddleware.errorAll);
};

export default restApiServer;
