const express = require('express');
const Admin = require("../../models/userModel");
const { protect } = require('./auth');
const router = express.Router();

router.get("/getAll", protect, async (req, res, next) => {
    // getting the AdminRoutes key from the app.js file.
    try {
        const allAdmins = await Admin.find(req.body)
        // const string = JSON.stringify (allAdmins)
        res.status(201).json({
          status: 'success',
          data: allAdmins
        })
        // const jsonString = JSON.stringify(res);
        // console.log(jsonString);
      } catch (err) {
        res.status(400).json ({
          status: 'fail',
          data: err
        })
      }
    });
    
    
    router.get("/getById/:id", protect, async (req, res) => {
        try {
            const AdminId = await Admin.findById(req.params.id);;
            res.status(201).json({
                status: 'success',
                data: AdminId
              })
        } catch (err) {
            res.status(400).json ({
                status: 'fail',
                data:  'what do you mean by that🤨🤔🤨?'
            })
        }
    });

module.exports = router; // connecting to the router on the app.js file.
