import User from "../models/User";
import bcrypt from "bcrypt"; 

export const editProfile = (req, res) => {
    return res.send("<h1>Edit Profile<h1>");
}

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "Create Account"});
}
 
export const postJoin = async(req, res) => {
    const {name, email, username, password, password2, location} = req.body;
    
    if(password !== password2) {
        return res.status(400).render('join',
         {pageTitle: "Create Account",
          errorMessage: "Passwords do not match"})
    }

    if(await User.exists({username})) {
        return res.status(400).render('join',
         {pageTitle: "Create Account",
          errorMessage: "Username already exists."});
    }

    if(await User.exists({email})) {
        return res.status(400).render('join',
         {pageTitle: "Create Account",
          errorMessage: "email already exists. "})
    }

    
    await User.create({
        name,
        username,
        email,
        password,
        location
    });
    return res.redirect("/");
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle: "Login"});
}

export const postLogin = async (req, res) => {
    const pageTitle = "Login"
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).render('login',
         {pageTitle,
          errorMessage: "Username does not exist."});
    }

    // compare the hashes so that user password is not exposed
    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        return res.status(400).render('login',
        {pageTitle,
         errorMessage: "Incorrect Passowrd"});
    }

    return res.redirect("/");
}