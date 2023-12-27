const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {type: String, required: true},
    org: {type: String, required: true},
    dur: {type: String},
    desc: {type: String, required: true},
    loc: {type: String}
});

module.exports = mongoose.model("Activity", activitySchema);