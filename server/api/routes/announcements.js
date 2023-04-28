const express = require("express");
const Announcement = require("../../models/announcementModel");
const router = express.Router();

router.post("/addAnnouncement", async (req, res) => {
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
      message: 'what do you mean by that🤨🤔🤨?', err
    })
  }
});




// router.get("/getById", (req, res, next) => {
//   const id = req.params.announcementId;
//   if (id === "special") {
//     res.status(200).json({
//       message: "you correctly read the special parameter",
//       id: id,
//     });
//   } else {
//     res.status(200).json({
//       message: "you passed an ID",
//     });
//   }
// });

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

router.delete("/deleteById", (req, res, next) => {
  res.status(200).json({
    message: "delete Announcement",
    id: req.body.id,
  });
});

module.exports = router; // connecting to the router on the index.js file.
