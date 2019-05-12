const express = require('express') ;
const app     = express() ;
const PORT    = process.env.PORT || 4000 ;
const expressEjsLayouts = require('express-ejs-layouts')
const expressValidator = require('express-validator')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(expressEjsLayouts)
app.use(expressValidator())

//Ejs setup
app.set('view engine', 'ejs')

//Global Variable
app.locals.appName='Node Shortener'

//Process.env 
require('dotenv').config()

//Database
require('./db')

const authRoutes = require('./routes/auth');
app.use('/auth',authRoutes)

app.listen(PORT , ()=>{
    console.log(`Server Is Running On ${PORT}`)
})