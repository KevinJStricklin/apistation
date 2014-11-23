// API STATION - LevelDb


// ---------------------------------------------------------------
// Dependencies 
// ---------------------------------------------------------------
var express = require('express'),
  bodyParser = require('body-parser');

// levelDb 
var levelup = require('levelup');
var db = levelup('./sysdb');


// ---------------------------------------------------------------
// Express Application
// ---------------------------------------------------------------
var app = express();
app.use(bodyParser.json());

var security = {}; // Require a new module  
// Role is a name and a path expression.



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

		// Value
		model.value = JSON.stringify(value);

	  	// Build the response
		res.type('application/json');
		res.json(model);
	});
});

app.post('/api/*', function (req, res) {
	db.put(req.path,req.body , function (err) {
		var model = {};
		model.input = req.body;

		// Handle Error
  		if (err) {
  			model.err = err;
  			console.log('leveldb:' + new Date() + err);
  		}

		// Build the response
		model.message = req.path + " saved.";
		res.type('application/json');
		res.json(model);
	});
});


app.listen(3000);