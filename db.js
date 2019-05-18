const mongoose = require('mongoose');

//For Coloring Console Text
require('colors')

mongoose.connect(process.env.DB_URL || 'mongodb+srv://rakib:@tlas1011210249@cluster0-7k4sx.mongodb.net/test?retryWrites=true'  , {useNewUrlParser: true})
        .then(d=>{
         console.log('database Connected'.bgBlue.bold);
        })
        .catch(e=>{
        console.log(`${e}`.bgRed.bold);
        })
