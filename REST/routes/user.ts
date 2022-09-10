import express from "express";
import { userController } from "../controllers/user"
export const user = express();


user.get('', userController.user);