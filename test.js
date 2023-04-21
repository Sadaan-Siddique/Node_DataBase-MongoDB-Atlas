const test = require('./test2')
test.funcFive()
require('dotenv').config();
console.log(process.env.SECRET_KEY)

const jwt = require('jsonwebtoken');

// const secret_key = '123321'
// const token = jwt.sign({ username: 'Sadaan' }, secret_key)
// console.log(token)
    
// const secret_key = process.env.DB_LINK;
const secret_key =process.env.SECRET_KEY;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhZGFhbiIsImlhdCI6MTY4MTE1MDczNn0.E5-1X-ZcBkQVDIDmHQ-Zna-e5HVKtUhh0jWFHSz81lo'
const decoded = jwt.verify(token, secret_key)
console.log(decoded)