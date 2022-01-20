import express from "express";
import { getEditProfile, postEditProfile, startGithubLogin, finishGithubLogin } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";


const userRouter = express.Router();
userRouter.get("/edit", protectorMiddleware, getEditProfile);
userRouter.route("/edit").all(protectorMiddleware).get(getEditProfile).post(postEditProfile);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);



export default userRouter;