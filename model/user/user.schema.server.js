const mongoose = require("mongoose");

module.exports = function () {
  return new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateCreated: {type: Date, default: Date.now},
    facebook: {id: String, token: String}
  });
};
