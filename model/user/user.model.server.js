const mongoose = require("mongoose");

module.exports = function () {
  return mongoose.model("User", require("./user.schema.server")());
};
