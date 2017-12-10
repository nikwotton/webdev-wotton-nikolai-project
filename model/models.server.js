module.exports = function() {

  const mongoose = require('mongoose');
  const mongojs = require('mongojs');

  mongoose.connect('mongodb://localhost/web-app-maker');
  mongojs('web-app-maker');

  let userModel = require('./user/user.model.server')();
  let websiteModel = require('./website/website.model.server')();
  let pageModel = require('./page/page.model.server')();
  let widgetModel = require('./widget/widget.model.server')();
  let memeModel = require('./meme/meme.model.server')();
  let commentModel = require('./comment/comment.model.server')();
  let followingModel = require('./following/following.model.server')();
  let imageModel = require('./image/image.model.server')();

  return {
    userModel: userModel,
    websiteModel: websiteModel,
    pageModel: pageModel,
    widgetModel: widgetModel,
    memeModel: memeModel,
    commentModel: commentModel,
    followingModel: followingModel,
    imageModel: imageModel,
    mongojs: mongojs
  };
};
