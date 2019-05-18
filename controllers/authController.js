const User   = require('../Models/User')
const bcrypt = require('bcryptjs')

module.exports.loginUser = async(req,res)=>{
  
   if(req.body.username.length === 0){
    req.check('username','Username is required').custom( () => false )

    }else{
       const fetchedUser = await User.findOne({username:req.body.username})
       if(!fetchedUser){
        req.check('username','User Not Found !').custom(()=>false)
       }
       if(fetchedUser){
          const passwordMatched =  bcrypt.compareSync(req.body.password , fetchedUser.password)

          req.session.authUserId = fetchedUser._id

          if(passwordMatched){
            req.flash('success_msg','You Have Logged In Successfully')
          }else{
            req.check('password',`password Doesn't match !`).custom(()=>false)
          }
          


       if(req.validationErrors()) req.flash('errors' , req.validationErrors()) ;
    }
    res.redirect('back')
    
    
    }
}

module.exports.logoutUser = (req,res) => {
    req.session.authUserId = null ;
    req.session.user = null ;
    req.flash('seccess_msg', 'You Have Logged Out Successfully')

    res.redirect('/auth/login')

}

module.exports.createUser = async (req,res)=>{
    
    //Name Is required 
    if(req.body.name.length === 0){
        req.check('name','Name is required').custom( () => false )
    //Name Shoul be atleast 3 character
    }else{
        req.check('name','Name should be atleast 3 character').isLength({
            min:3
        })
    }
    //username Is required 
    if(req.body.username.length === 0){
        req.check('username','Username is required').custom( () => false )
    //userame Shoul be atleast 6 character
    }else{
        req.check('username','Username should be atleast 6 character').isLength({
            min:6
        })
    }
    const existUserName = await User.findOne({username:req.body.username})
    //Username Exist
    if(existUserName){
        req.check('username',`${req.body.username} is already taken`).custom(()=>false)
    }

    // Email Required
    const {email} = req.body ;
    if (email.length === 0) {
        req.check("email", "Email is required").custom(() => false);
    }else if(email.length >0){
        req.check("email", "Email is not Valid").isEmail();
    }else {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
        req.check("email", "Email Is Already Exist").custom(() => false);
        }
    }
    

    //password

    if (req.body.password.length === 0) {
        req.check('password', 'Password is required').custom(() => false)
    } else if (req.body.password.length < 6) {
        req.check('password', 'Password should be atleast 6 character').custom(() => false)
    } else {
        req.check('password', "Password doesn't matched").equals(req.body.confirm_password)
    }

    //Error validation + data 
    if(!req.validationErrors()){
        let {name,username,email,password} = req.body ;

            password = bcrypt.hashSync(password,10)

            const user = new User({name,username,email,password})
            try {
                const newuser = await user.save()
                if (newuser) {
                    // res.json({
                    //     message:"User Created Successfully"
                    // })
                    req.flash('success_msg' ,'You Have Registred Successfully !')

                    res.redirect('/auth/login')
                }
            } catch (err) {

            }
    }else{
        req.flash('errors' , req.validationErrors()) 
    }
    res.redirect('back')
    
    //Testing
        // const user = new User(req.body)
        // user.save()
        //     .then(data=>{
        //         res.json({
        //             msg:"User Created Successfully",
        //             data
        //         })
        //     })
        //     .catch(e=>{
        //         console.log(e);        
        //     })
        
}