const mongoose = require('mongoose');

module.exports = function() {
  return new mongoose.Schema({
    comment: String,
    meme: {type: mongoose.Schema.Types.ObjectId, ref: 'Meme'},
    poster: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: Date, default: Date.now}
  });
};
