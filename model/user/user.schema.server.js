const mongoose = require('mongoose');

module.exports = function() {
  return new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now},
    facebook: {id: String, token: String},
    type: {type: String, enum: ['student', 'teacher', 'admin']}
  });
};
