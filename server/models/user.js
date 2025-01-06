const mongoose = require("mongoose");
// mongoose-unique-validators

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }, // Unique is not a validator and the npm package wasn't working
  password: { type: String, required: true, minlength: 6 },
});

module.exports = mongoose.model("User", userSchema);
