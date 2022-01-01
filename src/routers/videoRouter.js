import express from "express";
import { handleHome, watch, remove, getEdit, postEdit } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/", handleHome);
videoRouter.get("/upload", handleHome);
videoRouter.get("/:id(\\d+)", watch);

videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

videoRouter.get("/:id(\\d+)/remove", remove);

export default videoRouter;