const express = require("express");
const Announcement = require("../../models/announcementModel");
const { json } = require("body-parser");
const { protect } = require("./auth");
const router = express.Router();

router.post("/add", protect, async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create(req.body)
    res.status(201).json({
      status: 'success',
      data: newAnnouncement
    })
  } catch (err) {
    res.status(400).json ({
      status: 'fail',
      message:  err
    })
  }
});

router.get("/getAll", async (req, res, next) => {
  // getting the announcementRoutes key from the app.js file.
  try {
    // build query
    // 1) Filtering
      const queryObj = {...req.query}
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el])      
      // console.log(req.query, queryObj);

    // 2) advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b{gte|gt|lte|lt}\b/g, match => `$${match}`)
      console.log(JSON.parse(queryStr));
      
      const query = Announcement.find(JSON.parse(queryStr));
      // { duration: '5', difficulty: 'easy' } { duration: '5', difficulty: 'easy' }

    // execute query
      const allAnnouncement = await query;

      // send response
      res.status(201).json({
        status: 'success',
        data: allAnnouncement
      
      })
    } catch (err) {
      res.status(400).json ({
        status: 'fail',
        message: err
      })
    }
  });


router.get("/getById/:id", async (req, res) => {
  try {
    const AnnouncementId = await Announcement.findById(req.params.id);
    res.status(201).json({
      status: 'success',
      data: AnnouncementId

    })
  } catch (err) {
    res.status(400).json ({
      status: 'fail',
      message:  err//'what do you mean by that🤨🤔🤨?'
    })
  }
});

router.patch("/updateById/:id", protect, async (req, res) => {
  try {
    const AnnouncementId = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: AnnouncementId
    })
  }catch (err) {
    res.status(400).json ({
      status: 'fail',
      message: err //'what do you mean by that🤨🤔🤨?'
    })
  }
})


router.get("/hide", (req, res, next) => {
  const hidden = req.query.hide;
  if (!!hidden) {
    res.status(200).json({
      message: "the content is visible",
    });
  } else {
    res.status(200).json({
      message: "The content is hidden",
    });
  }
});

router.delete('/deleteById/:id', protect,async (req, res) => {
  try {
      await Announcement.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  })
}catch (err) {
  res.status(400).json ({
    status: 'fail',
    message: 'Your data not gone guess its not deleted...🤨🤔🤨?'
  })
}
})

module.exports = router; // connecting to the router on the index.js file.
