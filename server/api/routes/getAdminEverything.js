const express = require('express');
const Event = require("../../models/eventModel");
const Announcement = require("../../models/announcementModel");
const Resource = require("../../models/resourceModel");
const Video = require("../../models/videoModel");
const auth = require('./auth')
const APIFeatures = require('../../utils/apiFeatures');
const router = require('./auth');
const AppError = require('../../utils/appError');


router.get("/getAll", auth.protect,  async (req, res, next) => {
    try {

    const { page, limit, sort, fields, ...filters } = req.query;
        // create query object
        const queryObj = Video.find(filters);

        // create APIFeatures instance
        const features = new APIFeatures(queryObj, req.query);
    
        // apply query methods
        features.filter().sort().limitFields().paginate();
    
        // execute query
        // const allVideos = await features.query;

    // getting the eventRoutes key from the app.js file.
        const allEvents = await Event.find(req.body).select('-__v')
        const allAnnouncement = await Announcement.find(req.body).select('-__v')
        const allVideos = await features.query;
        const allResources = await Resource.find(req.body).select('-__v')
      // send response
      res.status(201).json({
        status: 'success',
        data: {
            events: allEvents, 
            announcements: allAnnouncement,
            videos: allVideos,
            resources: allResources
        }
      })
    
      } catch (err) {
        res.status(400).json ({
          status: 'fail',
          data: err
        })
      }
    });

module.exports = router