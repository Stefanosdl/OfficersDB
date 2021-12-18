const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Sailor = require("../models/sailors");
const Disposal = require("../models/disposal");
const diffDays = require("../utils/calculateDate");

router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", catchAsync(async (req, res, next) => {
    try {
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
		const sailor = new Sailor({grade: req.body.grade, firstname: req.body.firstname, lastname: req.body.lastname, registration: req.body.registration, adeptness: req.body.adeptness, arrival: req.body.arrival.toString(), classification: req.body.classification.toString(), release: req.body.release.toString(), serve: req.body.serve, police: req.body.police, father: req.body.father, mother: req.body.mother, address: req.body.address, esso: req.body.esso, fitness: req.body.fitness, marital: req.body.marital, origin: req.body.origin, driver: req.body.driver, knowledge: req.body.knowledge, home: req.body.home, mobile: req.body.mobile, isReleased: req.body.isReleased, changes: req.body.changes, defaultTimeoff: defaultTimeoff, totalTimeoff: defaultTimeoff});
        await sailor.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
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

router.get("/update/:id", catchAsync(async (req, res) => {
    const sailor = await Sailor.findById(req.params.id).populate("disposals").exec();
	res.render("update", { sailor });
}));

router.put("/update/:id", catchAsync(async (req, res) => {
    const searchedSailors = await Sailor.find(({"lastname" : {$regex : req.body.arr.lastname}})).populate("disposals").exec();
    const sailor = await Sailor.findByIdAndUpdate(searchedSailors[0].id, { ...req.body.arr});

    sailor.totalTimeoff = sailor.defaultTimeoff + sailor.bloodDonation*4 + sailor.vaccineTimeoff*5;

    var tempDays = 0;
    if(sailor.disposals != undefined && sailor.disposals[0] != undefined) {
        if(sailor.disposals[0].startTime != undefined && sailor.disposals[0].endTime != undefined){
            sailor.disposals[0].daysCount = diffDays.calculateDate(sailor.disposals[0].startTime, sailor.disposals[0].endTime);
        }
    }

    await sailor.disposals.push();
    await sailor.save();

    req.flash("success", "Επιτυχής ενημέρωση!");
    res.redirect('/');
}));

module.exports = router;