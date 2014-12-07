
// Middleware - Messaging 
// --------------------------------------------------------------

var Messaging = function (req, res, next) {
    var status = {};
    status.type = "Messaging";
    
    console.log(status);
    next();
}

module.exports.Package = Messaging;
