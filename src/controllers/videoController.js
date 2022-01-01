const fakeUser = {
    name : "Chris",
    loggedIn : false
}

const fakeVideos = [
    {
    title : "OiOi",
    rating : 4,
    comments : 10,
    createdAt : "2 mins ago",
    views : 234,
    id : 1},
    {
    title : "Cali",
    rating : 3.4,
    comments : 12,
    createdAt : "3 mins ago",
    views : 213,
    id : 2}, 
    {
    title : "Oki",
    rating : 4.4,
    comments : 13,
    createdAt : "4 mins ago",
    views : 2132,
    id : 3}
]

export const handleHome = (req, res) => {
    return res.render("home", {pageTitle : "Home", fakeUser, fakeVideos});
}

export const watch = (req, res) => {
    const { id } = req.params;
    const video = fakeVideos[id - 1];
    return res.render("watch", {pageTitle : video.title, fakeUser })
}

export const edit = (req, res) => {
    return res.send("<h1>edit video<h1>")
}

export const remove = (req, res) => {
    return res.send("<h1>remove video<h1>")
}