// if ?redirect=true is included as a header, then this will redirect to home or last current page
const redirect = (req, res, next) => {
    if(req.query.redirect){
        return res.redirect(req.session.current_url || "/");
    }
    next();
}

module.exports = redirect;