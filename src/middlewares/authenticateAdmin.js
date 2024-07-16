const authenticateAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.headers.source === "checkOut") {
      next();
    } else {
      throw new Error("Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

export default authenticateAdmin;
