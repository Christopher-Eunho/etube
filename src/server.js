// Configure and setup server
import express from "express"; // const express = require("express"); written in babel 
import session from "express-session";
import MongoStore from "connect-mongo"; // helps express session to save session info into MongoDB
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
http://expressjs.com/en/resources/middleware/session.html
Session will remember the communication(cookie) b/w server and browser;
creates session id for each browser and sends it to the browser
Browser will save the session id on its cookie and, 
on express, the ids are saved on the server.
Everytime browser sends a request to any url of localhost, 
the browser will send it with the session id.
So, server can identify each browser. 
By setting resave and saveUninitialized false, app saves the session only when it is created and modified
*/
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.DB_URL})
    })
)
 

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);


export default app;