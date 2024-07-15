import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    googleId: { type: String, default: null }, // Add this line
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function() { return !this.googleId; } }, // Conditional required
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: String, default: "active" },
    phoneNumber: { type: String, required: false },
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
