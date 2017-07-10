var User = require('../models/users');
var jwt = require('jsonwebtoken');
var appConf = require('../../app.conf.json');
var async = require('async');

var getJWT = function (user) {
    return jwt.sign(user, appConf.secret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
};

var getValidTokenWithUserData = function (user) {
    user = user.toObject();
    delete user.password;
    return {
        token: getJWT(user),
        user: user
    }
}

var fetchUser = function (user, cb) {
    User.findOne({
        email: user.email
    }, cb);
}


var login = function (req, res, next) {
    fetchUser({
        email: req.body.email
    }, function (err, user) {
        if (!user || err) {
            return res.status(500).json({
                msg: "Authentication Failed",
                err: err || "Couldn't find your Account."
            });
        }

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch) {
                res.send(getValidTokenWithUserData(user));
            } else {
                console.log(err || 'Wrong password. Try again.', 'Error occured while login by user' + req.body.email);
                res.status(500).json({
                    msg: "Authentication Failed",
                    err: err || 'Wrong password. Try again.'
                });
            }
        });
    });
};

var validateLogin = function (req, res, next) {

    req.assert('email', 'required').notEmpty();
    req.assert('email', 'valid email required').isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);

    req.getValidationResult().then(function (result) {
        var err;
        if (!result.isEmpty()) {
            err = {
                msg: "Bad request",
                err: result.mapped()
            };
            console.log('Error occured while login', err);
            res.status(400).json(err);
        }

        next();
    });

};

var validateUser = function (req, res, next) {

    req.assert('email', 'required').notEmpty();
    req.assert('username', 'required').notEmpty();
    req.assert('email', 'valid email required').isEmail();
    req.assert('password', '6 to 20 characters required').len(6, 20);

    req.getValidationResult().then(function (result) {
        var err;
        if (!result.isEmpty()) {
            err = {
                msg: "Bad request",
                err: result.mapped()
            };
            console.log(err, 'Error occured while trying to signup by user', req.body);
            res.status(400).json(err);
        }

        next();
    });

};

var signup = function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    });

    user.save(function (err) {
        if (err) {
            res.status(500).json({
                msg: err.code === 11000 ? 'Email address already exist.' : 'Internal Server error'
            });
        } else {
            res.send(getValidTokenWithUserData(user));
        }
    });
}

var decodeToken = function (data, cb) {
    var authorization, decoded;
    if (data.headers && data.headers.authorization) {
        //split barer form the header
        authorization = data.headers.authorization.split(' ')[1];
        try {
            decoded = jwt.verify(authorization, appConf.secret);
        } catch (e) {
            return cb(e);
        }
        cb(null, decoded);
    }
};

var checkValidUser = function (user, cb) {
    if (!user) {
        return cb('Invalid Token');
    }

    fetchUser({
        email: user.email
    }, cb);
}

var isAuthenticated = function (req, res, next) {
    async.waterfall([
        decodeToken.bind(null, req),
        checkValidUser
    ], function (err, user) {
        if (err) {
            console.log(err, 'Error occured while validating autorization token', req.headers.authorization)
            return res.status(401).send({
                msg: 'Access is denied due to invalid token',
                err: 'Unauthorized '
            });
        } else {
            req.user = user;
        }

        next();
    })
}

module.exports = {
    'login': login,
    'validateLogin': validateLogin,
    'validateUser': validateUser,
    'signup': signup,
    'isAuthenticated': isAuthenticated
};