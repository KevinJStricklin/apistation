// ---------------------------------------------------------------------------------------------------------
// N O D E   S T A T I O N 
// ---------------------------------------------------------------------------------------------------------
// server.js
// ---------------------------------------------------------------------------------------------------------

// Thrid Party Packages
// ---------------------------------------------------------------------------------------------------------
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

// Application Options
// ---------------------------------------------------------------------------------------------------------
var options = {
    port: 3020,
    title: "API v1.0",
    environment: "DEV",
    // Reids Options
    redis : { enabled: true }
};

// Application Identity
// ---------------------------------------------------------------------------------------------------------
var Identity = require('./components/identity/identity.js').Package(options);

// Passport Local Setup
// ---------------------------------------------------------------------------------------------------------
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Identity.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
        function (username, password, done) {
            process.nextTick(function () {
                Identity.findByUsername(username, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                    if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                    return done(null, user);
                })
            });
        }
));

// Express Application Configuration
// ---------------------------------------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(session({
        secret: 'keyboard cat'
    }));
app.use(passport.initialize());
app.use(passport.session());

// set the view engine to ejs
app.set('view engine', 'ejs');
// Client 
app.use(express.static(__dirname + '/client'));

// Express Middleware
// ---------------------------------------------------------------------------------------------------------
var middleware = require('./middleware/index.js').Middleware({
    debug_logging : true
});

for (var package_entry in middleware) {
    console.log('installing middleware ' + package_entry)
    app.use(middleware[package_entry]);
}


// Server Routes
// ---------------------------------------------------------------------------------------------------------
var router = express.Router(); 				// get an instance of the express Router

router.get('/', function (req, res) {
    var model = {}; // Primary View
    
    // Model/User
    if (req.user) {
        model.user = req.user;
    }
    
    // Model/Map
    model.map = {};
    

    res.render('pages/index', model);
});

router.get('/auth', function (req, res) {
    var access_tag = {};
    
    access_tag.ttl = 5000;
    if (req.user) {
        access_tag.path = req.user.username;
    }
    access_tag.authenticated = req.isAuthenticated();
    
    res.json(access_tag);
});

router.post('/auth', 
    passport.authenticate('local', { failureRedirect: '/auth', failureFlash: false }), function (req, res) {
    var access_tag = {};
    
    access_tag.ttl = 5000;
    if (req.user) {
        access_tag.path = req.user.username;
    }
    access_tag.authenticated = req.isAuthenticated();

    res.json(access_tag);
});


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.use('/', router);

// Api Routes
// ---------------------------------------------------------------------------------------------------------
var api = require('./routes/api/api.js').Package;
app.use('/api', api());



// Start the Server
// ---------------------------------------------------------------------------------------------------------
app.listen(options.port);
console.log('apistation is running at ' + options.port);