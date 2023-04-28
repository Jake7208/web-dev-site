const express = require("express");
const { Schema, default: mongoose } = require("mongoose");
const dotenv = require('dotenv');
const router = express.Router();


const eventSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: [true, 'event require an id to be passed'],
      unique: true
    },
    title: {
      type: String,
      required: [true, 'event must have a title!']
    },
    description: {
      type: String,
      required: [true, 'event must have a description!']
    },
    date: { 
      type: Date,
      default: Date.now,
    }
  })
  const event = mongoose.model('Event', eventSchema)

  module.exports = event