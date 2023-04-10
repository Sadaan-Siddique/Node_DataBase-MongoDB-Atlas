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
let obj = {
    funcOne,
    funcTwo,
    funcThree,
    funcFour,
    funcFive
}


module.exports = obj;