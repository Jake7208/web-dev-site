const express = require('express');
const Event = require("../../models/eventModel");
const router = express.Router();
const auth = require('./auth')


// add events getting from database working
router.post("/add", auth.protect, async (req, res) => {
    try {
      const newEvent = await Event.create(req.body)
      res.status(201).json({
        status: 'success',
        data:  newEvent
      })
    } catch (err) {
      res.status(400).json ({
        status: 'fail',
        data: err
      })
    }
  });

router.get("/getAll", async (req, res, next) => {
    // getting the eventRoutes key from the app.js file.
    try {
        const allEvents = await Event.find(req.body)
        // const string = JSON.stringify (allEvents)
        res.status(201).json({
          status: 'success',
          data: allEvents
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
    
    
    router.get("/getById/:id", async (req, res) => {
        try {
            const EventId = await Event.findById(req.params.id);;
            res.status(201).json({
                status: 'success',
                data: EventId
              })
        } catch (err) {
            res.status(400).json ({
                status: 'fail',
                data:  'what do you mean by that🤨🤔🤨?'
            })
        }
    });

    router.patch("/updateById/:id", auth.protect, async (req, res) => {
      try {
        const EventId = await Event.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        res.status(200).json({
          status: 'success',
          data: EventId
        })
      }catch (err) {
        res.status(400).json ({
          status: 'fail',
          data: err //'what do you mean by that🤨🤔🤨?'
        })
      }
    })

    router.delete('/deleteById/:id', auth.protect, async (req, res) => {
        try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(204).json({
          status: 'success',
          data: null
        })
      }catch (err) {
        res.status(400).json ({
          status: 'fail',
          data: 'Your data not gone guess its not deleted...🤨🤔🤨?'
        })
      }
    })

module.exports = router; // connecting to the router on the app.js file.
