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

//            Schema Start
const userSchema = new mongoose.Schema({
    userName: String,
    password: String
})
const userProducts = new mongoose.Schema({
    name: String,
    price: Number,
    rating: Number,
    review: String,
})
//            Schema End

//              Model Start
const userModel = new mongoose.model('Users', userSchema);

const productModel = new mongoose.model('Products', userProducts)
//              Model End 

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Server has been Started' });

})
app.post('/create_user', async (req, res) => {
    const myUser = new userModel({
        userName: req.body.userName,
        password: req.body.password,
    })
    const output = await myUser.save()
    console.log(output)
    res.send(output)
})

app.post('/create_product', async (req, res) => {
    const myProducts = new productModel({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        review: req.body.review
    })
    const output = await myProducts.save();
    console.log(output)
    res.send(output)
})


let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is started at port ${port}`)
})

// new mongoose.model('myUsers',new mongoose.Schema({
//     userName : String,
//     password : String
// }))