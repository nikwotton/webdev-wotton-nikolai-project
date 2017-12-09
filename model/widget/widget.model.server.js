const mongoose = require("mongoose");

module.exports = function () {
  return mongoose.model("Widget", require("./widget.schema.server")());
};
