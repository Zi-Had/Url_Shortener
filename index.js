const express = require('express') ;
const app     = express() ;
const PORT    = process.env.PORT || 4000 ;
const expressEjsLayouts = require('express-ejs-layouts')
const expressValidator = require('express-validator')
const session = require('express-session') ;
require('colors')
//Process.env 
require('dotenv').config()
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(expressEjsLayouts)
app.use(expressValidator())

//Ejs setup
app.set('view engine', 'ejs')

//Global Variable
app.locals.appName='Node Shortener'


//Database
require('./db')

const authRoutes = require('./routes/auth');
app.use('/auth',authRoutes)


app.get('/set',(req,res)=>{
req.session.name = req.query.name
res.send('Session Setted')
})
app.get('/get',(req,res)=>{
    res.json(req.session)
})

app.listen(PORT , ()=>{
    console.log(`Server Is Running On ${PORT}`.rainbow)
})