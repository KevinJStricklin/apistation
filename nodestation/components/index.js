
// ------------------------------------------------------------
// Components Namespace
// ------------------------------------------------------------

var packages = function (options) {
    var self = {};
    
    // Components
    self.cache = require('./cache/cache.js').Package;
    self.resources = require('./resources/resources.js').Package;
    
    return self;
};

module.exports.Components = packages;
