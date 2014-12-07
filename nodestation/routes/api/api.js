var Controller = require('../controller.type.js').Type;

/// ------------------------------------------------------
/// API Controller 
/// ------------------------------------------------------
var Api = function () {
    var controller = new Controller("/api", {});
    
    
    
    

    return controller;
}

module.exports.Package = Api;