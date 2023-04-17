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
const jwt_token = () =>{
    const token = jwt.sign({userName:'Yasir',password:'098890'},secret_key,{expiresIn:'1h'})
}
let obj = {
    funcOne,
    funcTwo,
    funcThree,
    funcFour,
    funcFive
}


module.exports = obj;