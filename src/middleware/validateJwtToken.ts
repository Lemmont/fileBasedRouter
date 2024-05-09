import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export interface JwtRequest extends Request {
  user: {
    name: string;
    email: string;
    id: string;
  };
}

const validateJwtToken = expressAsyncHandler(
  async (req: JwtRequest, res: Response, next) => {
    let token: string;
    let authHeader =
      req.headers.authorization || (req.headers.Authorization as string);

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Unauthorized" });
        }

        req.user = decoded.user;
        next();
      });
      if (!token) {
        res.status(401).json({ message: "Unauthorized or token is missing " });
      }
    } else {
      res.status(401).json({ message: "Unauthorized or token is missing " });
    }
  }
);

export default validateJwtToken;
