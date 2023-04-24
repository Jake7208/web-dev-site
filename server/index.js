const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

const announcementRoutes = require('./api/routes/announcements');
const eventRoute = require('./api/routes/events')
const resourceRoute = require('./api/routes/resources')
const newsLetterRoute = require('./api/routes/newsLetter')
const videoRoute = require('./api/routes/videos')

app.get('/', (req, res) => {
    res.send('Express JS on Vercel')
})

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
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
app.use('/api/resources', resourceRoute)
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

// console.log(process.env)

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true
    // UseCreateIndex: true,
    // useFindAndModify: false
}).then(con => {
    console.log(con.connections);
    console.log('DB connection successful!')
})

const port = process.env.PORT || 8080;

app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
        return res.status(500).send(err.message)
    } else {
        console.log('[INFO] Server Running on port:', port)
    }
})


console.log(`Running on port ${port}`)