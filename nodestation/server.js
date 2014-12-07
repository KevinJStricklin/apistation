// ---------------------------------------------------------------------------------------------------------
// N O D E   S T A T I O N 
// ---------------------------------------------------------------------------------------------------------
// server.js
// ---------------------------------------------------------------------------------------------------------

// call the packages we need
// ---------------------------------------------------------------------------------------------------------
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


// Express Application Configuration
// ---------------------------------------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }));
app.use(passport.initialize());


var port = process.env.PORT || 3020; 		// set our port

// Express Middleware
var middleware = require('./middleware/index.js').Middleware({
    debug_logging : true
});

for (var package_entry in middleware) {
    console.log('installing middleware ' + package_entry)
    app.use(middleware[package_entry]);
}


// Define the Options graph for the API's sub strcuture
// ============================================================================
var options = {
    title: "API v1.0",
    environment: "DEV"
};




// ROUTES FOR THE API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// Controllers
// =============================================================================
var controllers = require('./routes/index.js').Controllers(options);

app.use("/api", controllers.api);
app.use("/auth", controllers.auth);
app.use("/file", controllers.file);


console.log("that was the prototype");

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function (req, res) {
    res.json({ message: 'nodestation is active' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('nodestation is running at ' + port);