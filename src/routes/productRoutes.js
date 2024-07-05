import express from "express";
import productsController from "../controllers/productsController.js";

const C = productsController

const productRoute = express.Router();

productRoute.get("/", C.getProducts);

productRoute.get("/:id", C.getProductId);

productRoute.post("/", C.postProduct);

productRoute.patch("/:id", C.updateProducts)

productRoute.delete("/:id", C.deleteProducts)


export default productRoute;