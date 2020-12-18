var express = require('express');
var authRouter = express.Router();
const jwt = require("jsonwebtoken");
const Users = require('../models/user');
const bcrypt = require("bcrypt");
const config = require("../config");

authRouter.post('/login', async (req,res,next)=>{
    try{
        let user = await Users.findOne({ email: req.body.email });
        if (!user)
            return res.json({
                error: true,
                message: "Invalid Email ID",
            });
        console.log({
            given : req.body.password,
            stored : user.password
        })
        const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
        ); 
        if (!validatePassword)
            return res.json({
                error: true,
                message: "Invalid Password",
            });
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email
            },
            config.JWT_SECRET_KEY
            );
        res.status(200).json({ error: false, token: token });
    } catch(error) {
        res.json({
            error: true,
            message: "Error while logging in, Try Again Later.",
          });
    }
});

authRouter.post('/signup',async (req,res,next)=>{
    try{
        let user = await Users.findOne({ email: req.body.email });
        if (user)
          return res
            .status(400)
            .json({ error: true, message: "User Already Registered" });
    
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        user = await Users.create({
            email : req.body.email,
            password : password
        });
        res.status(200).json({
            error: false,
            message: "User Registered Successfully",
        });
    } catch(error) {
        console.log(error)
        res.json({
            error: true,
            message: "Error while creating New User, Try Again Later.",
        });
    }
})



const verifyToken = (req,res,next)=>{
    const header = req.headers['authorization'];
    if(typeof header!=='undefined') {
        const bearer = header.split(' ');
        const token = bearer[0];
        console.log(header)
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
        res.end('Unauthorized');
    }
}

module.exports = {
    authRouter: authRouter,
    verifyToken : verifyToken
}

/**
 * {
    "error": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRiOTExM2E0NmZiMDRmODQ3YzYwMzYiLCJlbWFpbCI6ImVycGV3ZkBnbWFpbC5jb20iLCJpYXQiOjE2MDgyMjUyNTh9.5mz1Q3oRuQ655dPVb-kg5Tsw5IrsKszPSW5tqktdUrQ"
}
 */