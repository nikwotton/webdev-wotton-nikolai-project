const mongoose = require('mongoose');

module.exports = function() {
  return mongoose.model('Meme', require('./meme.schema.server')());
};
