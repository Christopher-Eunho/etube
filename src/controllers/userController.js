import User from "../models/User";


export const editProfile = (req, res) => {
    return res.send("<h1>Edit Profile<h1>");
}

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "Create Account"});
}
 
export const postJoin = async(req, res) => {
    const {name, email, username, password, password2, location} = req.body;
    
    if(password !== password2) {
        return res.render('join',
         {pageTitle: "Create Account",
          errorMessage: "Passwords do not match"})
    }

    if(await User.exists({username})) {
        return res.render('join',
         {pageTitle: "Create Account",
          errorMessage: "Username already exists."});
    }

    if(await User.exists({email})) {
        return res.render('join',
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
    return res.redirect("/login");
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle: "Login Page"});
}

export const postLogin = (req, res) => {
    return req.redirect("/");
}