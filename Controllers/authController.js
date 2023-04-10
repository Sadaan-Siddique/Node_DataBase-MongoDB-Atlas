const express = require('express')
const router = express.Router();

router.use(express.json());

router.get('/products',(req,res)=>{
    res.status(200).send('This is Produts');
})

router.get('/cans',(req,res)=>{
    res.status(200).send('This is Cans');
})



module.exports = router