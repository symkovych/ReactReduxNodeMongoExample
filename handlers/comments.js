var CommentsModel = require('../models/comment');


var CommentsHandler = function () {

    this.updateComment = function (req, res, next) {
        var body = req.body;
        var id = body._id;

        CommentsModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({data: result});
        })
    };
    this.deleteComment = function (req, res, next) {
        var body = req.body;
        var id = body._id;
        CommentsModel.findByIdAndRemove({_id: id}, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result) {
                res.status(200).send({data: result});
            }
        })
    };

    this.createComment = function (req, res, next) {
        var body = req.body;
        var CommentModel;

        CommentModel = new CommentsModel(body);

        CommentModel.save(function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(201).send({data: result});
        })
    };
};

module.exports = CommentsHandler;