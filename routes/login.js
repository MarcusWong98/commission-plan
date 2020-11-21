const route = require('express')();

const User = require('../models/user');

const bcrypt = require('bcrypt');
const passport = require('passport');
const auth = require('../functions/authienticate');

route.get('/login' ,auth.checkNotAuthenticate ,(req,res)=>{
    res.render('login', {
        data: {
            onLogin: true
        }
    });
})


// route.post('/login', async (req, res) => {
//     if('username' in req.body){

//         const user = await user.findOne({
//             username: req.body.username,
//             password: req.body.password
//         });

//         const hashedPassword = await bcrypt.compare(user.password, req.body.password);

//         console.log(req.body.password);

//         console.log(hashedPassword);

//         res.redirect('/');

//         console.log(req.body);

//         return;

//     };
// })

route.post('/login', auth.checkNotAuthenticate,passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
}))

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect('/')
//     }
//     next()
// }
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}

module.exports = route;