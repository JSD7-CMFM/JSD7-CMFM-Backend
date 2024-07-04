import express from "express";
import { getUsers } from "../controllers/usersController.js";
import { getProducts } from "../controllers/productsController.js";
import { getProductId } from "../controllers/productByIdController.js";
import { postProduct } from "../controllers/postProductControllers.js";
import { updateProducts } from "../controllers/patchProductControllers.js";
import { deleteProducts } from "../controllers/deleteProductControllers.js";


const router = express.Router();

router.get("/users", getUsers);

router.get("/products", getProducts);

router.get("/products/:id", getProductId);

router.post("/products", postProduct);

router.patch("/products/:id", updateProducts)

router.delete("/products/:id", deleteProducts)


export default router;