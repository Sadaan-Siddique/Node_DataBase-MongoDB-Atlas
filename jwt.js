const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();


app.get('/', (req, res) => {
    try {
        res.status(200).send('My Server !')
    } catch {
        res.status(404).send("Error Occurred")
    }
})

app.post('/shirtProducts', validation, (req, res) => {
    try {
        res.status(200).send('Response of Shirts !')
    } catch {
        res.status(404).send("Error Occurred")
    }
})

function validation(req, res, next) {
    try {
        next()
    }
    catch {
        res.status(404).send('Validation Error')
    }
}




const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server started at Port "${port}"`)
})