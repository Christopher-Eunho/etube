import express from "express";

import { handleHome } from "../controllers/videoController";



const globalRouter = express.Router();

globalRouter.get("/", handleHome);

export default globalRouter;
