const mongoose = require('mongoose');

module.exports = function() {
  return mongoose.model('Image', require('./image.schema.server')());
};
