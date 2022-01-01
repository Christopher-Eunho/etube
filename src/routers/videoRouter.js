import express from "express";
import { handleHome, watch, remove, edit } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/", handleHome);
videoRouter.get("/upload", handleHome);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/remove", remove);

export default videoRouter;