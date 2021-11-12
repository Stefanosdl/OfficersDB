const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SailorSchema = new Schema({
    firstname: String,
    lastname: String
})

module.exports = mongoose.model('Sailor',SailorSchema);