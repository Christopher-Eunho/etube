import express from "express";

import { getHome, searchVideo } from "../controllers/videoController";



const globalRouter = express.Router();

globalRouter.get("/", getHome);
globalRouter.get("/search", searchVideo);
export default globalRouter;
