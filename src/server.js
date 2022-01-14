// Configure and setup server
import express from "express"; // const express = require("express"); written in babel 
import session from "express-session";
import morgan from "morgan";  // morgan is a logger middleware
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import {localsMiddleware } from "./middlewares";


const app = express();
const logger = morgan("dev"); // "dev" is a config option

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views") // change the location of views from default
app.use(logger); //Global middleware
app.use(express.urlencoded({extended : true})); // parses html form and translate into JS object


/* 
session will remember the communication b/w server and browser
creates session id for each browser and sends it to the browser
browser will save the session id on its cookie, 
on express, the ids are saved on the server.
Everytime browser sends a request to any url of localhost, 
the browser will send it with the session id.
So, server can identify each browser. 
*/
app.use(
    session({
        secret: "Hello!",
        resave: true,
        saveUninitialized: true
    })
)

app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(session);
        next();
    })
})

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);


export default app;