const express = require('express');
const router = express.Router();

router.get('/getAll', (req, res, next ) => { // getting the announcementRoutes key from the app.js file.
    res.status(200).json({
        message: 'Handling GET request to /events'
    });
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