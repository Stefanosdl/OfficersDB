const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SailorSchema = new Schema({
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
    driver: String,
    knowledge: String,
    home: String,
    mobile: String,
    isReleased: String,
    changes: String,
    disposal: {             //Πότε πάει
        type: String,
        default: ""
    },
    disposalDaysCount: {    //Μετράει κάθε μέρα πόσες μέρες λείπει σε απόσπαση
        type: Number,
        default: 0
    },
    disposalReturn: {             //Πότε πάει
        type: String,
        default: ""
    },
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
    }
})

module.exports = mongoose.model("Sailor", SailorSchema);