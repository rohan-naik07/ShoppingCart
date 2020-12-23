const mongoose = require('mongoose');
const express = require('express');
const Orders = require('../models/order');
const bodyParser = require('body-parser');
const orderRouter = express.Router();
const { verifyToken } = require('../routes/auth')

orderRouter.use(bodyParser.json());

orderRouter.route('/:userId')
.get( verifyToken,
    function (req, res,next){
        const userId = req.params.userId;
        Orders.find({ userId : userId }).populate({
            path : 'orders',
            populate : {
                path : 'items',
                model : 'Product'
            }
        }).then((orders)=>{
            res.statusCode = 200; 
            res.setHeader('Content-Type','application/json');
            res.json(orders);
        },(error)=>{
            console.log(error);
            next(error);
        })
         .catch((error)=>{
             console.log(error);
             next(error);
        })
    }
)
.post( verifyToken,
    function (req, res,next){
        Orders.find({
            userId : req.params.userId
        }).then((userOrders)=>{
            console.log(userOrders)
            if(userOrders.length===0) {
                Orders.create({
                    userId: req.params.userId,
                    orders : req.body
                }).then((orders)=>{
                    console.log("Order created : " + orders);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(orders);
                },(error)=>{
                    next(error)
                })
                .catch((error)=>{
                    next(error)
                });
            } else {
                userOrders[0].orders.push(req.body);
                userOrders[0].save().then((orders)=>{
                    console.log("Order saved : " + orders);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(orders);
                },(error)=>{
                    next(error)
                })
                .catch((error)=>{
                    next(error)
                });
            }
        })
    }
).delete(verifyToken,(req,res,next)=>{
    Orders.remove({
        userId: req.params.userId
    }).then(()=>{
        res.status(200).send("Orders Deleted");
    },(error)=>{
        next(error)
    })
    .catch((error)=>{
        next(error)
    });
})

module.exports = orderRouter;