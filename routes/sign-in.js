const route = require('express').Router();

const bcrypt = require('bcrypt');

const User = require('../models/user');
const auth = require('../functions/authienticate');

route.get('/sign-in',auth.checkNotAuthenticate ,(req,res) =>{
    res.render('sign-in',{
        data: {
            onLogin: false
        }
    });
})

route.post('/sign-in', auth.checkNotAuthenticate,async (req, res) =>{

    try{
        
        const user = await User.findOne({name: req.body.username});

        
        if(user != null){

            res.render('sign-in',{
                data:{
                    errMsg: 'Already in use'
                }
            });

        }else{

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            
            let newUser = await new User({
                name: req.body.username,
                password: hashedPassword
            })
    
            console.log(req.body);
        
            await newUser.save();
        
            console.log(newUser);
            
            res.redirect('login');
        }
        
    }catch(e){
        console.log(e);
    }
    

    
});

module.exports = route;

