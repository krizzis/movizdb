module.exports = (req, res, next) => {
    if (!req.session.user){
        return res.redirect('/auth/login');
    }
    else if (req.session.user.isAdmin != 1) {
        return res.redirect('/');
    }
    next();
}