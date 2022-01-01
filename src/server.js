import express from "express"; // const express = require("express"); written in babel
import morgan from "morgan";  // morgan is a logger middleware
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev"); // "dev" is a config option

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views")
app.use(logger); //Global middleware
app.use(express.urlencoded({extended : true}));

app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

const handleListening = () => {
    console.log(`🌟 Server listening on port http://localhost:${PORT} 🌟`);
}
app.listen(4000, handleListening)