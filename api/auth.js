const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const express = require("express");
const Admin = require("../models/userModel");
const AppError = require("../utils/appError");
const { log } = require("console");
const { json } = require("body-parser");
const router = express.Router();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true, // Add secure flag for HTTPS connections
    sameSite: "none", // Add sameSite attribute for cross-site requests
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};


router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("\n\nTHIS ONE\n\n");
    console.log(req.body);

    // 1) check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        data: "please provide an email and password",
      });
    }
    // 2) check if the user exists && if password is correct
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return res.status(401).json({
        status: "fail",
        data: "Incorrect email or password",
      });
    }

    // Set the JWT token in a cookie and send it to the client
    createSendToken(admin, 200, res);

  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
});


// Add the following middleware function to set the Access-Control-Allow-Credentials header
// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });


router.get("/set-cookie", (req, res) => {
	// Set a cookie named "my-cookie" with a value of "hello"
	res.cookie("my-cookie", "hello");
	
	// Send a response to the client
	res.send("Cookie set successfully");
  });
  

router.protect = async (req, res, next) => {
  try {
    //  1) getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError("Unauthorized please login to gain access", 401)
      );
    }
    // 2) verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 3) check if user still exist

    // 4) check if user changed password after the token was issued
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};
module.exports = router; // connecting to the router on the index.js file.
