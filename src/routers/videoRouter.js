import express from "express";
import { trending, watch, remove, edit } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/", trending);
videoRouter.get("/upload", trending);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/remove", remove);

export default videoRouter;