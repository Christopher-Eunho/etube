import express from "express";
import { getJoin, postJoin } from "../controllers/userController";

import { getHome, searchVideo } from "../controllers/videoController";



const rootRouter = express.Router();

rootRouter.get("/", getHome);
rootRouter.get("/search", searchVideo);
rootRouter.route("/join").get(getJoin).post(postJoin);


export default rootRouter;
