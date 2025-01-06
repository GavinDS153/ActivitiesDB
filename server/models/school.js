const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  s_name: { type: String, required: true },
  d_id: { type: mongoose.Types.ObjectId, required: true, ref: "District" },
});

module.exports = mongoose.model("School", schoolSchema);
