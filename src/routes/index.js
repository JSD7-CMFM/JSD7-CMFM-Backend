import express from "express";
import { getUsers } from "../controllers/usersController.js";
import { getProducts } from "../controllers/productsController.js";


const router = express.Router();

router.get("/users", getUsers);

router.get("/products", getProducts);



export default router;