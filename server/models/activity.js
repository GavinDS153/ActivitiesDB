const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: { type: String, required: true },
  org: { type: String, required: true },
  dur: { type: String },
  desc: { type: String, required: true },
  loc: { type: String },
  cost: { type: String },
  ages: { type: String },
  web: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", default: [] }],
});

module.exports = mongoose.model("Activity", activitySchema);
