import express from "express";
import { getEdit, postEdit, startGithubLogin, finishGithubLogin,
         getChangePw, postChangePw, getProfile } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";


const userRouter = express.Router();
userRouter.get("/edit", protectorMiddleware, getEdit);
userRouter.route("/edit")
        .all(protectorMiddleware)
        .get(getEdit)
        .post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePw).post(postChangePw);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", getProfile);

 
export default userRouter;