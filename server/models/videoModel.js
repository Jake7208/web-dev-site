const express = require("express");
const { Schema, default: mongoose } = require("mongoose");
const dotenv = require('dotenv');
const router = express.Router();

const videoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Video must have a title!']
    },
    link: {
        type: String,
        require: [true, 'you need a link for video'],
        unique: true
    }
  })
  const Video = mongoose.model('Video', videoSchema)

  module.exports = Video