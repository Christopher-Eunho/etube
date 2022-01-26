import multer from "multer";
// sets res.locals which is automatically transferred to view page(Pug)
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Etube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
};

// protects users not logged from access
export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/login")
    }
}

// protects loggedin user from access
export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
}
// multer config
export const avatarUpload = multer({ 
    dest: "uploads/avatars",
    limits: {
        fileSize: 2000000
    }});

export const videoUpload = multer({ 
    dest: "uploads/videos",
    limits: {
        fileSize: 10000000
    }}); 