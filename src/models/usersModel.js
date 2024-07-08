import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    phoneNumber: { type: String },
    status: { type: String , default: "active"},
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Users = mongoose.model("Users", usersSchema, "users");
