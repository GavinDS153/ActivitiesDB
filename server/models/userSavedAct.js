const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSavedActSchema = new Schema(
  {
    u_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    a_id: { type: mongoose.Types.ObjectId, required: true, ref: "Activity" },
    saved_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSavedAct", userSavedActSchema);
