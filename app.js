if(process.env.NODE_ENV === 'production'){
    require('dotenv').load();
}
const stripeSecretKey = process.env.stripeSecretKey;
const stripePublicKey = process.env.stripePublicKey;
const stripe = require('stripe');

const express = require('express');

const mongoose = require('mongoose');

const initializePassport = require('./passport-config');

const passport = require('passport');

const app = express();

const bodyParser = require('body-parser');

const User = require('./models/user.js');

const userRoute = require('./routes/userRoute.js');

const signInRoute = require('./routes/sign-in.js');

const loginRoute = require('./routes/login.js');

const flash = require('express-flash');
const session = require('express-session');

initializePassport(
    passport, 
    async username => {
        const user = await User.findOne({name: username});

        
        return user;
    },
    async id => {
        const user = await User.findById(id);

        return user;
    }
);

app.use(flash());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}))


app.use(passport.initialize());

app.use(passport.session());

// mongoose.connect('mongodb+srv://user:19980906aB@cluster0-epyeo.mongodb.net/Commission-plan?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })
mongoose.connect('mongodb+srv://user:19980906aB@cluster0-epyeo.mongodb.net/<dbname>?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connection.once('open',()=>{
    console.log('Connected to database');
}).on('error',(e)=>{
    console.log('Connection error');
})

// app.locals.test = () => {
//     const div = document.createElement('div');
//     div.innerHTML = 'testing';
//     document.body.append(div);
// }

app.use(bodyParser.urlencoded({extended : false}))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.use('/' , userRoute);

app.use('/' , signInRoute);

app.use('/' , loginRoute);

app.listen(4000);

const gen = post => {
    const letter = 
    `Dear,

        It's Marcus. I am interested in ${post}. Here's my resume below. Please let me know if I am suitable.

Best Regards`
    console.log(letter);
}

gen('Software Engineer');