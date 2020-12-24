const mongoose = require('mongoose');
const express = require('express');
const Reviews = require('../models/review');
const bodyParser = require('body-parser');
const reviewRouter = express.Router();
const { verifyToken } = require('../routes/auth')

reviewRouter.use(bodyParser.json());

reviewRouter.route('/')
.get( 
    function(req,res,next){
        Reviews.find({}).then(reviews=>{
            console.log(reviews)
            res.status(200)
            .setHeader('Content-Type','application/json')
            res.json(reviews)
        },(error)=>{
            console.log(error);
            next(error);
        })
         .catch((error)=>{
             console.log(error);
             next(error);
        })
    }
).post(verifyToken,
    function(req,res,next){
        res.statusCode = 403;
        res.end('POST operation not supported');
    }
).put(verifyToken,
    function(req,res,next){
        res.statusCode = 403;
        res.end('POST operation not supported');
    }
).delete(verifyToken,
    function(req,res,next){
        res.statusCode = 403;
        res.end('POST operation not supported');
    }
)

reviewRouter.route('/:productId')
.get(
    function(req,res,next){
        Reviews.find({
            productId : req.params.productId
        }).then(reviews=>{
            console.log(reviews)
            if(reviews.length===0){
                res.status(404)
                .setHeader('Content-Type','application/json')
                return res.json({
                    error: true,
                    message: "No Reviews",
                });
            }
            res.status(200).setHeader('Content-Type','application/json')
            res.json(reviews)
        },(error)=>{
            console.log(error);
            next(error);
        })
         .catch((error)=>{
             console.log(error);
             next(error);
        })
    }
).post(verifyToken,
    function(req,res,next){
        const review = req.body;
       Reviews.create({
           ...review,
           productId : req.params.productId
       }).then(reviews=>{
        console.log(reviews);
        res.status(200)
        .setHeader('Content-Type','application/json')
        res.json(reviews)
       },(error)=>{
        console.log(error);
        next(error);
    })
     .catch((error)=>{
         console.log(error);
         next(error);
    })
    }
).put(verifyToken,
    function(req,res,next){
        res.statusCode = 403;
        res.end('POST operation not supported');
    }
).delete(verifyToken,
    function(req,res,next){
        res.statusCode = 403;
        res.end('POST operation not supported');
    }
)

reviewRouter.route('/:productId/:userId')
.get(
    function(req,res,next){
        Reviews.find({
            userId : req.params.userId
        }).then(reviews=>{
            res.status(200)
            .setHeader('Content-Type','application/json')
            res.send(reviews)
        },(error)=>{
            console.log(error);
            next(error);
        })
         .catch((error)=>{
             console.log(error);
             next(error);
        }) 
    }
).post(
    verifyToken,
    function(req,res,next){
        res.statusCode = 403;
        res.end('POST operation not supported');
    }
).put(
    verifyToken,
    function(req,res,next){
        Reviews.findByIdAndUpdate(
            req.params.reviewId,
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
).delete(
    verifyToken,
    function(req,res,next){
        Reviews.findByIdAndDelete(
            req.params.reviewId
        ).then(products=>{
            console.log(products);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        },error=>next(error)
        ).catch(err=>next(err))
    }
)

module.exports = reviewRouter;