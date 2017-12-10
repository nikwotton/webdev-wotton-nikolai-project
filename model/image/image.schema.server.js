const mongoose = require('mongoose');

module.exports = function() {
  return new mongoose.Schema({
    imageUrl: String,
    subject: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: Date, default: Date.now}
  });
};
