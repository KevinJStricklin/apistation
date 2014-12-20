
// ------------------------------------------------------------
// Controllers Namespace
// ------------------------------------------------------------
var packages = function () {
    var self = {};

    // Controllers
    self.api = require('./api/api.js').Package;

    return self;
};

module.exports.Controllers = packages;