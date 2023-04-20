const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')


const announcementRoutes = require('./api/routes/announcements');
const eventRoute = require('./api/routes/events')
const rescourceRoute = require('./api/routes/resources')
const newsLetterRoute = require('./api/routes/newsLetter')
const videoRoute = require('./api/routes/videos')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// preventing cors errors
app.use(
    cors({
        origin:  "*",
    })
)

// router connections for routes file
app.use('/api/announcements', announcementRoutes)
app.use('/api/events', eventRoute)
app.use('/api/resources', rescourceRoute)
app.use('/api/newsLetter', newsLetterRoute)
app.use('/api/videos', videoRoute)

// middleware
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404 ;
    next(error);
})


app.use((error, req, res, next) => {
    res.status(error.status || 500) 
    res.json({
        error: {
            message: error.message
        }
    })
})
// const videoRoute = require('./a') 


module.exports = app;