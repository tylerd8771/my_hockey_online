var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("passportapp", ['users']);
var bcrypt = require("bcryptjs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// GET - Login Page
// =================
router.get("/login", function(req, res) {
    res.render("login");
});

// GET - Registration Page
// =========================
router.get("/register", function(req, res) {
    res.render("register");
});

// POST - Registration Page
// =========================
router.post("/register", function(req, res) {
    // Get Form Values
    var gamertag = req.body.gamertag;
    var username = req.body.username;
    var password = req.body.password;
    var primaryposition = req.body.primaryposition;
    var secondarypositions = req.body.secondarypositions;

    // Validation
    req.checkBody("gamertag", "Gamertag field is required!").notEmpty();
    req.checkBody("username", "Username field is required!").notEmpty();
    req.checkBody("password", "Password field is required!").notEmpty();
    req.checkBody("primaryposition", "What is your primary position?").notEmpty();
    req.checkBody("secondarypositions", "What are your secondary positions?").notEmpty();

    // Check Form For Errors
    var errors = req.validationErrors();

    if (errors) {
        console.log("The Form Has Errors...");
        res.render("register", {
            errors: errors,
            gamertag: gamertag,
            username: username,
            password: password,
            primaryposition: primaryposition,
            secondarypositions: secondarypositions
        });
    } else {
        var newUser = {
            gamertag: gamertag,
            username: username,
            password: password,
            primaryposition: primaryposition,
            secondarypositions: secondarypositions

        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password = hash;

                db.users.insert(newUser, function(err, doc) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log("User Has Been Added!");

                        //Success Message
                        req.flash("success", "You are registered and can now sign in!");

                        // Redirect After Registration
                        res.location("/");
                        res.redirect("/users/login");
                    }
                });
            });
        });
    }

});

// ======================
// Passport Configuration
// =======================
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    db.users.findOne({ _id: mongojs.ObjectId(id) }, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.users.findOne({ username: username }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect Username" });
            }

            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect Password" });
                }
            });
        });
    }
));

// Login - POST
// =============
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: 'Invalid Username Or Password'
    }),
    function(req, res) {
        console.log('Auth Successfull');
        res.redirect('/');
    });

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/users/login');
});

module.exports = router;