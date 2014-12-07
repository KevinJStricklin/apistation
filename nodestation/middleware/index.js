
// Middleware Namespace

var Middleware = {}; // Attach discrete middleware objects to this namespace 

// Middleware - CORS - Enalbed CORS Requests and functionality for multiple clients.
// -----------------------------------------------------------------------------------------
Middleware.CORS = function (req, res, next) {
    console.log('cors middleware active');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// Middleware - Authentication - Enables Authentication of Agents
// -----------------------------------------------------------------------------------------
Middleware.Authentication = function (req, res, next) {
    var status = {};
    status.type = "Authentication";

    if (req.user != undefined) {
        status = req.user;
    }

    console.log(status);
    next();
};

// Middleware - Session - Enables Session of Agents
// -----------------------------------------------------------------------------------------
Middleware.Session = function (req, res, next) {
    var status = {};
    var _req = require('express').request || req;
    
    status.type = "session";
    status.ip = _req.ip;
    status.headers = _req.headers;
    
    
    console.log(status);
    next();
};



exports.Middleware = Middleware;
