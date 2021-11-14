const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DisposalSchema = new Schema({
    startTime: {             //Πότε πάει
        type: Date,
        default: undefined
    },
    returnTime: {             //Πότε πάει
        type: Date,
        default: undefined
    },
    daysCount: {    //Μετράει κάθε μέρα πόσες μέρες λείπει σε απόσπαση
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Disposal", DisposalSchema);