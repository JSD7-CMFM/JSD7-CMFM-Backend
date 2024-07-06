import jwt from "jsonwebtoken";
import { Users } from "../models/usersModel.js";
import { mongoose } from "mongoose";

const authenticate = async (req, res, next) => {
  const hardcodedtoken =
    "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGdlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ0cmd2OFptZkM1cnh2TmF4L1Iva1YuSjhnYjg3L1l1T3J4eklWNjdVUHZLMldHbnM3SmROMiIsImlzQWRtaW4iOmZhbHNlLCJfaWQiOiI2Njg4MTYzZmFiN2QyZTQ3ZGM0ZWU2YzYiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNy0wNVQxNTo1MDoyMy4wNDhaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDctMDVUMTU6NTA6MjMuMDQ4WiIsIl9fdiI6MCwiaWF0IjoxNzIwMTk0NjIzLCJleHAiOjE3MjAyODEwMjN9.STH8ujPJDS5mke33hDhW3vDfRVPQ8UXUCNW7baRPjX9_uaY3an054xjRgxWblvtb";
  try {
    // if (!req?.headers?.authorization) {
    //   throw new Error(
    //     "No permission, invalid token please create an account",
    //     "InvalidToken",
    //     401
    //   );
    // }

    // const authorization = req.headers?.authorization.startsWith("Bearer")
    //   ? req.headers.authorization
    //   : next(new Error("Not found Bearer token", "InvalidToken", 400));

    // const token = authorization.split(" ")[1]
    //   ? authorization.split(" ")[1]
    //   : next(new Error("Not found Bearer token", "InvalidToken", 400));

    const decoded = jwt.verify(
      hardcodedtoken,
      process.env.JWT_SECRET_KEY || "key"
    );

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      throw new Error("Invalid ID format", "InvalidID", 400);
    }

    const user = await Users.findById(decoded.id).select("-password");
    if (!user) {
      next(new Error("Your account has been deleted", "NotFoundData", 500));
    }

    if (!user.isAdmin) {
      next(new Error("No permission, you are not an admin", "NotAdmin", 403));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
