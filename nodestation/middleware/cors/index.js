
// Middleware - CORS - Enalbed CORS Requests and functionality for multiple clients.
// -----------------------------------------------------------------------------------------
var CORS = function (req, res, next) {
    var status = {};
    status.type = "CORS";
    
    if (res.headersSent == false) {
        
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    }

    next();
}

module.exports.Package = CORS;