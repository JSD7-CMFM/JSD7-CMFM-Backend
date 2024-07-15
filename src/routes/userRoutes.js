import express from "express";
import usersController from "../controllers/usersController.js";
import authenticate from "../middlewares/authenticate.js";
import passport from "passport"; // เพิ่มการนำเข้า passport

const C = usersController;

const userRoute = express.Router();

userRoute.get("/", authenticate, C.getUsers);

userRoute.get("/:id", authenticate, C.getUserById);

userRoute.post("/register", C.createUser);

userRoute.post("/login", C.loginUser);

userRoute.patch("/:id", authenticate, C.updateUsers);

userRoute.delete("/:id", authenticate, C.deleteUsers);

// เพิ่มเส้นทางสำหรับ Google OAuth
userRoute.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
userRoute.get("/auth/google/callback", 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);  

export default userRoute;
