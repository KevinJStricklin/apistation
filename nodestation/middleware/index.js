
// Middleware Namespace

var Middleware = {}; // Attach discrete middleware objects to this namespace 

Middleware.CORS_Middleware = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

exports.Middleware = Middleware;
