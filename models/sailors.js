const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SailorSchema = new Schema({
    firstname: String,
    lastname: String,
    adeptness: String,
    arrival: Date,
    classification: Date,
    release: Date,
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
    isReleased: String
})

module.exports = mongoose.model("Sailor", SailorSchema);