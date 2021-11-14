const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DisposalSchema = new Schema({
    startTime: {             //Πότε πάει
        type: String,
        default: ""
    },
    daysCount: {    //Μετράει κάθε μέρα πόσες μέρες λείπει σε απόσπαση
        type: Number,
        default: 0
    },
    return: {             //Πότε πάει
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Disposal", DisposalSchema);