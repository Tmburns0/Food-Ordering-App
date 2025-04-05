import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const userRouter = express.Router();


userRouter.post("/", jwtCheck, MyUserController.createCurrentUser);
userRouter.put("/", MyUserController.updateCurrentUser);

export default userRouter;
