// sets res.locals which is autometically transferred to view page(Pug)
export const localsMiddleware = (req, res, next) => {
    console.log(req.session);
    res.locals.siteName = "Etube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    next();
};