import mongoose from "mongoose";

const URL = process.env.DB_URL 

mongoose.connect(URL);


const db = mongoose.connection;

const handleOpen = () => console.log("⭐Connected to DB⭐")
const handleError = (e) => console.log("DB Error: ", e);

db.on("error", handleError);
db.once("open", handleOpen);
