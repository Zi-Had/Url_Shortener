const Router = require('express').Router();
const {createUser}  = require('../controllers/authController')

 Router.get('/login',(req,res)=>{
    res.render('auth/login')
})
 Router.get('/register',(req,res)=>{
    res.render('auth/register')
 })
 Router.post("/register", createUser)



module.exports = Router ;