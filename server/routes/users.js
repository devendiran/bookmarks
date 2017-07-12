"use strict";
var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');


/* GET users listing. */
router.post('/login', usersCtrl.validateLogin, usersCtrl.login);

router.post('/signup', usersCtrl.validateUser, usersCtrl.signup);

module.exports = router;
