const express = require("express");
const { Schema, default: mongoose } = require("mongoose");
const dotenv = require('dotenv');
const router = express.Router();


const announcementSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: [true, 'Announcements require an id to be passed'],
      unique: true
    },
    title: {
      type: String,
      required: [true, 'Announcements must have a title!']
    },
    description: {
      type: String,
      required: [true, 'Announcements must have a description!']
    },
    date: { 
      type: Date,
      default: Date.now,
    }
  })
  const Announcement = mongoose.model('Announcement', announcementSchema)

  module.exports = Announcement