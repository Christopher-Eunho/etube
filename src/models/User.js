import bcrypt from "bcrypt"; // Hashing tool for passwords
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type : String, required: true, unique: true},
    username: { type : String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    location: String,
});

// Hash the password before saving User. This refers to User model. 
userSchema.pre('save', async function(){
    console.log("User Password", this.password);
    this.password = await bcrypt.hash(this.password, 5);// 5 how many hashing we want to do
    console.log("User Password", this.password);
})

const User = mongoose.model("User", userSchema);
export default User;