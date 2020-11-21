const auth = {
    checkAuthenticate: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/login');
    },

    checkNotAuthenticate: (req, res, next) =>{
        if(req.isAuthenticated()){
            return res.redirect('/');
        }
        next();
    }
}

module.exports = auth;
