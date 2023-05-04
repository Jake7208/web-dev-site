const express = require('express');
const Video = require("../../models/videoModel");
const { protect } = require('./auth');
const router = express.Router();
const APIFeatures = require('../../utils/apiFeatures');

// add to db
router.post("/add", protect, async (req, res) => {
    try {
      const newVideos = await Video.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          Videos: newVideos
        }
      })
    } catch (err) {
      res.status(400).json ({
        status: 'fail',
        message: 'what do you mean by that🤨🤔🤨?', err
      })
    }
  });


    router.get("/getAll", async (req, res, next) => {
      // getting the VideoRoutes key from the app.js file.
      try {
        const { page, limit, sort, fields, ...filters } = req.query;
        // create query object
        const queryObj = Video.find(filters);

        // create APIFeatures instance
        const features = new APIFeatures(queryObj, req.query);
    
        // apply query methods
        features.filter().sort().limitFields().paginate();
    
        // execute query
        const allVideos = await features.query;

          // send response
          res.status(201).json({
            status: 'success',
            data: allVideos
  
          })
        } catch (err) {
          res.status(400).json ({
            status: 'fail',
            message: err
          })
        }
      });
    

    router.get("/getById/:id", async (req, res) => {
        try {
          const videosId = await Video.findById(req.params.id);
          res.status(201).json({
            status: 'success',
            data: videosId
          })
        } catch (err) {
          res.status(400).json ({
            status: 'fail',
            message:  err//'what do you mean by that🤨🤔🤨?'
          })
        }
      });

    router.patch("/updateById/:id", protect, async (req, res) => {
        try {
          const videosId = await Video.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          });
          res.status(200).json({
            status: 'success',
            data: videosId
          })
        }catch (err) {
          res.status(400).json ({
            status: 'fail',
            message: err //'what do you mean by that🤨🤔🤨?'
          })
        }
      })

      router.delete('/deleteById/:id', protect, async (req, res) => {
        try {
            await Video.findByIdAndDelete(req.params.id);
        res.status(204).json({
          status: 'success',
          data: null
        })
      }catch (err) {
        res.status(400).json ({
          status: 'fail',
          message: 'Your data not gone guess its not deleted...🤨🤔🤨?'
        })
      }
    })


module.exports = router; // connecting to the router on the app.js file.
