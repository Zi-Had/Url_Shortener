const express = require('express') ;
const app     = express() ;
const PORT    = process.env.PORT || 4000 ;
const expressEjsLayouts = require('express-ejs-layouts')
const expressValidator = require('express-validator')
const session = require('express-session') ;
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
//Database
require('./db')
//For Coloring Line
require('colors')
//Process.env 
require('dotenv').config()

//Session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}))
//Cookie
app.use(cookieParser())

app.use(flash())
//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(expressEjsLayouts)
app.use(expressValidator())


app.use((req,res,next) =>{
  app.locals.errors = req.flash('errors')
  app.locals.success_msg = req.flash('success_msg')

  next()
})
//Ejs setup
app.set('view engine', 'ejs')

//Global Variable
app.locals.appName='Node Shortener'



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