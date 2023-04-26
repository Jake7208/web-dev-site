const express = require('express');
const router = express.Router();

router.get('/getAll', (req, res, next ) => { // getting the announcementRoutes key from the app.js file.
    res.status(200).json({
        message: 'Handling GET request to /newsLetter'
    });
});

router.post('/updateById', (req, res, next ) => {
    res.status(201).json({
        message: 'Handling POST request to /newsLetter',
    });
});


router.get('/getByNum/:newsLetterNum', (req, res, next) => {
        newsLetter.find(req.params.newsLetterNum).then((newsLetter) => {
            if (!newsLetter) {
                return res.status(404).send();
            }    
            res.send(newsLetter);
        }).catch((error) => {
            res.status(500).send(error);
        })
    })



router.delete('/deleteById/:newsLetterId', (req, res, next) => {
    const id = req.params.newsLetterId
   if (id !== undefined) {
        res.status(200).json({
            message: `newsLetter id: ${id}; deleted`,
            newsLetterId: id
        })
    }
})



module.exports = router; // connecting to the router on the app.js file.
