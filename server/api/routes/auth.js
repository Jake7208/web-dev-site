const jwt = require('jsonwebtoken')
const express = require("express");
const Admin = require('../../models/userModel');
const router = express.Router();

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
});
}

router.post("/newAdmin", (async (req, res, next) => {
    try{
        const newAdmin = await Admin.create({
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        }
        );
        const token = signToken(newAdmin._id)
        res.status(201).json({
            status: 'success',
            token,
            data: newAdmin
        })
    } catch (err) {
        res.status(400).json ({
          status: 'fail',
          data: err
        })
    }
}))

router.post("/login", async(req, res, next) => {
    try {
        const { email, password } = req.body;
    
        // 1) check if email and password exsist
        if(!email || !password) {
            return res.status(400).json({
                status: 'fail',
                data: 'please provide an email and password'
            })
        }
        // 2) check if the user exists && if password is correct
        const admin = await Admin.findOne({ email }).select('+password')

        if(!admin || !( await admin.correctPassword(password, admin.password))) {
            return res.status(401).json({
                status: 'fail',
                data: 'Incorrect email or password'
            })
        }
        // 3) If everything ok, send token to client
        const token = signToken(admin._id);
        res.status(200).json ({
            status: 'success',
            token
        })
    } catch (err) {
        res.status(400).json ({
          status: 'fail',
          data: err
    })
}
})

router.protect = async (req, res, next) =>  {
    try{
        
        //  1) getting token and check if it's there
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }
        // 2) verification token
        jwt.verify(token, process.env.JWT_SECRET)
        if(!token) {
            return next(res.status(401).json({
                status: 'fail',
                data: 'Unauthorized please login to gain access'
            }))
        }

        // 3) check if user still exist
    
        // 4) check if user changed password after the token was issued
        next()
    } catch (err) {
        res.status(400).json ({
          status: 'fail',
          data: err
    })
}
}
module.exports = router; // connecting to the router on the index.js file.
