import express from "express";
import { getJoin, postJoin, getLogin, postLogin, getLogout } from "../controllers/userController";

import { getHome, searchVideo } from "../controllers/videoController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";



const rootRouter = express.Router();

rootRouter.get("/", getHome);
rootRouter.get("/search", searchVideo);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/logout", protectorMiddleware,getLogout);


export default rootRouter;
