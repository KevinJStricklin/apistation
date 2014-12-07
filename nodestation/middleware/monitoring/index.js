
// Middleware - Monitoring 
// --------------------------------------------------------------

var Monitoring = function (req, res, next) {
    var status = {};
    status.type = "Monitoring";
    
    status.method = req.method;
    status.path = req.path;

    console.log(status);
    next();
}

module.exports.Package = Monitoring;
