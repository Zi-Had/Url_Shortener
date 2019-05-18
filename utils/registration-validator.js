// const User = require('../Models/User')

// module.exports = async (req)=>{
//     //Name Is required 
//     if(req.body.name.length === 0){
//         req.check('name','Name is required').custom( () => false )
//     //Name Shoul be atleast 3 character
//     }else{
//         req.check('name','Name should be atleast 3 character').isLength({
//             min:3
//         })
//     }
//     //username Is required 
//     if(req.body.username.length === 0){
//         req.check('username','Username is required').custom( () => false )
//     //userame Shoul be atleast 6 character
//     }else{
//         req.check('username','Username should be atleast 6 character').isLength({
//             min:6
//         })
//     }
//     const existUserName = await User.findOne({username:req.body.username})
//     //Username Exist
//     if(existUserName){
//         req.check('username',`${req.body.username} is already taken`).custom(()=>false)
//     }
    
//     // Email Required
//     if(req.body.email.length === 0){
//         req.check('email','Email is required').custom(()=>false)
//     }else {
//         req.check('email', 'Email is not valid').isEmail() 
//     }

//     //Email exist
//     const existEmail = await User.findOne({email:req.body.email})
//     if(existEmail){
//          req.check('email',`Email is already exist`).custom(()=>false)
            
//     }
    

//     //password

//     if (req.body.password.length === 0) {
//         req.check('password', 'Password is required').custom(() => false)
//     } else if (req.body.password.length < 6) {
//         req.check('password', 'Password should be atleast 6 character').custom(() => false)
//     } else {
//         req.check('password', "Password doesn't matched").equals(req.body.confirm_password)
//     }
// }