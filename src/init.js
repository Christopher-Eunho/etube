// Initializes and starts app 
import "dotenv/config"; // = require('dotenv').config()
import app from "./server";
import "./db"; // this executes all the codes in ./db.js
import "./models/Video"; // this lets the db know the model Video
import "./models/User"; // this lets the db know the model Video

const PORT = 9000;

const handleListening = () => {
    console.log(`🌟 Server listening on port http://localhost:${PORT} 🌟`);
}
app.listen(PORT, handleListening)
