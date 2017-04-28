var express = require("express");
var path = require("path");
var expressValidator = require("express-validator");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bodyParser = require("body-parser");
var flash = require("connect-flash");

var routes = require("./routes/index");
var users = require("./routes/users");
var teams = require("./routes/teams");
var articles = require("./routes/articles");
var standings = require("./routes/standings");


var app = express();
var port = process.env.PORT || 8080;


// Setting The View Engine
// ========================
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


// Set Static Folder
// ==================
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

// BodyParser
// ===========
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Express Session Middleware
// ==========================
app.use(session({
    secret: "Secret",
    saveUninitialized: true,
    resave: true
}));

// Passport Middleware
// =====================
app.use(passport.initialize());
app.use(passport.session());

// Express Validator Middleware
// ==============================
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Connect-Flash Middleware
// ==========================
app.use(flash());
app.use(function(req, res, next) {
    res.locals.messages = require("express-messages")(req, res);
    next();
});

app.get("*", function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});


// Define Routes
// ===============
app.use('/', routes);
app.use('/users', users);
app.use('/teams', teams);
app.use('/articles', articles);
app.use('/standings', standings);



app.listen(port)
console.log('Server running on port ' + port);