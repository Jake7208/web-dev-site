const express = require("express");
const Announcement = require("../../models/announcementModel");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        announcement: newAnnouncement
      }
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
      const allAnnouncement = await Announcement.find(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          announcement: allAnnouncement
        }
      })
    } catch (err) {
      res.status(400).json ({
        status: 'fail',
        message: 'what do you mean by that🤨🤔🤨?', err
      })
    }
  });


router.get("/getById/:id", async (req, res) => {
  try {
    const AnnouncementId = await Announcement.findById(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        announcement: AnnouncementId
      }
    })
  } catch (err) {
    res.status(400).json ({
      status: 'fail',
      message:  err//'what do you mean by that🤨🤔🤨?'
    })
  }
});

router.patch("/updateById/:id", async (req, res) => {
  try {
    const AnnouncementId = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        announcement: AnnouncementId
      }
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

router.delete('/deleteById/:id', async (req, res) => {
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
