var express = require("express");
var router = express.Router();
const requireAuth = require("../middlewares/requireAuth");

router.get('/main', requireAuth, function (req, res, next) {
    res.render('main')
})

router.get('/private', requireAuth, function (req, res, next) {
    res.render('private')
})


module.exports = router;