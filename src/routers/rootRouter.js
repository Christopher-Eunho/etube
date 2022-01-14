import express from "express";
import { getJoin, postJoin, getLogin, postLogin, getLogout } from "../controllers/userController";

import { getHome, searchVideo } from "../controllers/videoController";



const rootRouter = express.Router();

rootRouter.get("/", getHome);
rootRouter.get("/search", searchVideo);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", getLogout);

export default rootRouter;
