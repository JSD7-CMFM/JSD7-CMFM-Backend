import express from "express";
import productsController from "../controllers/productsController.js";
import authenticate from "../middlewares/authenticate.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const C = productsController

const productRoute = express.Router();

productRoute.get("/", C.getProducts);

productRoute.get("/:id", C.getProductId);

productRoute.post("/", authenticate, C.postProduct);

productRoute.patch("/:id", C.updateProducts)

productRoute.delete("/:id", C.deleteProducts)


export default productRoute;