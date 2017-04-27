var express = require("express");
var router = express.Router();

router.get("/bostons_coach", ensureAuthenticated, function(req, res) {
    res.render("articles/bostons_coach");
});

router.get("/seguin", ensureAuthenticated, function(req, res) {
    res.render("articles/seguin");
});

router.get("/geno", ensureAuthenticated, function(req, res) {
    res.render("articles/geno");
});

router.get("/oilerduck", ensureAuthenticated, function(req, res) {
    res.render("articles/oilerduck");
});

router.get("/article_template", ensureAuthenticated, function(req, res) {
    res.render("articles/article_template");
});





function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}









module.exports = router;