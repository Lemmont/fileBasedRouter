import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUserController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // check body
      if (!email) {
        res.status(300).json({ message: "Email is required!" });
      }
      if (!password) {
        res.status(300).json({ message: "Password is required!" });
      }

      // check if user exists
      const user = await userModel.findOne({ email });

      if (!user) {
        res.status(401).json({ message: "Email or password not valid" });
      }

      // check password
      const validPassword = await bycrypt.compareSync(password, user.password);

      // login
      if (user && validPassword) {
        const accestoken = jwt.sign(
          {
            user: {
              name: user.name,
              email: user.email,
              id: user.id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "10m" }
        );
        res
          .status(200)
          .json({ message: `Logged in as ${user.name}`, accestoken });
      } else {
        res.status(401).json({ message: `Email or password not valid` });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
);

export default loginUserController;
