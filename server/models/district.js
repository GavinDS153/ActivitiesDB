const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const districtSchema = new Schema({
  d_name: { type: String, required: true },
  schools: [{ type: mongoose.Types.ObjectId, required: true, ref: "School" }],
});

module.exports = mongoose.model("District", districtSchema);
