import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number,
      min: 18
    },
    score: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);