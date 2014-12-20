
// ------------------------------------------------------------
// Components Namespace
// ------------------------------------------------------------

var packages = function (app, options) {
    var self = {};
    
    // Components
    self.cache = require('./cache/cache.js').Package(options);
    self.resources = require('./resources/resource.js').Package(options);
    
    return self;
};

module.exports.Components = packages;
