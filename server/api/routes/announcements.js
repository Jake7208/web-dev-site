const express = require('express');
const router = express.Router();

router.get('/getAll', (req, res, next ) => { // getting the announcementRoutes key from the app.js file.
    res.status(200).json({
        message: 'Handling GET request to /announcements'
    })
})

router.post('/updateById/:announcementId', (req, res, next ) => {
    const id = req.params.announcementId;
    res.status(201).json({
        message: 'Handling POST request to /newsLetter',
        id: id
    });
});

router.get('/getById', (req, res, next) => {
    const id = req.params.announcementId;
    if (id === 'special') {
        res.status(200).json({
            message: 'you corretly read the special parameter',
            id: id
        })
    }else {
        res.status(200).json ({
            message: 'you passed an ID'
        });
    };
});

router.delete('/deleteById', (req, res, next) => {
    res.status(200).json ({
        message: 'delete Announcement',
    });
});

module.exports = router; // connecting to the router on the app.js file.