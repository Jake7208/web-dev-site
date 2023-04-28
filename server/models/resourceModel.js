const express = require("express");
const { Schema, default: mongoose } = require("mongoose");
const dotenv = require('dotenv');
const router = express.Router();

const resourceSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'resource must have a title!']
    },
    description: {
      type: String,
      required: [true, 'resource must have a description!']
    },
  })
  const Resource = mongoose.model('Resource', resourceSchema)

  module.exports = Resource