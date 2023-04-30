const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function funcOne() {
    console.log('Function One');
}
function funcTwo() {
    console.log('Function Two')
}
const funcThree = () => {
    console.log('Function Three')
}
const funcFour = () => {
    console.log('Function Four')
}
const funcFive = () => {
    console.log('Function Five')
}
const jwt_token = () => {
    // const token = jwt.sign({ userName: 'Yasir', password: '098890' }, secret_key, { expiresIn: '1h' })
    console.log('jwt_token');

    console.log('DB Start');
    //         DB Connection Start
    mongoose.connect('mongodb+srv://Sadaan:dbdb1@cluster0.qq2alg8.mongodb.net/Sadaan_DataBase');

    mongoose.connection.on('error', (error) => {
        console.log(error);
    })
    mongoose.connection.once('connected', () => {
        console.log('Database Connected');
    })
    //         DB Connection End

    //         Schema Start
    const userSchema = new mongoose.Schema({
        userName: {
            type: String
        },
        password: {
            type: String
        }
    })
    //         Schema End

    //         Model Start
    const userModel = new mongoose.model('jwt_users', userSchema);
    //         Model End
    console.log('DB End');
}
let obj = {
    funcOne,
    funcTwo,
    funcThree,
    funcFour,
    funcFive,
    jwt_token
}


module.exports = obj;