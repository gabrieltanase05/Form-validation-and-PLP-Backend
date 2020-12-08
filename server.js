const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsPath = './data/products.json';
const regExPath = './data/regEx.json';

const app = express();
const fs = require('fs');
const port = 8080;
const router = express.Router();
app.use( '/api', router)
app.use(cors());


const server = app.listen(port, (err) => {
    if(err){
        console.error("ERROR: " + err);
    } else {
        console.log("Server listening on port " + port)
    }

})


//API Products-
router.get('/products', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'Cache-Control', 'max-age=31536000');
    fs.readFile(productsPath, (err, data) => {
        if(err){
            console.log("ERROR: " + err);
        } else {
            res.send(JSON.parse(data))
            console.log(JSON.parse(data))

        }
    })
})
//API for form validation regEx
router.get('/regEx', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    fs.readFile(regExPath, (err, data) => {
        if(err){
            console.log("ERROR: " + err);
        } else {
            res.send(JSON.parse(data))
        }
    })
})
//API for infinite scroll, return a specific number of products
router.get('/product/:product_number/amount/:product_amount', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'Cache-Control', 'max-age=31536000');
    fs.readFile(productsPath, (err, data) => {
        const product = parseInt(req.params.product_number) - 1;
        const productAmount = parseInt(req.params.product_amount);
        const results = JSON.parse(data).slice(product * productAmount, (product + 1) * productAmount);
        if (results) {
            setTimeout(() => {
                res.status(200).json(results);
            }, 1000)
        } else {
            res.status(400).json({ msg: 'No products!' });
        }
    })
});

