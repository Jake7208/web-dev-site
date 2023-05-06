const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const DB = process.env.DATABASE;
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB connection successful!"));

const announcementRoutes = require("./announcements");
const eventRoute = require("./events");
const resourceRoute = require("./resources");
const newsLetterRoute = require("./newsLetter");
const videoRoute = require("./videos");
const authRoute = require("./auth");
const userRoute = require("./user");
const AdminAllRoute = require("./getAdminEverything");

router.use("/announcements", announcementRoutes);
router.use("/events", eventRoute);
router.use("/resources", resourceRoute);
router.use("/newsLetter", newsLetterRoute);
router.use("/videos", videoRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/getAdminEverything", AdminAllRoute);

router.get("/", (req, res) => {
	res.send("API is working; now go away.");
});

module.exports = router;
