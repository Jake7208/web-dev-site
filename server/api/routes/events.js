const express = require('express');
const Event = require("../../models/eventModel");
const Resource = require('../../models/resourceModel');
const router = express.Router();


// add events getting from database working
router.post("/add", async (req, res) => {
    try {
      const newEvent = await Event.create(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          event: newEvent
        }
      })
    } catch (err) {
      res.status(400).json ({
        status: 'fail',
        message: err
      })
    }
  });

router.get("/getAll", async (req, res, next) => {
    // getting the eventRoutes key from the app.js file.
    try {
        const allEvents = await Event.find(req.body)
        res.status(201).json({
          status: 'success',
          data: {
            event: allEvents
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
            const EventId = await Event.findById(req.params.id);;
            res.status(201).json({
                status: 'success',
                data: {
                    event: EventId
                }
            })
        } catch (err) {
            res.status(400).json ({
                status: 'fail',
                message:  'what do you mean by that🤨🤔🤨?'
            })
        }
    });

    router.patch("/updateById/:id", async (req, res) => {
      try {
        const EventId = await Event.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        res.status(200).json({
          status: 'success',
          data: {
            event: EventId
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
        await Event.findByIdAndDelete(req.params.id);
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
