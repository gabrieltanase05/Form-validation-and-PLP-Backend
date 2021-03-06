// Imports
import express from 'express';
import cors from 'cors';
const productsPath = './data/products.json';
const regExPath = './data/regEx.json';
import fs from 'fs';

// App config
const app = express();
const router = express.Router();
app.use( '/api', router)
app.use(cors());

//API Products
router.get('/products', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'Cache-Control', 'max-age=31536000');
    fs.readFile(productsPath, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(JSON.parse(data))
        }
    })
})
//API for form validation regEx
router.get('/regEx', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*', 'Cache-Control', 'max-age=31536000');
    fs.readFile(regExPath, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(JSON.parse(data))
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


//Listening Server on ENV PORT or 8080
app.listen(process.env.PORT || 8080, () => console.log("Server listening on port 8080"))


