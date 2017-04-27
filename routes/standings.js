var express = require("express");
var router = express.Router();

router.get("/league_standings", ensureAuthenticated, function(req, res) {
    res.render("standings/league_standings");
});

router.get("/conference_standings", ensureAuthenticated, function(req, res) {
    res.render("standings/conference_standings");
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}

module.exports = router;