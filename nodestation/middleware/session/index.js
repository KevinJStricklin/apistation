// Middleware - Session - Enables Session of Agents
// -----------------------------------------------------------------------------------------

// Dependencies 
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



var Session = function (req, res, next) {
    var status = {};
    status.type = "session";
    
    // Cookie SID can be used as a session identifer in redis/cache/leveldb
    status.cookies = req.cookies;
 
    passport.serializeUser(function (user, done) {
        done(null, user.public_id);
    });
    
    passport.deserializeUser(function (id, done) {
        var session_user = {};
        session_user.public_id = 0; // Anonomouse Identifier;
        session_user.path = "/" // System path to the session user.

        done(err, session_user);
    });


    console.log(status);
    next();
};

module.exports.Package = Session;