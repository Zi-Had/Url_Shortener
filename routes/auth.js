const Router = require('express').Router();
const ifUserNotLoggedIn = require('../middlewares/ifUserNotLoggedIn')
const ifUserLoggedIn = require('../middlewares/ifUserLoggedIn')


const {createUser,loginUser,logoutUser}  = require('../controllers/authController')

 Router.get('/login',ifUserNotLoggedIn,(req,res)=>{
    res.render('auth/login',{title:"Login"})
})
 Router.get('/register',ifUserNotLoggedIn,(req,res)=>{
    res.render('auth/register',{title:"Register"})
 })
 Router.get('/settings',ifUserLoggedIn,(req,res)=>{
   res.render('auth/settings',{title:"Update Profile"})
})
 Router.post("/register", createUser)
 Router.post("/login", loginUser)
 Router.get("/logout", logoutUser)


module.exports = Router ;