const test = require('./test2')
test.funcFive()

const jwt = require('jsonwebtoken');

const secret_key = '123321'
const token = jwt.sign({ username: 'Sadaan' }, secret_key)
console.log(token)