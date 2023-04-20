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
            message: 'you correctly read the special parameter',
            id: id
        })
    }else {
        res.status(200).json ({
            message: 'you passed an ID'
        });
    };
});

router.get('/hide', (req, res, next) => {
    const hide = req.query.hide;
    if (hide.hidden != true){
        res.status(200).json({
            message: 'the content is visible'
        })
        
    } else {
        res.status(200).json({
            message: 'The content is hidden'
        })
    }
})

router.delete('/deleteById', (req, res, next) => {
    const delAnnouncement = {
        deletedId: req.body.announcementId,
    }
    res.status(200).json ({
        message: 'delete Announcement',
        announcementId: delAnnouncement

    });
});

module.exports = router; // connecting to the router on the app.js file.