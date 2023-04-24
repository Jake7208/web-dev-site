const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const http = require('http')
const app = require('./app')


// console.log(process.env)

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true
    // UseCreateIndex: true,
    // useFindAndModify: false
}).then(con => {
    console.log(con.connections);
    console.log('DB connection successful!')
})

const port = process.env.PORT || 4000;

const server = http.createServer(app);


console.log(`Running on port ${port}`)

server.listen(port)