const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Sadaan:dbdb1@cluster0.qq2alg8.mongodb.net/Sadaan_DataBase')
mongoose.connection.on('error',(error)=>{
    console.log(error)
})
mongoose.connection.once('connected',()=>{
    console.log('Database Connected');
})








let port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is started at port ${port}`)
})