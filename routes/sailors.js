const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Sailor = require("../models/sailors");

router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", catchAsync(async (req, res, next) => {
    try {
		const {firstname, lastname, adeptness, arrival, classification, release, serve, police, father, mother, address, esso, fitness, driver, knowledge, home, mobile, isReleased} = req.body;
		const sailor = new Sailor({firstname, lastname, adeptness, arrival, classification, release, serve, police, father, mother, address, esso, fitness, driver, knowledge, home, mobile, isReleased});
        await sailor.save();
        res.redirect("/");
	}
	catch(e) {
		res.redirect("/sailor/register");
	}
}));

module.exports = router;