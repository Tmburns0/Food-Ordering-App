import express from "express";
import { createCurrentUser } from "../controllers/MyUserController";

const userRouter = express.Router();


userRouter.post("/", createCurrentUser);

export default userRouter;
