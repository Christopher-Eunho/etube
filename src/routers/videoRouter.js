import express from "express";
import { handleHome, watch, remove, getEdit, postEdit, getUpload, postUpload } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/", handleHome);
videoRouter.get("/:id(\\d+)", watch);

videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

videoRouter.get("/:id(\\d+)/remove", remove);

export default videoRouter;