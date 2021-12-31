import express from "express"; // const express = require("express"); written in babel
import morgan from "morgan";  // morgan is a logger middleware

const PORT = 4000;

const app = express();
const logger = morgan("dev"); // "dev" is a config option

app.use(logger); //Global middleware

const handleHome = (req, res) => {
    return res.send("<h1>I rock tom ford<h1>")
}

const hnadleVideoWatch = (req, res) => {
    return res.send("<h1>watch video<h1>")
}

const handleUserEdit = (req, res) => {
    return res.send("<h1>Edit User<h1>")
}

const handleListening = () => {
    console.log(`🌟 Server listening on port http://localhost:${PORT} 🌟`);
}

const globalRouter = express.Router();
globalRouter.get("/", handleHome);

const userRouter = express.Router();
userRouter.get("/edit", handleUserEdit);

const videoRouter = express.Router();
videoRouter.get("/watch", hnadleVideoWatch);

app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);





app.listen(4000, handleListening)