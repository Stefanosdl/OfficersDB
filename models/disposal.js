const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DisposalSchema = new Schema({
    startTime: {
        type: Date,
        default: undefined
    },
    returnTime: {
        type: Date,
        default: undefined
    },
    daysCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Disposal", DisposalSchema);