import express from "express";
import { getUsers } from "../controllers/usersController.js";


const router = express.Router();

router.get("/users", getUsers);

router.get("/products", (req, res) => {
    res.send("Hello from Products!");
});

export default router;