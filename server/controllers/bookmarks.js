'use-strict';

var BookMarks = require('../models/bookmarks');

var validateBookMark = function (req, res, next) {

    req.assert('title', 'required').notEmpty();
    req.assert('url', 'required').notEmpty();
    // url regex validation must be there

    req.getValidationResult().then(function (result) {
        var err;
        if (!result.isEmpty()) {
            err = {
                msg: "Bad request",
                err: result.mapped()
            };
            console.log('Error occured while validating bookmarks', err);
            res.status(400).json(err);
        }

        next();
    });

};

var parseTags = function (tags) {
    if (tags && typeof tags === 'string') {
        return tags.replace(/\s/g, '').split(",");
    } else {
        return [];
    }
};

var makeBookMark = function (data, user) {
    return new BookMarks({
        title: data.title,
        url: data.url,
        tags: parseTags(data.tags),
        createdBy: user._id
    });
}


var createBookMarks = function (req, res) {
    var bookmarks, data = req.body;
    bookmark = makeBookMark(data, req.user);

    bookmark.save(function (err, bookmark) {
        if (err) {
            console.log(err, 'Error occured while trying to create bookmark with title ' + data.title + ' by ' + req.user.email);
            return res.status(500).json({
                msg: err.code === 11000 ? 'Title already exist.': "Internal Server error"
            });
        }

        res.send(bookmark);
    })
};

var fetchAllBookMarks = function (req, res) {
    BookMarks.find({
        createdBy: req.user._id
    }).sort({ 'createdAt': 1}).exec(function (err, bookmarks) {
        if (err) {
            console.log(err, 'Error occured while trying to fetch bookmarks by ' + req.user.email);
            return res.status(500).json({
                msg: "Internal Server error"
            });
        }

        res.send(bookmarks);
    });
};

var fetchBookMark = function (req, res, next) {
    console.log(req.params.id, req.params)
    BookMarks.findOne({
        _id: req.params.id
    }, function (err, bookmark) {
        if (err) {
            console.log(err, 'Error occured while trying to fetch bookmark with id' + req.params._id + ' by ' + req.user.email);
            return res.status(500).json({
                msg: "Internal Server error"
            });
        }
        req.bookmark = bookmark;
        next();
    });
};

var fetchBookMarksByTag = function (req, res) {
    if (!req.params.tag || typeof req.params.tag !== 'string') {
        err = {
            msg: "Bad request",
            err: "Invalid format"
        };
        console.log('Error occured while fetching bookmarks by tag name', err);
        res.status(400).json(err);
    }

    BookMarks.find({
        tags: req.params.tag
    }).sort({ 'createdAt': 1}).exec(function (err, bookmarks) {
        if (err) {
            console.log(err, 'Error occured while trying to fetch bookmarks using tag by' + req.user.email);
            return res.status(500).json({
                msg: "Internal Server error"
            });
        }

        res.send(bookmarks);
    });
}

var updateBookMark = function (req, res) {
    var bookmark = Object.assign(req.bookmark, req.body, {
        tags: parseTags(req.body.tags)
    });
    bookmark.save(function (err, bookmark) {
        if (err) {
            console.log(err, 'Error occured while trying to create bookmark with title ' + body.title + 'by ' + req.user.email);
            return res.status(500).json({
                msg: "Internal Server error"
            });
        }

        res.send(bookmark);
    });
};

module.exports = {
    'createBookMarks': createBookMarks,
    'validateBookMark': validateBookMark,
    'fetchAllBookMarks': fetchAllBookMarks,
    'updateBookMark': updateBookMark,
    'fetchBookMark': fetchBookMark,
    'fetchBookMarksByTag': fetchBookMarksByTag
};