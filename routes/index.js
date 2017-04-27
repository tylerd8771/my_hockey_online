var express = require("express");
var router = express.Router();


router.get("/", ensureAuthenticated, function(req, res) {
    res.render("index");
});

router.get("/gallery", ensureAuthenticated, function(req, res) {
    res.render("gallery");
});

router.get("/about", function(req, res) {
    res.render("about");
});

router.get("/league_news", ensureAuthenticated, function(req, res) {
    res.render("league_news");
});

router.get("/tryouts", ensureAuthenticated, function(req, res) {
    res.render("tryouts");
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}

module.exports = router;