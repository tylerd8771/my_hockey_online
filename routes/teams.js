var express     = require("express");
var router      = express.Router(); 

router.get("/Anaheim", ensureAuthenticated, function(req, res){
    res.render("teampages/Anaheim");
});

router.get("/Arizona", ensureAuthenticated, function(req, res){
    res.render("teampages/Arizona");
});

router.get("/Boston", ensureAuthenticated, function(req, res){
    res.render("teampages/Boston");
});

router.get("/Buffalo", ensureAuthenticated, function(req, res){
    res.render("teampages/Buffalo");
});

router.get("/Calgary", ensureAuthenticated, function(req, res){
    res.render("teampages/Calgary");
});

router.get("/Carolina", ensureAuthenticated, function(req, res){
    res.render("teampages/Carolina");
});

router.get("/Chicago", ensureAuthenticated, function(req, res){
    res.render("teampages/Chicago");
});

router.get("/Dallas", ensureAuthenticated, function(req, res){
    res.render("teampages/Dallas");
});

router.get("/Detroit", ensureAuthenticated, function(req, res){
    res.render("teampages/Detroit");
});

router.get("/Edmonton", ensureAuthenticated, function(req, res){
    res.render("teampages/Edmonton");
});

router.get("/Pittsburgh", ensureAuthenticated, function(req, res){
    res.render("teampages/Pittsburgh");
});

router.get("/Toronto", ensureAuthenticated, function(req, res){
    res.render("teampages/Toronto");
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/users/login");
}


module.exports = router;
