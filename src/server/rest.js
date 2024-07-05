import express from "express";
// import cors from "cors";
// import morgan from "morgan";

import userRoute from "../routes/userRoutes.js";
import productRoute from "../routes/productRoutes.js";
import orderRoute from "../routes/orderRoutes.js";

const restApiServer = (app) => {
  app.use(express.json());
  app.use("/users", userRoute);
  app.use("/products", productRoute);
  app.use("/orders", orderRoute);
};

export default restApiServer;
