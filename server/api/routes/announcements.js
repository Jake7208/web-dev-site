const express = require("express");
const router = express.Router();

router.get("/getAll", (req, res, next) => {
  // getting the announcementRoutes key from the app.js file.
  const announcements = [
    {
      "id": "1",
      "title": "announcement A",
      "description": "First Announcement",
      "date": "2023-04-25"
    }
  ];
  
  const jsonAnnouncements = JSON.stringify(announcements);
  
  res.send(jsonAnnouncements);
});

router.post("/updateById/:announcementId", (req, res, next) => {
  const id = req.params.announcementId;
  res.status(201).json({
    message: "Handling POST request to /newsLetter",
    id: id,
  });
});

router.get("/getById", (req, res, next) => {
  const id = req.params.announcementId;
  if (id === "special") {
    res.status(200).json({
      message: "you correctly read the special parameter",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "you passed an ID",
    });
  }
});

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

module.exports = router; // connecting to the router on the app.js file.
