const express = require('express') ;
const app     = express() ;
const PORT    = 3000 ;
const hbs     = require("express-handlebars") ;
//Middleware
app.use(express.urlencoded({extended: true}))

//Template Engine
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', '.hbs')

// Route
app.get('/',(req,res)=>{
    //Param , Query , Body [We Can Use This KeyWords]

    //Without Template Engine 
    // res.send(
    //     `<form action="/" method="post">
    //        <input   name="name" placeholder="Name">
    //        <input  name="age" placeholder="Age">
    //        <button>Submit</button>
    //   </form>
    //     `)

    //With Template Engine (Render)
    res.render('index',{
        name:"Rakib"
    })
})
app.post("/",(req,res)=>{
    res.send('My Name Is ' + req.body.name 
    +  " And My Age Is "+ req.body.age )
})


app.listen(PORT , ()=>{
    console.log(`Server Is Running On ${PORT}`)
})