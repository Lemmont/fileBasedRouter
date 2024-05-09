import { Request, Response } from "express";
import userModel from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const getUsersController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      //get users from db
      const users = await userModel.find();

      // pass as response
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

export default getUsersController;
