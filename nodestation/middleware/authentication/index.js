

// Middleware - Authentication - Enables Authentication of Agents
// -----------------------------------------------------------------------------------------
// Approach 
// There is atleast one authentication controller that is in charge of authenticating agents.
// This middleware ensures that authentication
// -----------------------------------------------------------------------------------------

var Authentication = function (req, res, next) {
    var status = {};
    status.type = "Authentication";
    
    if (req.user == undefined) {
        req.user = {
            "id" : 0,
             "client" : req.cookies["connect.sid"]
        }
    }
    
    if (req.query.auth) {
        console.log("[auth.token] " + req.query.auth);
    }

    console.log(req.user);
    next();
};

module.exports.Package = Authentication;