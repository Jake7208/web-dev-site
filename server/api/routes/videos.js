const express = require('express');
const Video = require("../../models/videoModel")
const router = express.Router();

// add to db
router.post("/add", async (req, res) => {
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

// get all from db cluster 
  router.get("/getAll", async (req, res, next) => {
    // getting the resourcesRoutes key from the app.js file.
    try {
        const allVideos = await Video.find(req.body)
        res.status(201).json({
          status: 'success',
          data: {
            resources: allVideos
          }
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
            data: {
              announcement: videosId
            }
          })
        } catch (err) {
          res.status(400).json ({
            status: 'fail',
            message:  err//'what do you mean by that🤨🤔🤨?'
          })
        }
      });

    router.patch("/updateById/:id", async (req, res) => {
        try {
          const videosId = await Video.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          });
          res.status(200).json({
            status: 'success',
            data: {
              videos: videosId
            }
          })
        }catch (err) {
          res.status(400).json ({
            status: 'fail',
            message: err //'what do you mean by that🤨🤔🤨?'
          })
        }
      })

      router.delete('/deleteById/:id', async (req, res) => {
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
