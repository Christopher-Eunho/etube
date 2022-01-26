import User from "../models/User";
import Video from "../models/Video";

const fakeUser = {
    name : "Chris",
    loggedIn : false
}

 
export const getHome = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt: "desc"});
    return res.render("home", {pageTitle : "Home", fakeUser, videos});
}

export const watch = async (req, res) => {
    try{
        const { id } = req.params;
        const video = await Video.findById(id).populate("owner");

        if(!video){
            return res.render("404", {pageTitle : "Video Not Found", fakeUser});
        }
        return res.render("watch", {pageTitle : video.title, video })
    } catch(err) {
        console.log(err);
        return res.redirect("/"); // return to home if there's an error
    }
    
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const { user:{_id}} = req.session;

    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle : "Video Not Found"});
    }
    // prevents(from backend side) users from deleting videos that are not theirs
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    
    return res.render("editVideo", {pageTitle : "Editing " + video.title, fakeUser, video })
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    
    if(!Video.exists({id_:id})){
        return res.status(404).render("404", {pageTitle : "Video Not Found"});
    }

    await Video.findByIdAndUpdate(id,{
        title,
        description,
        hashtags: Video.formatHashtags(hashtags)
    });

    return res.redirect(`/video/${id}`);
}

export const getUpload = (req, res) => {
    
    return res.render("upload", {pageTitle : "Upload Video"})

}

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const {path:fileUrl} = req.file;
    const {session: {user: {_id: owner}}} = req;
    try {
        const newVideo = await Video.create({
            title,
            fileUrl,
            description,
            hashtags: Video.formatHashtags(hashtags),
            owner
        }) // creates a new video data and save it to the db

        const user = await User.findById(owner);
        user.videos.push(newVideo._id);
        user.save();
    return res.redirect("/");
    } catch(err) {
        return res.status(404).render("/upload", {
            pageTitle: "Upload Video",
            fakeUser,
            errorMessage: err._message
        })
    }
     
}

export const searchVideo = async (req, res) => {
    let videos = [];
    const {keyword} = req.query;
    if(keyword) {
        videos = await Video.find({
            title : {
                $regex: new RegExp(`${keyword}$`, "i")
            }
        })
    }

    return res.render("search", {pageTitle: "Search Video", fakeUser, videos})
}


export const deleteVideo = async (req, res) => {
    const { user:{_id: userId}} = req.session;
    const {id} = req.params;

    if(!Video.exists({id_:id})){
        return res.status(404).render("404", {pageTitle : "Video Not Found"});
    }

    const video = await Video.findById(id);
    
    // Prevents non-owners from deleting the video
    if(String(video.owner) !== String(userId)){
        return res.status(403).redirect("/");
    }
    
    // delete video from videos
    await Video.findByIdAndDelete(id);
    
    // delete video from the owner's video arrays
    const user = await User.findById(userId);
    user.videos.splice(user.videos.indexOf(id),1);
    user.save();
    
    
    return res.redirect("/");
}
