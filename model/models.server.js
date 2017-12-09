module.exports = function () {

  const mongoose = require("mongoose");
  const mongojs = require('mongojs');

  mongoose.connect('mongodb://localhost/web-app-maker');
  mongojs('web-app-maker');

  let userModel = require("./user/user.model.server")();
  let websiteModel = require("./website/website.model.server")();
  let pageModel = require("./page/page.model.server")();
  let widgetModel = require("./widget/widget.model.server")();

  return {
    userModel: userModel,
    websiteModel: websiteModel,
    pageModel: pageModel,
    widgetModel: widgetModel,
    mongojs: mongojs
  };
};
