import { Request, Response } from "express";
import userModel from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const deleteUserController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await userModel.findById(id);

      if (!user) {
        res.status(404).json({ message: "User Not Found" });
      }

      const deletedUser = await userModel.findByIdAndDelete(id);
      res.status(200).json({ deletedUser });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

export default deleteUserController;
