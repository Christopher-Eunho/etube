// Initializes and starts app 

import app from "./server";
import "./db"; // this executes all the codes in ./db.js
import "./models/Video"; // this lets the db know the model Video


const PORT = 4000;

const handleListening = () => {
    console.log(`🌟 Server listening on port http://localhost:${PORT} 🌟`);
}
app.listen(4000, handleListening)
