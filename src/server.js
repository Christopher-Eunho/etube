// Configure and setup server


import express from "express"; // const express = require("express"); written in babel
import morgan from "morgan";  // morgan is a logger middleware
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();
const logger = morgan("dev"); // "dev" is a config option

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views") // change the location of views from default
app.use(logger); //Global middleware
app.use(express.urlencoded({extended : true})); // parses html form and translate into JS object

app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);


export default app;