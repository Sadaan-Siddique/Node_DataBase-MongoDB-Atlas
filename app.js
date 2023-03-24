const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();

app.use(cors());
app.use(express.json());

//        Connection Start

mongoose.connect('mongodb+srv://Sadaan:dbdb1@cluster0.qq2alg8.mongodb.net/Sadaan_DataBase')

mongoose.connection.on('error', (error) => {
    console.log(error)
})
mongoose.connection.once('connected', () => {
    console.log('Database Connected');
})

//        Connection End

// Schema Start
const userSchema = new mongoose.Schema({
    userName : String,
    password : String
})
// Schema End

// Model Start
const userModel = new mongoose.model('myUsers',userSchema);
// Model End 

app.get('/', (req, res) => {
    res.status(200).json({msg:'Server has been Started'});    

})
app.get('/create',(req,res)=>{
    const myUser = new userModel({
        userName:'Sadaan',
        password:'abc123',
    })
    console.log(myUser);
    res.send('It is Create')
})


let port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is started at port ${ port }`)
})