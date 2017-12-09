module.exports = function (app, model) {

  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const FacebookStrategy = require('passport-facebook').Strategy;
  const bcrypt = require("bcrypt-nodejs");

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new LocalStrategy(localStrategy));

  var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID || "1234",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "1234",
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || "1234"
  };

  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  app.post('/api/user', createUser);
  app.get('/api/user/:uid', findUserById);
  app.put('/api/user/:uid', updateUser);
  app.delete('/api/user/:uid', deleteUser);
  app.get('/api/user', (req, res) => {
    if (req.query.username !== undefined) {
      if (req.query.password !== undefined) {
        findUserByCredentials(req, res);
      } else {
        findUserByUsername(req, res);
      }
    }
  });
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  app.get('/api/loggedIn', loggedin);
  app.get('/facebook/login', passport.authenticate('facebook', {scope: 'email'}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook',
    {successRedirect: '/profile', failureRedirect: '/login'}));

  function createUser(req, res) {
    model
      .create(req.body, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function findUserByCredentials(req, res) {
    model
      .findOne({username: req.query.username, password: req.query.password}, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function findUserByUsername(req, res) {
    model
      .findOne({username: req.query.username}, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function findUserById(req, res) {
    model
      .findById(req.params.uid, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function updateUser(req, res) {
    model
      .findByIdAndUpdate(req.params.uid, req.body, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function deleteUser(req, res) {
    model
      .findByIdAndRemove(req.params.uid, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    model
      .findById(user._id, function (err, user) {
        if (err) {
          done(err, null);
        } else {
          done(null, user);
        }
      });
  }

  function localStrategy(username, password, done) {
    model
      .findOne({username: username}, function (err, user) {
        if (err) {
          return done(err);
        } else {
          if (user !== null && user.username === username && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      });
  }

  function login(req, res) {
    res.json(req.user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function register(req, res) {
    model
      .findOne({username: req.body.username}, function (err, user) {
        if (err || user !== null) {
          res.status(400).send(err);
        } else {
          const user = req.body;
          user.password = bcrypt.hashSync(user.password);
          model
            .create(user, function (err, user) {
              if (err) {
                res.status(400).send(err);
              } else {
                if (user) {
                  req.login(user, function (err) {
                    if (err) {
                      res.status(400).send(err);
                    } else {
                      res.json(user);
                    }
                  })
                }
              }
            });
        }
      });
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function findUserByFacebookId(facebookId) {
    return model.findOne({'facebook.id': facebookId});
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    findUserByFacebookId(profile.id)
      .then(
        function (user) {
          if (user) {
            return done(null, user);
          } else {
            const names = profile.displayName.split(" ");
            const newFacebookUser = {
              lastName: names[1],
              firstName: names[0],
              email: profile.emails ? profile.emails[0].value : "",
              facebook: {
                id: profile.id,
                token: token
              }
            };
            return model
              .create(newFacebookUser, function (err, user) {
                if (err) {
                  return err;
                } else {
                  return user;
                }
              });
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      )
      .then(
        function (user) {
          return done(null, user);
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );
  }
};
