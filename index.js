import 'dotenv/config';
import express from "express";
import router from "./src/routes/index.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;

await mongoose.connect(process.env.MONGO_URI);


app.use("/api-services", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
