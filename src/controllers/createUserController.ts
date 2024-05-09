import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

const createUserController = expressAsyncHandler(
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

      // create user in database
      const user = await userModel.create({
        name: name,
        email: email,
        phone: phone,
        password: password, // to be hashed
      });

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

export default createUserController;
