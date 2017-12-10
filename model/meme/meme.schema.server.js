const mongoose = require('mongoose');

module.exports = function() {
  return new mongoose.Schema({
    poster: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
    topText: String,
    bottomText: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
  });
};
