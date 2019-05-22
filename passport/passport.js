const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const User = require('../Models/User')
const bcrypt = require('bcryptjs')

passport.use(
    new passportLocal(async(username,password,done)=>{
        const user = await User.findOne({username})
        
        if(!user)
           return done(null,false,{message:'User Not Found'})
        
           if(bcrypt.compareSync(password,user.password)){
               done(null,user)
           }else{
               done(null,false,{message:"Password does'nt match"})
           }
    })

)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id)
    done(null,user)
    
})