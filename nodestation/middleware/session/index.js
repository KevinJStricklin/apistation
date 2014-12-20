// Middleware - Session - Enables Session of Agents
// -----------------------------------------------------------------------------------------

// Dependencies 


var Session = function (req, res, next) {
    var status = {};
    status.type = "session";
    
    // Cookie SID can be used as a session identifer in redis/cache/leveldb
    status.cookies = req.cookies;

    console.log(status);
    next();
};

module.exports.Package = Session;