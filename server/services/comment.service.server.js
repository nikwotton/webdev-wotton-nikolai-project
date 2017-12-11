module.exports = function(app, model) {

  app.post('/api/comment', createComment);
  app.get('/api/comment/:cid', findCommentById);
  app.get('/api/comments/:mid', findAllCommentsForMeme);
  app.put('/api/comment/:cid', updateComment);
  app.delete('/api/comment/:cid', deleteComment);

  function createComment(req, res) {
    model
      .create(req.body, function(err, comment) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(comment);
        }
      });
  }

  function findAllCommentsForMeme(req, res) {
    model
      .find({meme: req.params.mid}, function(err, comments) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(comments);
        }
      });
  }

  function findCommentById(req, res) {
    model.findById(req.params.cid, function(err, comment) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(comment);
      }
    });
  }

  function updateComment(req, res) {
    model.findByIdAndUpdate(req.params.cid, req.body, function(err, comment) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(comment);
      }
    });
  }

  function deleteComment(req, res) {
    model.findByIdAndRemove(req.params.cid, function(err, comment) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(comment);
      }
    });
  }
};
