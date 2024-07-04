import express from "express";
import { getProductId, getProducts, postProduct, updateProducts, deleteProducts } from "../controllers/productsController.js";

const router = express.Router();

router.get("/products", getProducts);

router.get("/products/:id", getProductId);

router.post("/products", postProduct);

router.patch("/products/:id", updateProducts)

router.delete("/products/:id", deleteProducts)


export default router;