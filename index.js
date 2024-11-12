//steps to defin express

require('dotenv').config()
const cors = require('cors')
const express = require('express')
const router = require('./routes/router')
require('./database/dbConnection')

const userServer = express()

userServer.use(cors())
userServer.use(express.json())
userServer.use(router)

const PORT = 4000 || process.env.PORT

 

userServer.listen(PORT,()=>{
    console.log(`userDetailServer started at port ${PORT} and waitimg for response !!`);
    
})

userServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">userDetailServer started at port and waiting for cilent request!!<h1/>`)
})

// userDetailServer.post('/',(req,res)=>{
//     res.status(200).send("POST REQUEST")
// })