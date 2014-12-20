

// Middleware - Authentication - Enables Authentication of Agents
// -----------------------------------------------------------------------------------------
// Approach 
// There is atleast one authentication controller that is in charge of authenticating agents.
// This middleware ensures that authentication
// -----------------------------------------------------------------------------------------

var Authentication = function (req, res, next) {
    var status = {};
    status.type = "Authentication";
    status.authenticated = req.isAuthenticated()
    
    if (req.path == "/auth") {
        console.log("on /auth  skipping ...");
    } else {
        if (!status.authenticated) {
            res.status(401).send('Unauthorized');
            // TODO: Subcribe to a channel in Redis to fire off a blocker program (uwf block, or csw)
        }
    }

    console.log(status);
    next();
};

module.exports.Package = Authentication;