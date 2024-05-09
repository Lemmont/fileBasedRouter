import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import bycrypt from "bcrypt";

const registerUserController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, email, phone, password } = req.body;

      // check body
      if (!name) {
        res.status(300).json({ message: "Name is required!" });
      }

      if (!email) {
        res.status(300).json({ message: "Email is required!" });
      }

      if (!phone) {
        res.status(300).json({ message: "Phone number is required!" });
      }

      if (!password) {
        res.status(300).json({ message: "Password is required!" });
      }

      // check if user has already been registered based on email
      const userAvailable = await userModel.findOne({ email });

      if (userAvailable) {
        res.status(400).json({ message: "User already registered" });
      }

      // hash password (possibly async)
      const hashedPassword = await bycrypt.hash(password, 10);

      // create user in database
      const user = await userModel.create({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword, // to be hashed
      });

      res.status(200).json({ message: `User ${name} registered`, user });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

export default registerUserController;
