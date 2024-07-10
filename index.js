// import "dotenv/config";
// import express from "express";
// import restApiServer from "./src/server/rest.js";
// import mongoose from "mongoose";


// const app = express();
// const port = process.env.PORT;
// const mongourl = process.env.MONGO_URI;

// app.use(express.json());

// mongoose.connect(mongourl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

// restApiServer(app);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import restApiServer from "./src/server/rest.js";

const app = express();
const port = process.env.PORT || 3000;
const mongourl = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(mongourl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

restApiServer(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

