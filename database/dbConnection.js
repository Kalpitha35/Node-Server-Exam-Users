const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING
mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas Connection Successfully with Server");
    
}).catch(err=>{
    console.log("MongoDB Atlas Connection Failed!!!");
    console.log(err);
})