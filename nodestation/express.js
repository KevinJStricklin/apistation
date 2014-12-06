// ---------------------------------------------------------------
// API STATION - LevelDb
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Dependencies 
// ---------------------------------------------------------------
var express = require('express'),
    bodyParser = require('body-parser'),
    levelup = require('levelup');




// ---------------------------------------------------------------
// Databases 
// ---------------------------------------------------------------
var db = levelup('./sysdb',{ valueEncoding: 'json'});

// ---------------------------------------------------------------
// Express Application
// ---------------------------------------------------------------
var app = express();
app.use(bodyParser.json());
app.use(CORS_Middleware);

// ---------------------------------------------------------------
// Load Middleware 
// ---------------------------------------------------------------
var Middleware = require('./middleware/index.js').Middleware;

for (var implementation in Middleware) {
    app.use(Middleware[implementation]);
}




// ---------------------------------------------------------------
// Routes
// ---------------------------------------------------------------
app.get('/api/*', function(req, res) {
	db.get(req.path, function (err, value) {
		var model = {};

		// Handle Error
		if (err) {
			model.err = err;
			console.log('leveldb:' + new Date() + err);
		}

		console.log("[GET] " + req.path + " == " + value);
	  	// Build the response
		res.type('application/json');
		res.json(value);
	});
});

app.post('/api/*', function (req, res) {
	db.put(req.path,req.body, function (err) {
		var model = {};
		model.input = req.body;

		console.log('[POST] ' + req.path + ' = req.body = ' + model.input);

		// Handle Error
  		if (err) {
  			model.err = err;
  			console.log('leveldb:' + new Date() + err);
  		}

        console.log("[POST] " + req.path + " == " + req.body);

		// Build the response
		model.message = req.path + " saved.";
		res.type('application/json');
		res.json(model);
	});
});


app.listen(3000);
