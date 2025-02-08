const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: { type: [String], default: [] }
});

module.exports = mongoose.model("Group", groupSchema);
