const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

const authRoutes = require('./Controllers/authController')

const app = express();
// console.log(authRoutes);
app.use('/auth', authRoutes);

require('dotenv').config();
console.log(process.env.DB_LINK)


app.use(cors());
app.use(express.json());

//        Connection Start

mongoose.connect(process.env.DB_LINK)

mongoose.connection.on('error', (error) => {
    console.log(error)
})
mongoose.connection.once('connected', () => {
    console.log('Database Connected');
})

//        Connection End

//            Schema Start
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
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


app.post('/create_product', async (req, res) => {
    const myProducts = new productModel({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        review: req.body.review
    })
    const output = await myProducts.save();
    console.log(output)
    res.json(output)
})
app.get('/get_product', async (req, res) => {
    const output = await productModel.find({ price: 25 })
    console.log(output);
    res.status(200).send(output)
})
app.get('/get_conditional_product', async (req, res) => {
    const output = await productModel.find({ rating: 6.7 }).where('price').gt(20).lt(30)
    // console.log(output)
    try {
        res.status(200).json(output);
    } catch {
        res.status(500).send('Error Occurred');
    }
})
app.get('/get_pagination_products', async (req, res) => {
    const output = await productModel.find({}).limit(5);
    // console.log(output)
    res.json({ msg: 'Getting Paginating Products', output: output });
})
app.get('/get_skipping_pagination_products', async (req, res) => {
    const output = await productModel.find({}).skip(5).limit(4);
    // console.log(output)
    res.json({ msg: 'Getting Skipping Paginating Products', output: output });
})
// app.get('/update_product', async (req, res) => {
//     const output = await productModel.find({ price: 25 })
//     console.log(typeof (output));
//     // let new_output = output.map((item)=>{return(item.rating = 5.0)})
//     // for (let i = 0; i < output.length; i++) {
//     //     output[i].rating == 9.8;
//     // }
//     // let new_output = output[output.length].review;
//     output.rating = 5.8;
//     console.log(output)
//     res.status(200).json({ output, msg: 'Update Product' });
// })
app.get('/update_product', async (req, res) => {
    const output = await productModel.findOne({ price: 70 })
    try {
        output.name = 'Alkaram'
        const new_output = await output.save()
        console.log(new_output)
        res.send('updating a product')
    } catch {
        res.status(500).send('Error Occurred')
    }
})
app.get('/update_products', async (req, res) => {
    await productModel.updateMany({}, { $set: { rating: 6.7 } })
        .then(result => {
            console.log(result);
            res.status(200).send('Updating Product');
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error Updating Product');
        });
});


app.post('/create_user', async (req, res) => {
    const myUser = new userModel({
        userName: req.body.userName,
        password: req.body.password,
    })
    try {
        const output = await myUser.save()
        console.log(output)
        res.status(200).json(output)
    } catch {
        res.status(400).send("Error Occurred")
    }
})
app.get('/get_user', async (req, res) => {
    const output = await userModel.findOne({ userName: 'Sadaan' })
    // let newOutput = output.filter((item) => { return (item.userName === 'Habib') })
    console.log(output)
    res.status(200).json(output)
})
app.get('/update_user', async (req, res) => {
    const output = await userModel.findOne({ userName: req.body.userName })
    output.password = 'Mera password';
    let new_output = await output.save();
    console.log(output);
    res.status(200).json(new_output);
})
app.post('/delete_user', async (req, res) => {
    const output = await userModel.deleteMany({ password: req.body.password })
    console.log(output);
    res.status(200).send('Delete_User')
})




let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is started at port ${port}`)
})

// new mongoose.model('myUsers',new mongoose.Schema({
//     userName : String,
//     password : String
// }))