const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const express = require("express");
const Admin = require('../../models/userModel');
const AppError = require('../../utils/appError');
const router = express.Router();

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
});
}


//  do not deploy this this is for admin use only.
router.post("/newAdmin", async (req, res, next) => {
    try{
        const newAdmin = await Admin.create({
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        const token = signToken(newAdmin._id);
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
            httpOnly: true
        } 
        if(process.env.NODE_ENV === 'production') cookieOptions.secure = true
        res.cookie('jwt', token, cookieOptions)
        // remove password from output
        newAdmin.password = undefined

        res.status(201).json({
            status: 'success',
            data: newAdmin
        })
    } catch (err) {
        res.status(400).json ({
          status: 'fail',
          data: err
        })
    }
})



router.post("/login", async(req, res, next) => {
    try {
        const { email, password } = req.body;
    
        // 1) check if email and password exist
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
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
            httpOnly: true
        }
        if(process.env.NODE_ENV !== 'development') cookieOptions.secure = true
        res.cookie('jwt', token, cookieOptions)

        res.status(200).json ({
            status: 'success',
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
        if(!token) {
            return next (
                new AppError('Unauthorized please login to gain access', 401)
            )
        }
        // 2) verification token
       const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
       console.log(decoded);

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
