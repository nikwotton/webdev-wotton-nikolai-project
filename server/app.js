/**
 * Created by sesha on 7/27/17.
 */

/* the function is a Java script constructor which will be instantiated from top level server.js */
/* req = parses the req from http, parses and makes it a nice clean object */
// params is part of the request. any variables in the path will be available as a a map in params

module.exports = function(app) {

  let connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
  if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    const username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    const password = process.env.MLAB_PASSWORD_WEBDEV;
    const end = process.env.MLAB_EXTENSION_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password + end;
  }

  const mongoose = require('mongoose');
  const mongojs = require('mongojs');

  mongoose.connect(connectionString);
  mongojs('web-app-maker');

  const model = require('../model/models.server.js')();

  require('./services/widget.service.server.js')(app, model.widgetModel);
  require('./services/page.service.server.js')(app, model.pageModel);
  require('./services/website.service.server')(app, model.websiteModel);
  require('./services/user.service.server')(app, model.userModel);
  require('./services/comment.service.server')(app, model.commentModel);
  require('./services/meme.service.server')(app, model.memeModel);
  require('./services/image.service.server')(app, model.imageModel);
};
