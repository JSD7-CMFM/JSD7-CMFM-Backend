import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    status: { type: String, default: "active" },
    phoneNumber: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    address: {
      address: { type: String, default: "" },
      province: { type: String, default: "" },
      country: { type: String, default: "" },
      zipcode: { type: String, default: "" },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
export const Users = mongoose.model("Users", usersSchema, "users");
