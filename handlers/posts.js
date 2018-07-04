var PostsModel = require('../models/post');

var PostsHandler = function () {
    this.getAllPosts = function (req, res, next) {
        PostsModel.aggregate([
            {
                $lookup: //to make the author's name dynamic
                    {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "postAuthor"
                    }
            }, {
                $unwind: "$postAuthor" //postAuthor array to obj

            }, {
                $lookup: //get post comments
                    {
                        from: "comments",
                        localField: "_id",
                        foreignField: "postId",
                        as: "comments"
                    }
            }, {
                $unwind:
                    {
                        path: "$comments",
                        preserveNullAndEmptyArrays: true //each post return not only with comments
                    }

            }, {
                $lookup:
                    { //to make the comments author's name dynamic
                        from: "users",
                        localField: "comments.userId",
                        foreignField: "_id",
                        as: "commentAuthor"
                    }
            }, {
                $group:
                    {
                        _id: "$_id",
                        title: {$first: "$title"},
                        postAuthor: {$first: "$postAuthor"},
                        description: {$first: "$description"},
                        userId: {$first: "$userId"},
                        date: {$first: "$date"},
                        comments: {
                            $push: {
                                name: {$arrayElemAt: ["$commentAuthor.name", 0]}, _id: "$comments._id",
                                postId: "$comments.postId", userId: "$comments.userId",
                                text: "$comments.text"
                            }
                        }
                    }
            }, {
                $project:
                    {
                        _id: 1,
                        userId: 1,
                        "postAuthor": "$postAuthor.name", //only name show
                        title: 1,
                        description: 1,
                        date: {$dateToString: {format: "%Y-%m-%d/%H:%M:%S", date: "$date"}}, //date formating
                        comments: 1
                    }
            }, {
                $sort: {date: -1}
            }
        ], function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({data: result})
        })
    };

    this.updatePost = function (req, res, next) {
        var body = req.body;
        var id = req.params.id;

        PostsModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({data: result});
        })
    };

    this.deletePost = function (req, res, next) {
        var id = req.params.id;
        PostsModel.findByIdAndRemove({_id: id}, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result) {
                res.status(200).send({deleted: result});
            }
        })
    };

    this.createPost = function (req, res, next) {
        var body = req.body;
        var userId = req.session.userId;
        var postAuthor = req.session.name;
        var postModel;

        body.postAuthor = postAuthor;
        body.userId = userId;
        body.date = new Date();
        postModel = new PostsModel(body);

        postModel.save(function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({data: result});
        })
    };

};

module.exports = PostsHandler;