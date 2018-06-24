var UsersModel = require('../models/user');
var sha256 = require('crypto-js/sha256');

var UsersHandler = function () {
  this.getAllUsers = function (req, res, next) {
    UsersModel.find({}, function (err, result) {
      if (err) {
        return next(err);
      }
      res.status(200).send({ data: result });
    })
  };

  this.getCurrentUser = function (req, res, next) {
    var userId = req.session.userId;

    UsersModel.findById(userId, function (err, result) {
      if (err) {
        return next(err);
      }
      res.status(200).send({ user: result });
    })
  };

  this.createUser = function (req, res, next) {
    var body = req.body;
    body.pass = sha256(body.pass);
    var userModel = new UsersModel(body);
    userModel.save(function (err, result) {
      if (err) {
        return next(err);
      }
      res.status(201).send({data:result});
    })
  };

  this.updateUser = function (req, res, next) {
    var body = req.body;
    var id = req.body.id;

    if (body.pass) {
      body.pass = sha256(body.pass)
    };

    UsersModel.findByIdAndUpdate(id, body, { new: true }, function (err, result) {
      if (err) {
        return next(err);
      }
      res.status(200).send({ updated: result });
    })
  };

  this.deleteUser = function (req, res, next) {
    var id = req.params.id;

    UsersModel.findByIdAndRemove(id, function (err, result) {
      if (err) {
        return next(err);
      }

      res.status(200).send({ updated: result });
    })
  };

  this.signUp = function (req, res, next) {
    var body = req.body;
    var email = body.email;
    var pass = body.pass;
    var err = new Error();

    err.status = 500;
    // err.message = 'Password is required';

    if (!pass) {
      err.message = {
        pass: 'Password is required'
      };
      return next(err)
    }

    UsersModel.find({ email: email }).count(function (error, count) {
      if (error) {
        return next(error);
      }

      if (count) {
        err.message = {
          email: 'This email is already used'
        };
        return next(err)
      }

      body.pass = sha256(body.pass);

      var user = new UsersModel(body);

      user.save(function (err, result) {
        if (err) {
          return next(err);
        }

        res.status(201).send(result)
      })

    })
  };

  this.signIn = function (req, res, next) {
    var body = req.body;
    var email = body.email;
    var pass = body.pass;
    var cryptedPass = sha256(pass);

    cryptedPass = cryptedPass.toString();

    UsersModel.findOne({ email: email, pass: cryptedPass }, function (err, users) {
      if (err) {
        return next(err);
      }

      if (users && users._id) {
        req.session.userId = users._id;
        req.session.name = users.name;
        req.session.email = users.email;
        req.session.loggedIn = true;
        req.session.isAdmin = users.isAdmin;
      }

      res.status(201).send(users)
    })

  };

  this.logout = function (req, res, next) {
    res.status(200).send({ logout: 'success' });
  }
};

module.exports = UsersHandler;