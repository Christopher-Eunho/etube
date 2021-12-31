export const trending = (req, res) => {
    return res.render("home", {pageTitle : "Home"});
}


export const watch = (req, res) => {
    const id = req.params.id;
    return res.send(`<h1>watch video #${id}<h1>`)
}

export const edit = (req, res) => {
    return res.send("<h1>edit video<h1>")
}

export const remove = (req, res) => {
    return res.send("<h1>remove video<h1>")
}