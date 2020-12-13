const mongoose = require('mongoose');
const Products = require('../models/product');
const express = require('express');
const bodyParser = require('body-parser');
const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
.get(
    function (req, res,next){
        
    }
)
.post(
    function (req, res,next){
        
    }
);

productRouter.route('/:productId')
.put(
    function (req, res,next){
        
    }
)
.delete(
    function (req, res,next){
        
    }
);

module.exports = productRouter;