const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Sailor = require("../models/sailors");
const Disposal = require("../models/disposal");

router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", catchAsync(async (req, res, next) => {
    try {
		// const {firstname, lastname, adeptness, arrival, classification, release, serve, police, father, mother, address, esso, fitness, driver, knowledge, home, mobile, isReleased} = req.body;
        // const newArrival = arrival.toString();
        // const newClassification = classification.toString();
        // const newRelease = release.toString();
        var defaultTimeoff = 0;
        if (req.body.serve == 12) {
            defaultTimeoff = 18;
        }
        else if (req.body.serve == 9) {
            defaultTimeoff = 15;
        }
        else if (req.body.serve == 6) {
            defaultTimeoff = 12;
        }
		const sailor = new Sailor({grade: req.body.grade, firstname: req.body.firstname, lastname: req.body.lastname, adeptness: req.body.adeptness, arrival: req.body.arrival.toString(), classification: req.body.classification.toString(), release: req.body.release.toString(), serve: req.body.serve, police: req.body.police, father: req.body.father, mother: req.body.mother, address: req.body.address, esso: req.body.esso, fitness: req.body.fitness, marital: req.body.marital, origin: req.body.origin, driver: req.body.driver, knowledge: req.body.knowledge, home: req.body.home, mobile: req.body.mobile, isReleased: req.body.isReleased, changes: req.body.changes, defaultTimeoff: defaultTimeoff});
        await sailor.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
        console.log(e.message);
		req.flash("error", e.message);
		res.redirect('/sailor/register');
	}
}));

router.get("/search", catchAsync(async (req, res, next) => {
	try {
        const query = req.query.q;
        if (query){
			const searchedq = query.split(" ");
            const searchedSailors = await Sailor.find({$or: [{firstname: searchedq[0], lastname: searchedq[1]}, {firstname: searchedq[1], lastname: searchedq[0]}, {lastname: searchedq[0]}, {lastname: searchedq[1]}, {firstname: searchedq[0]}, {firstname: searchedq[1]}] }).populate("disposals").exec();
            if(searchedSailors == undefined || searchedSailors.length == 0) {
                req.flash("error", "Η αναζήτησή σας δεν είχε κανένα αποτέλεσμα!");
                res.redirect('/');
            }
            else {
                res.render("search", { searchedSailors });
            }
        }
        else {
            res.render("index");
        }

    }
    catch (e) {
        console.log( e.message)
        req.flash("error", e.message);
        res.redirect('/');
    }
}));

module.exports = router;