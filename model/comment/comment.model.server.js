const mongoose = require('mongoose');

module.exports = function() {
  return mongoose.model('Comment', require('./comment.schema.server')());
};
