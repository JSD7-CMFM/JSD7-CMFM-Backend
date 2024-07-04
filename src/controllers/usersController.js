import userService from "../services/usersServices.js";

const getUsers = async (req, res, next) => {
  try {
    const data = await userService.getAllUsers();
    res.status(200).json({ message: "Get All Users", data: data });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({ message: "Get User By ID", data: user });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userService.createUser(data);
    res.status(201).json({ message: "Create User", data: user });
  } catch (error) {
    next(error);
  }
};

// // API - 14 Delete User By ID (Soft Delete)
// const deleteUserById = async (req, res, next) => {
//   res.send("DELETE /api/users/:id");
// };

export { getUsers, getUserById, createUser };
