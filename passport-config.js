const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');


async function initialize(passport, getUserByName, getUserbyID){

    const autheticateUser = async (username, password, done) => {
        const user = await getUserByName(username);

        // console.log(password,user.password);
        if(user == null){
            return done(null,false, {message: 'No User'});
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }else{
                return done(null, false, {message: 'Password Incorrect'});
            }
        }catch(e){
            done(e);
        }
        
    }

    passport.use(new LocalStrategy({usernameField: 'username'},autheticateUser))
    passport.serializeUser((user, done) => {
        // console.log('serializing' + ' ' + user.id);
        
        done(null, user.id);
    })
    passport.deserializeUser(async (id, done) => {
        const user = await getUserbyID(id);

        console.log('ID:' + id);
        done(null, user);
    })
}

module.exports = initialize;