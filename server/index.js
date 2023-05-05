const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
require("dotenv").config();


// preventing cors errors
app.use(cors({
  origin: '*'
}))

const announcementRoutes = require("./api/routes/announcements");
const eventRoute = require("./api/routes/events");
const resourceRoute = require("./api/routes/resources");
const newsLetterRoute = require("./api/routes/newsLetter");
const videoRoute = require("./api/routes/videos");
const authRoute = require("./api/routes/auth");
const userRoute = require("./api/routes/user");
const AdminAllRoute = require('./api/routes/getAdminEverything');
const { reset } = require("nodemon");

app.get("/", (req, res) => {
  res.send("Express JS on Vercel");
});

// 1) global middleware
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// limits requests from same api
const limiter = rateLimit({
  max: 15,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour'
});
app.use('/api/auth/login', limiter)
// Body parser, reading data from body into req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(hpp())

// !!! router connections for routes file (not an error) 
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", eventRoute);
app.use("/api/resources", resourceRoute);
app.use("/api/newsLetter", newsLetterRoute);
app.use("/api/videos", videoRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/getAdminEverything", AdminAllRoute)
  

// !!! middleware !!! (not an error) \
app.use(express.json())

app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});


// connection to the database 
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  },)
  .then(() => console.log("DB connection successful!"));

// connection to port 8080
const port = process.env.PORT || 8080;

app.listen(port, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("[INFO] Server Running on port:", port);
  }
});

console.log(`Running on port ${port}`);
