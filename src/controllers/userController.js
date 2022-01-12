


export const editProfile = (req, res) => {
    return res.send("<h1>Edit Profile<h1>");
}

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "Create Account"});
}

export const postJoin = (req, res) => {
    console.log(req.body);
    return res.redirect("/");
}