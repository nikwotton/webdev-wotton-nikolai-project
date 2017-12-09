module.exports = function (app, model) {

  app.post('/api/website/:wid/page', createPage);
  app.get('/api/website/:wid/page', findAllPagesForWebsite);
  app.get('/api/page/:pid', findPageById);
  app.put('/api/page/:pid', updatePage);
  app.delete('/api/page/:pid', deletePage);

  function createPage(req, res) {
    req.body._website = req.params.wid;
    model
      .create(req.body, function (err, page) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(page);
        }
      });
  }

  function findAllPagesForWebsite(req, res) {
    model
      .find({_website: req.params.wid}, function (err, pages) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(pages);
        }
      });
  }

  function findPageById(req, res) {
    model.findById(req.params.pid, function (err, page) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(page);
      }
    });
  }

  function updatePage(req, res) {
    model.findByIdAndUpdate(req.params.pid, req.body, function (err, page) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(page);
      }
    });
  }

  function deletePage(req, res) {
    model.findByIdAndRemove(req.params.pid, function (err, page) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(page);
      }
    });
  }
};
