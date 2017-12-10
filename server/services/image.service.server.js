module.exports = function(app, model) {

  app.post('/api/image', createImage);
  app.get('/api/image', findAllImages);
  app.get('/api/image/:mid', findImageById);
  app.put('/api/image/:mid', updateImage);
  app.delete('/api/image/:mid', deleteImage);

  function createImage(req, res) {
    model
      .create(req.body, function(err, image) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(image);
        }
      });
  }

  function findAllImages(req, res) {
    model.find({}, function(err, images) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(images);
      }
    });
  }

  function findImageById(req, res) {
    model.findById(req.params.mid, function(err, image) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(image);
      }
    });
  }

  function updateImage(req, res) {
    model.findByIdAndUpdate(req.params.mid, req.body, function(err, image) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(image);
      }
    });
  }

  function deleteImage(req, res) {
    model.findByIdAndRemove(req.params.mid, function(err, image) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(image);
      }
    });
  }
};
