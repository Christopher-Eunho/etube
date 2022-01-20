import express from "express";
import { getHome, watch, deleteVideo, getEdit, postEdit, getUpload, postUpload, searchVideo } from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";


const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); // [0-9a-f]{24} : regex for mongoDB hexa id pattern 

videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);


videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);




export default videoRouter;