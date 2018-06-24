var PostsModel = require('../models/post');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

var PostsHandler = function () {
  this.getAllPosts = function (req, res, next) {
      PostsModel.aggregate([
          {
              $lookup:
                  {
                      from: "comments",
                      localField: "_id",
                      foreignField: "postId",
                      as: "comments"
                  }
          }
      ],function (err, result) {
          if (err) {
              return next(err);
          }
          res.status(200).send({data: result})
      })
  };

  this.updatePost = function (req,res,next){
        var body = req.body;
        var id = req.params.id;

        PostsModel.findByIdAndUpdate(id, body, { new: true }, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({ data: result });
        })
    };

    this.deletePost = function (req,res,next) {
        var id = req.params.id;
        PostsModel.findByIdAndRemove({ _id: id}, function (err, result) {
            if (err) {
                return next(err);
            }
            if(result){
                res.status(200).send({deleted: result});
            }
        })
    };

  this.createPost = function (req, res, next) {
    var body = req.body;
    var userId = req.session.userId;
    var userName = req.session.name;
    var postModel;

    body.userName = userName;
    body.userId = userId;
    body.date = new Date();
    postModel = new PostsModel(body);

    postModel.save(function (err, result) {
      if (err) {
        return next(err);
      }

      res.status(201).send({ data: result });
    })
  };

};

module.exports = PostsHandler;