import express from "express";
import productsController from "../controllers/productsController.js";
import authenticate from "../middlewares/authenticate.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const C = productsController;

const productRoute = express.Router();

productRoute.get("/", C.getProducts);

// productRoute.get("/search", C.searchProducts);

productRoute.get("/:id", C.getProductId);

productRoute.post("/", authenticate, authenticateAdmin, C.postProduct);

productRoute.patch("/:id", authenticate, authenticateAdmin, C.updateProducts);

productRoute.delete("/:id", authenticate, authenticateAdmin, C.deleteProducts);

export default productRoute;
