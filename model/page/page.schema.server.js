const mongoose = require("mongoose");

module.exports = function () {
  return new mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "Website"},
    name: String,
    title: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
  });
};
