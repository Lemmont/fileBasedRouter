import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export interface JwtRequest extends Request {
  user: {
    name: string;
    email: string;
    id: string;
  };
}

const getCurrentUserInfoController = expressAsyncHandler(
  async (req: JwtRequest, res: Response) => {
    try {
      const jwtUser = req.user;
      console.log(jwtUser);
      res.status(200).json({ message: "success", jwtUser });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export default getCurrentUserInfoController;
