import express from "express";
import { userController } from "../controllers/user"
export const user = express();


user.get('', userController.user);
user.post("/signin", userController.signin)
user.post("/signup", userController.signup)