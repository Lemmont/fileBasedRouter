import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

const getUserController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const user = await userModel.findById(id);

      if (!user) {
        res.status(404).json({ message: "Not Found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

export default getUserController;
