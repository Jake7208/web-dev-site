const express = require('express');
const Event = require("../../models/eventModel");
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
        message: 'what do you mean by that🤨🤔🤨?', err
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
            const EventId = await Event.findOne({id: req.params.id});
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

    router.post('/updateById', (req, res, next ) => {
        res.status(201).json({
            message: 'Handling POST request to /events',
        });
    });

router.delete('/deleteById/:eventsId', (req, res, next) => {
    const id = req.params.eventsId
   if (id !== undefined) {
        res.status(200).json({
            message: `resources id: ${id}; deleted`,
            newsLetterId: id
        })
    }
})

module.exports = router; // connecting to the router on the app.js file.
