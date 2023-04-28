const express = require('express');
const router = express.Router();

router.get("/getAll", (req, res, next) => {
    // getting the announcementRoutes key from the app.js file.
    const events = [
        {
            "_id": {
              "$oid": "644831d4389403befc89c2c7"
            },
            "id": "1",
            "title": "abc",
            "description": "new event 1",
            "date": "2023-04-25"

          }
    ];
    
    const jsonEvents = JSON.stringify(events);
    
    res.send(jsonEvents);
  });

router.post('/updateById', (req, res, next ) => {
    res.status(201).json({
        message: 'Handling POST request to /events',
    });
});


router.get('/getById/:eventsId', (req, res, next) => {
        res.status(200).json({
            message: 'resources details',
            newsLetterId: req.params.eventsId
        })
})



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
