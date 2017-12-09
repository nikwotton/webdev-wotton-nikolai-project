const mongoose = require("mongoose");

module.exports = function () {
  return mongoose.model("Page", require("./page.schema.server")());
};
