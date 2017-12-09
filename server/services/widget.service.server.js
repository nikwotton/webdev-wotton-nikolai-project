module.exports = function (app, model) {

  app.post('/api/page/:pid/widget', createWidget);
  app.get('/api/page/:pid/widget', findAllWidgetsForPage);
  app.get('/api/widget/:wid', findWidgetById);
  app.put('/api/widget/:wid', updateWidget);
  app.delete('/api/widget/:wid', deleteWidget);

  function createWidget(req, res) {
    req.body._page = req.params.pid;
    model
      .create(req.body, function (err, widget) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(widget);
        }
      });
  }

  function findAllWidgetsForPage(req, res) {
    model
      .find({_page: req.params.pid}, function (err, widgets) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(widgets);
        }
      });
  }

  function findWidgetById(req, res) {
    model
      .findById(req.params.wid, function (err, widget) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(widget);
        }
      });
  }

  function updateWidget(req, res) {
    model
      .findByIdAndUpdate(req.params.wid, req.body, function (err, widget) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(widget);
        }
      });
  }

  function deleteWidget(req, res) {
    model
      .findByIdAndRemove(req.params.wid, function (err, widget) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(widget);
        }
      });
  }
};
