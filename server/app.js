const express = require('express');
const app = express();
const morgan = require('morgan')

const announcementRoutes = require('./api/routes/announcements');
const eventRoute = require('./api/routes/events')
const rescourceRoute = require('./api/routes/resources')
const newsLetterRoute = require('./api/routes/newsLetter')
const videoRoute = require('./api/routes/videos')

app.use(morgan('dev'))
// router connections for routes file
app.use('/api/announcements', announcementRoutes)
app.use('/api/events', eventRoute)
app.use('/api/resources', rescourceRoute)
app.use('/api/newsLetter', newsLetterRoute)
app.use('/api/videos', videoRoute)

// const videoRoute = require('./a') 


module.exports = app;