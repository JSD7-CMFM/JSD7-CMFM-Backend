import express from "express";
import { getProductId, getProducts, postProduct, updateProducts, deleteProducts } from "../controllers/productsController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", getProductId);

productRouter.post("/", postProduct);

productRouter.patch("/:id", updateProducts)

productRouter.delete("/:id", deleteProducts)


export default productRouter;