var express = require('express');
var router = express.Router();
var authCtl = require('../controllers/users');
var bookmarkCtrl = require('../controllers/bookmarks');

/* GET users listing. */
router.post('/create', authCtl.isAuthenticated, bookmarkCtrl.validateBookMark, bookmarkCtrl.createBookMarks);
router.get('/', authCtl.isAuthenticated, bookmarkCtrl.fetchAllBookMarks);
router.put('/:id', authCtl.isAuthenticated, bookmarkCtrl.fetchBookMark, bookmarkCtrl.validateBookMark, bookmarkCtrl.updateBookMark);
router.get('/:tag', authCtl.isAuthenticated, bookmarkCtrl.fetchBookMarksByTag);

module.exports = router;
