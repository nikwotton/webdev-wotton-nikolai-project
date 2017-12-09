const mongoose = require("mongoose");

module.exports = function () {
  return mongoose.model("Website", require("./website.schema.server")());
};
