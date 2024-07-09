import jwt from "jsonwebtoken";
import { Users } from "../models/usersModel.js";
import { mongoose } from "mongoose";

const authenticate = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization) {
      throw new Error(
        "No permission, invalid token please create an account",
        "InvalidToken",
        401
      );
    }

    const authorization = req.headers?.authorization.startsWith("Bearer")
      ? req.headers.authorization
      : next(new Error("Not found Bearer token", "InvalidToken", 400));

    const token = authorization.split(" ")[1]
      ? authorization.split(" ")[1]
      : next(new Error("Not found Bearer token", "InvalidToken", 400));

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "key");

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      throw new Error("Invalid ID format", "InvalidID", 400);
    }

    const user = await Users.findById(decoded.id).select("-password");
    if (!user) {
      next(new Error("Your account has been deleted", "NotFoundData", 500));
    }
    // if (!user.isAdmin) {
    //   next(new Error("No permission, you are not an admin", "NotAdmin", 403));
    // }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
