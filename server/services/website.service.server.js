module.exports = function (app, model) {

  app.post('/api/user/:uid/website', createWebsiteForUser);
  app.get('/api/user/:uid/website', findAllWebsitesForUser);
  app.get('/api/website/:wid', findWebsiteById);
  app.put('/api/website/:wid', updateWebsite);
  app.delete('/api/website/:wid', deleteWebsite);

  function createWebsiteForUser(req, res) {
    req.body._user = req.params.uid;
    model
      .create(req.body, function (err, website) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(website);
        }
      });
  }

  function findAllWebsitesForUser(req, res) {
    model.find({_user: req.params.uid}, function (err, websites) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(websites);
      }
    });
  }

  function findWebsiteById(req, res) {
    model.findById(req.params.wid, function (err, website) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(website);
      }
    });
  }

  function updateWebsite(req, res) {
    model.findByIdAndUpdate(req.params.wid, req.body, function (err, website) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(website);
      }
    });
  }

  function deleteWebsite(req, res) {
    model.findByIdAndRemove(req.params.wid, function (err, website) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(website);
      }
    });
  }
};
