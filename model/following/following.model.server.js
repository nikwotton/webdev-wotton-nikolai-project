const mongoose = require('mongoose');

module.exports = function() {
  return mongoose.model('Following', require('./following.schema.server')());
};
