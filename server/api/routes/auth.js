const express = require("express");
const Admin = require('../../models/userModel');
const router = express.Router();

router.post("/signUp", (async (req, res, next) => {
    try{
        const newAdmin = await Admin.create(req.body);
    
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
}))

module.exports = router; // connecting to the router on the index.js file.
