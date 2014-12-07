
// ------------------------------------------------------------
// Controllers Namespace
// ------------------------------------------------------------
var packages = function (app, options) {
    var self = {};
    
    // Controllers
    self.api = require('./api/api.js').Package;
    self.auth = require('./auth/auth.js').Package;
    self.file = require('./file/file.js').Package;

    return self;
};

module.exports.Controllers = packages;