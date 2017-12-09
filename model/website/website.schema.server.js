const mongoose = require("mongoose");

module.exports = function () {
  return new mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
  });
};
