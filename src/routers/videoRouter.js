import express from "express";
import { getHome, watch, deleteVideo, getEdit, postEdit, getUpload, postUpload, searchVideo } from "../controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); // [0-9a-f]{24} : regex for mongoDB hexa id pattern 

videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);


videoRouter.route("/upload").get(getUpload).post(postUpload);




export default videoRouter;