const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
console.log(process.env.DB_LINK)
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    try {
        res.status(200).send('My Server !')
    } catch {
        res.status(404).send("Error Occurred")
    }
})

app.post('/signUp', (req, res) => {
    console.log(req.body)
    try {
        if (req.body.userName && req.body.password) {
            res.status(200).send('Signed Up');
        } else {
            res.status(404).send('Data Not Reacieved');
        }
    } catch {
        res.status(404).send('Not Found');
    }

})

app.post('/login',(req,res)=>{
    console.log(req.body)
    try{
        if(req.body.userName && req.body.password){
            // if(req.body.userName = ) 'Condition likhni hai jis ke liye mongo db lagani pare gi
            res.status(200).send('You have Logged in Successfully')
        }else{
            res.status(404).send('Data Not Recieved')
        }
    }catch{
        res.status(404).send('Error Occurred')
    }
})

app.get('/shirtProducts', validation, (req, res) => {
    try {
        console.log(req.headers)
        res.status(200).send('Response of Shirts !')
    } catch {
        res.status(404).send("Error Occurred")
    }
})

function validation(req, res, next) {
    // try {
    if (req.headers['x-access-token']) {
        next()

    } else {
        res.status(404).send("Data Not Received")
    }
    // }
    // catch {
    //     res.status(404).send('Error Occurred')
    // }
}




const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server started at Port "${port}"`)
})