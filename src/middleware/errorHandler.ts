import { Request, Response } from "express";
import { CONSTANTS } from "../constants.js";

const errorHandler = (err, req: Request, res: Response, next) => {
  const statuscode = res.statusCode ? res.statusCode : 500;

  switch (statuscode) {
    case CONSTANTS.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });

    case CONSTANTS.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case CONSTANTS.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    case CONSTANTS.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stack,
      });

    case CONSTANTS.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
      console.log("No error");
      break;
  }
};

export default errorHandler;
