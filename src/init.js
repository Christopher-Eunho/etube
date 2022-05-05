// Initializes and starts app 
import "regenerator-runtime"; 
import "dotenv/config"; // = require('dotenv').config()
import app from "./server";
import "./db"; // this executes all the codes in ./db.js
import "./models/Video"; // this lets the db know the model Video
import "./models/User"; // this lets the db know the model Video

const PORT = process.env.PORT || 9000; // process.env.PORT works only in heroku. APp uses 9000 when it's local. process.env.PORT uses whatever port heroku gives 

const handleListening = () => {
    console.log(`🌟 Server listening on port http://localhost:${PORT} 🌟`);
}
app.listen(PORT, handleListening)
