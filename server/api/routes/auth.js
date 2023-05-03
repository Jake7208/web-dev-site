const Admin = require('../../models/userModel');
const catchAsync = require('../../utils/catchAsync')
const express = require("express");
const { json } = require("body-parser");
const router = express.Router();

exports.signup = catchAsync(async (req, res, next) => {
    const newAdmin = await Admin.create(req.body);

    res.status(201).json({
        status: 'success',
        data: newAdmin
    })
})
