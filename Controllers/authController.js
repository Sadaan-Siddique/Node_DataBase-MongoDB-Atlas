const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const secret_key = '123321'
const token = jwt.sign({name:'Sadaan'},secret_key)
 
router.use(express.json());

router.get('/products',(req,res)=>{
    console.log(token);
    res.status(200).send('This is Produts');

})

router.get('/cans',(req,res)=>{
    res.status(200).send('This is Cans');
})






module.exports = router