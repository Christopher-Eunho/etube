import bcrypt from "bcrypt"; // Hashing tool for passwords
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type : String, required: true, unique: true},
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false},
    username: { type : String, required: true, unique: true},
    password: {type: String},
    name: {type: String, required: true},
    location: String,
});

// Hash the password before saving User. 'This' refers to User model. 
userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 5);// 5: how many hash we want to do
})

const User = mongoose.model("User", userSchema);
export default User;