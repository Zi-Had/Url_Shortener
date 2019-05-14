const mongoose = require('mongoose');

//For Coloring Console Text
require('colors')

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
        .then(d=>{
         console.log('database Connected'.random);
        })
        .catch(e=>{
        console.log(`${e}`.red);
        })
