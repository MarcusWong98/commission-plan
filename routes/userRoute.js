const route = require('express').Router();

const User = require('../models/user');
const Commission = require('../models/commission');

const auth = require('../functions/authienticate');


route.get('/' ,auth.checkAuthenticate, async (req,res) => {

    console.log('User:' + req.user);
    // const testData = [
    //     {'month' : 'Jan'},
    //     {'month': 'Feb'}
    // ]
    const allUser = await User.find();
    console.log(allUser);
    // if('username' in req.query){

    //     // let testUser = new User({
    //     //     name: req.body.username
    //     // })

    //     console.log(testUser);

    //     res.render('index', {
    //         'data' : {
    //             'username': req.query.username,
    //             'userData': testData
    //         }
    //     })
    //     return;
    // };

    res.render('index',{data: {
        user: req.user,
        allUser: allUser
    }});
});

route.get('/logout', (req,res) => {
    req.logOut();
    console.log('logging out');
    res.redirect('/');
})

route.post('/', async (req, res) =>{

    const allUser = await User.find();

    console.log(req.body);
    if('commission' in req.body){

        const {username, date, profit, commission} = req.body;
        console.log('testing' + date.split('-')[0]);

        let newComission = await new Commission({
            name: username,
            year: date.split('-')[0],
            month: date.split('-')[1],
            profit: profit,
            commission: commission
        })
        newComission = await newComission.save();
        console.log(newComission);
        res.render('index', {
            data: {
                user: req.user,
                allUser: allUser,

            }
        });
        
        return;
    };
    res.render('index', {
        data: {
            user: req.user,
            allUser: allUser
        }
    });
})

// route.post('/createUser', async (req, res) =>{

//     let testUser = new User({
//         name: req.body.username
//     })

//     await testUser.save();

//     console.log(testUser);

//     res.render('index', {
//         data: null
//     });
// })

route.get('/searchUser',auth.checkAuthenticate, async (req, res) => {

    if('username' in req.query){

        const user = await User.findOne({
            name: req.query.username
        });
        

        if(user){

            console.log(user);
            
            let commissionFiles = await Commission.find({
                name: user.name
            })
            
            // console.log(commissionFiles);
            commissionFiles = reorganize(commissionFiles);
            console.log(commissionFiles);
            return res.render('searchUser',{
                        data:{
                            user: user,
                            commissionFiles:commissionFiles
                        }
                    });
        }
            res.render('searchUser',{
                data: {
                    user: null
                }
            });
        
        
    };
    // res.render('searchUser',{
    //     data: null
    // });
});

// route.get('/createUser', (req,res) =>{
//     res.render('createUser',{
//         data: null
//     });
// })

// function checkAuthenticate(req, res, next){
//     console.log(req.session);
//     if(req.isAuthenticated()){
        
//         return next();
//     }
//     console.log(req.isAuthenticated());

//     res.redirect('/login');
// }

function reorganize(arr){
    const obj = {};

    for(let i = 0; i < arr.length; i++){
        // const index = i + 1;
        
        if(!obj[arr[i].year]){
            obj[arr[i].year] = [arr[i]];
            obj[arr[i].year].sort((first,second) => {
                return Number.parseInt(first.month) - Number.parseInt(second.month);
            });
        }else{
            obj[arr[i].year].push(arr[i]);
            obj[arr[i].year].sort((first,second) => {
                return Number.parseInt(first.month) - Number.parseInt(second.month);
            });
        }
    }
    // console.log(obj);

    return obj;

}

module.exports = route;