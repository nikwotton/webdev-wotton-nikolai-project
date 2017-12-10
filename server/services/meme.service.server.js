module.exports = function(app, model) {

  app.post('/api/meme', createMeme);
  app.get('/api/meme', findAllMemes);
  app.get('/api/meme/:mid', findMemeById);
  app.put('/api/meme/:mid', updateMeme);
  app.delete('/api/meme/:mid', deleteMeme);

  function createMeme(req, res) {
    model
      .create(req.body, function(err, meme) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(meme);
        }
      });
  }

  function findAllMemes(req, res) {
    model.find({}, function(err, memes) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(memes);
      }
    });
  }

  function findMemeById(req, res) {
    model.findById(req.params.mid, function(err, meme) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(meme);
      }
    });
  }

  function updateMeme(req, res) {
    model.findByIdAndUpdate(req.params.mid, req.body, function(err, meme) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(meme);
      }
    });
  }

  function deleteMeme(req, res) {
    model.findByIdAndRemove(req.params.mid, function(err, meme) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(meme);
      }
    });
  }
};
