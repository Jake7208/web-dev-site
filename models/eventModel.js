const express = require("express");
const router = express.Router();
const { Schema, default: mongoose } = require("mongoose");

const eventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "event must have a title!"],
	},
	description: {
		type: String,
		required: [true, "event must have a description!"],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
