var express = require('express');
var authRouter = express.Router();
const jwt = require("jsonwebtoken");
const Users = require('../models/user');
const bcrypt = require("bcrypt");
const config = require("../config");

authRouter.post('/login', async (req,res,next)=>{
    try{
        let user = await Users.findOne({ email: req.body.user.email });
        if (!user)
            return res.json({
                error: true,
                message: "Invalid Email ID",
            });
        const validatePassword = await bcrypt.compare(
        req.body.user.password,
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

authRouter.post('/signup',(req,res,next)=>{
    try{
        let user = await User.findOne({ email: req.body.user.email });
        console.log(user);
        if (user)
          return res
            .status(400)
            .json({ error: true, message: "User Already Registered" });
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.user.password, salt);
        user = new User(
            req.body.email,
            password)
        await user.save();
        res.status(200).json({
            error: false,
            message: "User Registered Successfully",
        });
    } catch(error) {
        res.json({
            error: true,
            message: "Error while creating New User, Try Again Later.",
        });
    }
})



const verifyToken = (req,res,user)=>{
    const header = req.headers['authorization'];
    if(typeof header!=='undefined') {
        const bearer = header.split(' ');
        const token = bearer[0];

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