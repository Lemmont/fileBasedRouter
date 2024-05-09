import express from "express";
import getUsersController from "../controllers/getUsersController.js";
import createUserController from "../controllers/createUserController.js";
import getUserController from "../controllers/getUserController.js";
import updateUserController from "../controllers/updateUserController.js";
import deleteUserController from "../controllers/deleteUserController.js";
import registerUserController from "../controllers/registerUserController.js";
import loginUserController from "../controllers/loginUserController.js";
import validateJwtToken from "../middleware/validateJwtToken.js";
import getCurrentUserInfoController from "../controllers/getCurrentUserInfoController.js";

const router = express.Router();

console.log("User route");

// PUBLIC

// register user
router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/current", validateJwtToken, getCurrentUserInfoController);

// PRIVATE/ADMIN

// create user
router.post("/", createUserController);

// get all users in database
router.get("/", getUsersController);

// get one user based on id
router.get("/:id", getUserController);

// update user
router.put("/:id", updateUserController);

// delete user
router.delete("/:id", validateJwtToken, deleteUserController);

export default router;
