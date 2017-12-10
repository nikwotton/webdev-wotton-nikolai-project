const mongoose = require('mongoose');

module.exports = function() {
  return new mongoose.Schema({
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    followee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: Date, default: Date.now}
  });
};
