const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://rakib:@tlas1011210249@cluster0-7k4sx.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
        .then(d=>{
         console.log('database Connected ..');
        })
        .catch(e=>{
                console.log(e);
        })