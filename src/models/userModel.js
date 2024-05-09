import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add name"] },
    email: {
      type: String,
      required: [true, "Please add your email address"],
      unique: [true, "Email address already taken"],
    },
    phone: { type: String, required: [true, "Please add phone number"] },
    password: {
      type: String,
      required: [true, "Please add a password"]
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
