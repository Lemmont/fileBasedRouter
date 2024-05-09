import { Request, Response } from "express";
import userModel from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const updateUserController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      //get body
      const { name, email, phone, password } = req.body;
      const id = req.params.id;
      //check body
      const user = await userModel.findById(id);

      if (!user) {
        res.status(404).json({ message: "User Not Found" });
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        {
          name: name,
          email: email,
          phone: phone,
          password: password, // to be hashed
        },
        { new: true }
      );
      res.status(200).json({ updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

export default updateUserController;
