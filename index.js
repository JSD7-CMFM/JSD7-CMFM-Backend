import "dotenv/config";
import express from "express";
import restApiServer from "./src/server/rest.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = process.env.PORT;
app.use(cors());
await mongoose.connect(process.env.MONGO_URI);

restApiServer(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
