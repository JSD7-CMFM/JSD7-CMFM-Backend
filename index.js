import express from "express";
import router from "./src/routes/index.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;

await mongoose.connect(
  "mongodb+srv://Admin_CMFM:cmfm1234@cmfm.fyrm4ye.mongodb.net/CMFM"
);


app.use(express.json());
app.use("/api-services", router);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
