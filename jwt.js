// ---------Requires---------------
const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// console.log(process.env.DB_LINK)

// ---Execution---
const app = express();

// -----MiddleWares-----
app.use(cors());
app.use(express.json());

// -------Secret Key-------
const secret_key = process.env.SECRET_KEY;


// ---------DB Connection Start---------

mongoose.connect(process.env.DB_LINK)

mongoose.connection.on('error', (error) => {
    console.log(error);
})
mongoose.connection.once('connected', () => {
    console.log('Database Connected');
})

// ----------------DB Connection End-----

// ----------------Schema Start----------

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

// ----------------Schema End-------------

// ----------------Model Start------------

const userModel = new mongoose.model('jwt_users', userSchema)

// ----------------Model End------------


app.get('/', (req, res) => {
    try {
        res.status(200).send('My Server !')
    } catch {
        res.status(404).send("Error Occurred")
    }
})

app.post('/signUp', async (req, res) => {
    // is mein 1 masla hai k 2 martba query horhi hai DB pr Password ki wja se q k mujhe mongoose ka unique:true nhi chahiye. To is ka sir se poochna hai k koi or tareeqa hai k 1 hi query mein ho jaye?
    try {
        if (req.body.userName && req.body.password) {
            const userName_output = await userModel.findOne({ userName: req.body.userName });
            const password_output = await userModel.findOne({ password: req.body.password });
            // console.log(output);
            if (userName_output !== null) {
                if (userName_output.password === req.body.password) {
                    res.status(409).send('User Already Exist');
                } else {
                    res.status(409).send('User Already Exist');
                }
            } else if (password_output !== null) {
                res.status(409).send('User already Exist');
            } else {
                const newUser = new userModel({
                    userName: req.body.userName,
                    password: req.body.password
                });
                let saveOutput = await newUser.save();
                console.log(saveOutput);
                const token = jwt.sign({ id: saveOutput._id, userName: saveOutput.userName, password: saveOutput.password }, secret_key);
                res.status(200).json({
                    token,
                    saveOutput,
                    msg: 'You have Signed in Successfully'
                });
            }
        } else {
            res.status(404).send('Data Not Received');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/login', async (req, res) => {
    try {
        if (req.body.userName && req.body.password) {
            const output = await userModel.findOne({ userName: req.body.userName })
            if (!output) {
                res.status(401).send('Username not found')
            } else if (output.password !== req.body.password) {
                res.status(409).send('Incorrect password')
            } else {
                const token = jwt.sign({ id: output._id, userName: output.userName, password: output.password }, secret_key);
                res.status(200).json({
                    output,
                    token,
                    msg: 'You have logged in successfully'
                })
            }
        } else {
            res.status(400).send('Username and password are required')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
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
    try {
        if (req.headers['x-access-token']) {
            const token = req.headers['x-access-token'];
            try {
                const decoded = jwt.verify(token, secret_key)
                if (decoded) {
                    console.log(decoded)
                    next()
                } else {
                    res.status(498).send('Invalid Token')
                }
            } catch {
                res.status(498).send('Invalid token')
            }
        } else {
            res.status(401).send("Token Missing")
        }
    }
    catch {
        res.status(404).send('Error Occurred')
    }
}




const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server started at Port "${port}"`)
})



// || req.body.password = userModel.find({password:req.body.password})



// Login if else statement with Filter

// app.post('/login', async (req, res) => {
//     try {
//         if (req.body.userName && req.body.password) {
//             const output = await userModel.find({})
//             // console.log(output)
//             let arrOutput = output.filter((item) => {
//                 if (item.userName === req.body.userName) {
//                     return true; // include the item in the filtered array
//                 } else {
//                     return false; // exclude the item from the filtered array
//                 }
//             });
//             console.log(arrOutput)
//             if (arrOutput.length === 0) {
//                 res.status(401).send('Username not Found')
//             } else {
//                 if (req.body.password == arrOutput[0].password) {
//                     res.status(200).json({
//                         arrOutput,
//                         output,
//                         msg: 'You have Logged in Successfully'
//                     })
//                 } else {
//                     res.status(409).send('Username or Password Incorrect')
//                 }
//             }

//         } else {
//             res.status(404).send('Data Not Recieved')
//         }
//     } catch {
//         res.status(408).send('Catch Error Occurred')
//     }
// })