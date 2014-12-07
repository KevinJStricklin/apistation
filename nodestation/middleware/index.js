
// ------------------------------------------------------------
// Middleware Namespace
// ------------------------------------------------------------
var packages = function (options) {
    var self = {};
    
    self.authentication = require('./authentication/index.js').Package;
    
    self.cors = require('./cors/index.js').Package;
    
    self.messaging = require('./messaging/index.js').Package;
    
    self.monitoring = require('./monitoring/index.js').Package;
    
    self.session = require('./session/index.js').Package;
    
   
    /// Finally
    console.log("Middleware Namespace created");
    return self;
};


exports.Middleware = packages;








