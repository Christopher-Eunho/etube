import User from "../models/User";
import bcrypt from "bcrypt"; 
import fetch from "node-fetch";

export const getEdit = (req, res) => {
    return res.render("editProfile", {pageTitle: "Edit Profile"});
}

export const postEdit = async (req, res) => {
    const { session: {user: {_id: id,
                            email: currentEmail,
                            username: currentUsername,
                            avatarUrl}},
            body : {name, email, username, location},
            file} = req;
    
    console.log(file);
    

    if(currentEmail !== email && await User.exists({email})){
            return res.status(400).render('editProfile',
             {pageTitle: "Edit Profile",
              errorMessage: "email already exists. "})
    }

    if(currentUsername !== username && await User.exists({username})){
        return res.status(400).render('editProfile',
         {pageTitle: "Edit Profile",
          errorMessage: "username already exists. "})
    }

    const updatedUser = await User.findByIdAndUpdate(id, 
        {name,
        email,
        username,
        location,
        avatarUrl: file? file.path : avatarUrl},
        {new: true});

    req.session.user = updatedUser;

    return res.redirect("/");
}

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "Create Account"});
}  
 
export const postJoin = async (req, res) => {
    console.log(req);
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
    return res.redirect("/login");
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

    if(user.socialOnly) {
        return res.status(400).render('login',
         {pageTitle,
          errorMessage: `${username} is signed up with only social account. User social login.`});
    }

    // compare the hashes so that user password is not exposed
    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        return res.status(400).render('login',
        {pageTitle,
         errorMessage: "Incorrect Passowrd"});
    }

    // Save login info on the current session i.e. have user login
    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
}

export const getLogout = (req, res, next) => {
    req.session.destroy();
    return res.redirect("/");
}


// Set config of authentication option and redirect user to url with the config as params
export const startGithubLogin = (req, res) => {
    const baseURL = "https://github.com/login/oauth/authorize"
     
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email"
    };

    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;
    return res.redirect(finalURL);

} 

/* Once user approved to use github authentication, they will be sent back to app 
    with the code. This function gets access token with the code,
    takes user data from github with access token, and process the data.
*/
export const finishGithubLogin = async (req, res) => {
    const baseURL = "https://github.com/login/oauth/access_token";
   
    // req.query.code is recieved when directed to this route by Github
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };


    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`;

    // recieve access token and transform it to json form
    const tokenData = await ( 
        await fetch(finalURL, {
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    })).json();
    
    // retrieve user data and email data from Github api with access token
    if ("access_token" in tokenData) {
        const { access_token } = tokenData;
        const apiUrl = "https://api.github.com";
        
        let userData;
        let emailData;
        // user data
        try{
            userData = await (
                await fetch(`${apiUrl}/user`, {
                  headers: {
                    Authorization: `token ${access_token}`,
                  },
                })
              ).json();
        } catch(err) {
            console.log("error: ", err);
        };

        // email data
        try{
            emailData = await (
                await fetch(`${apiUrl}/user/emails`, {
                  headers: {
                    Authorization: `token ${access_token}`,
                  },
                })
              ).json();
        } catch(err) {
            console.log("error: ", err);
        };

        const email = emailData.find(
            (email) => email.primary && email.verified
        ).email;
        
        let user = await User.findOne({email});
        
        
        if(!user) {
            try{
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email,
                password: "",
                socialOnly: true,
                location: userData.location
            });
        } catch(err) {
            console.log("error: ", err)
        }
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        } else {
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/login");
        }
    }
}

export const getChangePw = async (req, res) => {
    return res.render("changePw", {pageTitle: "Change Password"});
}

export const postChangePw = async (req, res) => {
    const { session: {user: _id},
            body : {
            oldPassword,
            newPassword,
            newPasswordConfirm
            }} = req;

    const user = await User.findById(_id)
    
    // old pw check
    
    const oldMatch = await bcrypt.compare(oldPassword, user.password );

    if(!oldMatch) {
        return res.status(400).render('changePw',
        {pageTitle: "Change Password",
        errorMessage: "Incorrect old passowrd"});
    }
    // new == confirm check
    
    if(newPassword !== newPasswordConfirm) {
        return res.status(400).render('changePw',
        {pageTitle: "Change Password",
        errorMessage: "New passowrds do not match"});
    }

    // old == new check

    if(newPassword == oldPassword) {
        return res.status(400).render('changePw',
        {pageTitle: "Change Password",
        errorMessage: "Can not change to the same passowrd "});
    }
  
    // change password
    user.password = newPassword;
    await user.save();

    // clean sesesion
    req.session.destroy();
    
    // send user to login
    return res.redirect("/login");

}

export const getProfile = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate("videos");

    if(!user) {
        return res.status(404).render("404", {pageTitle: "User Not Found"});
    }

    return res.render("profile", {pageTitle: `${user.name}'s Profile`, user})

}