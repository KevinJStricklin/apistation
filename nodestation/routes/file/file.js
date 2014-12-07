var Controller = require('../controller.type.js').Type;

/// ------------------------------------------------------
/// FileIO Controller 
/// ------------------------------------------------------
var FileIO = function () {
    var controller = new Controller("/FileIO", options);
    // path member
    controller.path = "/FileIO";
    
    

    
    return controller;
}

module.exports.Package = FileIO;