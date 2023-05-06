const express = require("express");
const { Schema, default: mongoose } = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Video must have a title!']
    },
    link: {
        type: String,
        require: [true, 'you need a link for video'],
        unique: true
    },
    date: { 
      type: Date,
      default: Date.now,
      required: true,
      select: false
    }
  })
  const Video = mongoose.model('Video', videoSchema)

  module.exports = Video