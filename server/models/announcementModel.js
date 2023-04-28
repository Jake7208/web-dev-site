const express = require("express");
const { Schema, default: mongoose } = require("mongoose");
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const dotenv = require('dotenv');
const { Db } = require("mongodb");
const router = express.Router();

  
const announcementSchema = new mongoose.Schema({
  title: {
      type: String,
      required: [true, 'Announcements must have a title!'],
    },
    description: {
      type: String,
      required: [true, 'Announcements must have a description!']
    },
    date: { 
      type: Date,
      default: Date.now,
    }
  });
  const Announcement = mongoose.model('Announcement', announcementSchema)
  module.exports = Announcement