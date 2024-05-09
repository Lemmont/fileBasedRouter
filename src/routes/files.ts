import express, { Request, Response } from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// router.get("/", function (req: Request, res: Response) {
//   res.sendFile(path.join(__dirname, "../public/" + "index.html"));
// });

// router.get("/:file", function (req: Request, res: Response) {
//   const file = req.params.file;
//   // check file for extension
//   let extension = "";
//   let name: string;
//   const file_splitted = file.split(".");
//   if (file_splitted.length > 1) {
//     extension = "." + file_splitted[1];
//     name = file_splitted[0];
//   } else {
//     name = file_splitted[0];
//     extension = ".html"; // to be changed
//   }

//   const path_to_file = path.join(__dirname, "../public/" + name + extension);
//   if (fs.existsSync(path_to_file)) {
//     res.sendFile(path.join(__dirname, "../public/" + "global.css"));
//     res.sendFile(path_to_file);
//   } else {
//     res.status(404).json({ message: `${name}.html not found` });
//   }
// });

export default router;
