var usersRouter = require('./users');
var postsRouter = require('./posts');
var commentsRouter = require('./comments');

module.exports = function (app) {

  app.use(function (req, res, next) {
    req.reqDate = new Date();

    next();
  });

  app.use('/users', usersRouter);
  app.use('/posts', postsRouter);
  app.use('/comments', commentsRouter);

  app.use(function (err, req, res, next) {
    var status = err.status || 500;

    res.status(status).send(err);
  })
};