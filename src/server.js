import express from "express"; // const express = require("express"); written in babel
import morgan from "morgan";  // morgan is a logger middleware
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev"); // "dev" is a config option

app.use(logger); //Global middleware

const handleListening = () => {
    console.log(`🌟 Server listening on port http://localhost:${PORT} 🌟`);
}

app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

app.listen(4000, handleListening)