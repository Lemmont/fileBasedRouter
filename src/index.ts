import http from "http";
import path from "path";
import express from "express";
import body from "body-parser";
import userHandler from "./routes/user.js";
import fileHandler from "./routes/files.js";
import connectDb from "./db/db.js";
import errorHandler from "./middleware/errorHandler.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

async function start() {
  try {
    const port = 3030;
    const app = express();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    //connectDb();

    app.get("/", (req, res) => {
      res.send(
        "<div><h1>NodeJs-TypeScript-Express</h1><h2>API-routes:</h2><ul><li>/user</li><li>/user/:id</li></ul></div>"
      );
    });

    // parse into json middleware (req.body)
    app.use(
      body.json({
        limit: "500kb",
      })
    );

    app.use(errorHandler);

    app.use("/users", userHandler);

    // possible middleware to exclude any other file then .html par example
    app.use("/files", express.static(__dirname + "/public"));

    // start server
    app.listen(port, () => {
      console.log(`Listening to server: http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
