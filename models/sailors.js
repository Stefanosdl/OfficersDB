const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SailorSchema = new Schema({
    grade: String,
    firstname: String,
    lastname: String,
    adeptness: String,
    arrival: String,
    classification: String,
    release: String,
    serve: Number,
    police: String,
    father: String,
    mother: String,
    address: String,
    esso: String,
    fitness: String,
    marital: String,
    origin: String,
    driver: String,
    knowledge: String,
    home: String,
    mobile: String,
    isReleased: String,
    changes: String,
    defaultTimeoff:  {             //Κανονική άδεια
        type: Number,
        default: 0
    },
    bloodDonation:  {             //Αιμοδοσία
        type: Number,
        default: 0
    },
    vaccineTimeoff:  {             //Άδεια Εμβολίου
        type: Number,
        default: 0
    },
    totalTimeoff:  {                //Συνολική άδεια
        type: Number,
        default: 0
    },
    disposals: [{
	    	type: Schema.Types.ObjectId,
	    	ref: "Disposal"
    }]
});

module.exports = mongoose.model("Sailor", SailorSchema);