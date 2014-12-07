
// N O D E   S T A T I O N 
// -----------------------------------------------------------------------------
// server.js

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');

// Express Application Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3020; 		// set our port

// Express Middleware
var middleware = require('./middleware/index.js').Middleware;
app.use(middleware.CORS);
app.use(middleware.Authentication);




// ROUTES FOR THE API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// API Router
var api = require('./routes/api.js').Api();

app.use(api.path, api);


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