const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path:'./.env'}) 
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json()) 
const router = require('./routes/index');
app.use('/api/v1',router)

const port = 3001

try {
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database connected");
    })
} catch (error) {
    console.log(error);
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

