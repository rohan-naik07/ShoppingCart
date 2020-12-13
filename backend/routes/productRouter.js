
const mongoose = require('mongoose');
const Products = require('../models/product');
const express = require('express');
const bodyParser = require('body-parser');
const productRouter = express.Router();
const { verifyToken } = require('../routes/auth')

productRouter.use(bodyParser.json());

productRouter.route('/')
.get(
    async function (req,res,next){
        try{
            const products = await Products.find(req.body);
            console.log(products);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        } catch (err){
            next(err);
        }  
    }
)
.post( verifyToken,
    function (req, res,next){
            Products.create(req.body).then(products=>{
                console.log(products);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(products);
            },error=>next(error)
        ).catch(err=>next(err))
    }
).put(verifyToken,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported');
}).delete( verifyToken,
    (req,res,next)=>{
       Products.remove(req.body).then(products=>{
            console.log(products);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
            },error=>next(error)
        ).catch(err=>next(err))
    }
);

productRouter.route('/:productId')
.get(
    async function (req,res,next){
        try{
            const product = await Products.findbyId(req.params.productId);
            console.log(product);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        } catch (err){
            next(err);
        }  
    }
).post( verifyToken,
    (req,res,next)=>{
        res.statusCode = 403;
        res.end('POST operation not supported');
    }
)
.put( verifyToken,
    function (req, res,next){
        const productId = req.params.productId;
        Products.findByIdAndUpdate(
            productId,
            {$set : req.body},
            {new : true}
        ).then(products=>{
            console.log(products);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        },error=>next(error)
        ).catch(err=>next(err))
    }
)
.delete( verifyToken,
    function (req, res,next){
        const productId = req.params.productId;
        Products.findByIdAndDelete(
            productId
        ).then(products=>{
            console.log(products);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        },error=>next(error)
        ).catch(err=>next(err))
    }
);

module.exports = productRouter;