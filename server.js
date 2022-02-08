
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = express.Router();
const url = 'mongodb://127.0.0.1:27017/AlienDB'
const alienRouter= require('./routes/aliens')
const alienmodel = require('./models/alien')

const app = express();

app.use(bodyParser.urlencoded({

    extended: true
}))

app.use(bodyParser.json())

app.use('/aliens' , alienRouter)                      //import alienRouter

mongoose.Promise = global.Promise;


//connecting to the db

mongoose.connect(url, {

    useNewUrlParser : true,
    useUnifiedTopology: true
})


const db = mongoose.connection
    db.on("error" , (err) =>{
        console.error(err)
        console.log("MongoDB connection error");
        process.exit(1)
    })
    db.once("open", ()=>{
        console.log("Mongodb is connected")
    })


app.get('/' , (req,res) =>{
    res.json({"message": "welcome to the page"})
})

app.listen(3000, (req,res) =>{
    console.log('listening to the port 3000');
})