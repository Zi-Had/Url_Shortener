  const express = require('express') ;
  const app     = express() ;
  const PORT    = process.env.PORT || 4000 ;
  const expressEjsLayouts = require('express-ejs-layouts')
  const expressValidator = require('express-validator')
  const session = require('express-session') ;
  const cookieParser = require('cookie-parser')
  const flash = require('connect-flash')
  const User = require('./Models/User')
  const passport = require('passport')
  const morgan = require('morgan')


  //Database
  require('./db')
  //For Coloring Line
  require('colors')
  //Process.env 
  require('dotenv').config()

  require('./passport/passport')

  //Dev
  app.use(morgan('dev'))
  //Session
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  }))
  //Cookie
  app.use(cookieParser())
  //Passport
  app.use(passport.initialize())
  app.use(passport.session())
  
  app.use(flash())
  //Middlewares
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(express.static(__dirname + '/public'))
  app.use(expressEjsLayouts)
  app.use(expressValidator())


  app.use(async(req,res,next) =>{
    app.locals.errors = req.flash('errors')
    app.locals.error = req.flash('error')
    app.locals.success_msg = req.flash('success_msg')
    app.locals.isAuthenticated = req.isAuthenticated()
    app.locals.authenticatedUser = req.user 

    // req.isAuthenticated = req.session.authUserId ? true:false
    // if(req.session.authUserId){
    //   const user = await User.findById(req.session.authUserId)
    //   // req.user = user ;
    //   
    // }
    next()
  })
  //Ejs setup
  app.set('view engine', 'ejs')

  //Global Variable
  app.locals.appName='Node Shortener'


//Auth Routes
  const authRoutes = require('./routes/auth');
  const shortenerRoutes = require('./routes/shortener');

  app.use('/auth',authRoutes)
  app.use('/',shortenerRoutes)

  app.get('/logout',(req,res)=>{
   req.logOut()
   res.send('logout')
})

  app.get('/get',(req,res)=>{
      res.json(req.user)
  })

  app.listen(PORT , ()=>{
      console.log(`Server Is Running On ${PORT}`.bgGreen.bold)
  })