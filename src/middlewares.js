import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

/* Uncomment this code when uploading using AWS S3
const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
})

const multerUploader =  multerS3({
    s3: s3,
    bucket: 'etube2022'})

// multer config
export const avatarUpload = multer({ 
    dest: "uploads/avatars",
    limits: {
        fileSize: 2000000
    },
    storage: multerUploader});

export const videoUpload = multer({ 
    dest: "uploads/videos",
    limits: {
        fileSize: 10000000
    },
    storage: multerUploader}); 


*/


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

export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
      fileSize: 3000000,
    },
  });
  
export const videoUpload = multer({
dest: "uploads/videos/",
limits: {
    fileSize: 10000000,
},
});